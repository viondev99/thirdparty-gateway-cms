import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { PutInput, PutInputSchema } from '@/service/uaa/assignFeatureManagement/update/schema'
import { useMutation } from 'react-query'
import { errorMsg, successMsg } from '@/utils/message'
import { useQueryGetApiFeatureList } from '@/service/uaa/apiFeature/list'
import { useQueryGetInternalSystemList } from '@/service/uaa/internalSystem/list'
import { RESPONSE_CODE } from '@/config/responseCode'
import { updateFeature } from '@/service/uaa/assignFeatureManagement/update'
import { Options } from '@/utils/customArray'
import { SWITCH } from '@/constants/switch'
import { useEffect, useState } from 'react'
import { useQueryGetFeatureDetail } from '@/service/uaa/assignFeatureManagement/detail'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { convertDataAssign } from '../List/useList'
const defaultValues = {
  id: 0,
  internalServiceId: 0,
  status: true,
  modelApiId: 0,
  description: ''
}

export const useEdit = () => {
  const { t } = useTranslation('assignApiFeature/edit')
  const router = useRouter()
  const id = Number(router.query.id)
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
    setValue,
    getValues,
    reset,
  } = useFormCustom<PutInput>({
    defaultValues,
    resolver: zodResolver(PutInputSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const { data: dataDetail, isLoading: isLoadingGetDetail } =
    useQueryGetFeatureDetail({ id:  id}, { enabled: true })

  useEffect(() => {
    id && dataDetail && reset({
      ...dataDetail,
      internalServiceId: dataDetail?.internalServiceId + '_' + dataDetail?.systemType
    })
  }, [dataDetail, reset, id])

  const listApiFeatures = useQueryGetApiFeatureList({});
  let listApiFeaturesForOption = Options(listApiFeatures?.data)
  listApiFeaturesForOption = sortArrayByLabel(listApiFeaturesForOption)
  listApiFeaturesForOption.unshift({value: 0 as any, label: 'Select' })

  const listInternalSystem = useQueryGetInternalSystemList({});
  let listInternalSystemForOption = Array.from(listInternalSystem?.data??[] as any).map((el: any) => ({
    value: el.id + '_' + el.systemType,
    label: el.systemType + ' - ' + el.code + ' - ' + el.name,
  }))
  listInternalSystemForOption = sortArrayByLabel(listInternalSystemForOption)
  listInternalSystemForOption.unshift({value: 0 as any, label: 'Select'})

  const { mutate } = useMutation(updateFeature, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        setIsLoading(false)
        router.push('/assign-api-feature-management');
      } else {
        errorMsg(t(data.description))
        setIsLoading(false)
      }
    },
    onError: (error: any) => {
      errorMsg(error.message)
      setIsLoading(false)
    },
  });

  const onSubmit = () => {
    try {
      PutInputSchema.parse(watch())
    } catch (e: any) {
      console.log(control._defaultValues)
      console.log(JSON.parse(e.message))
    }
    handleSubmit( async (input) => {
      setIsLoading(true)
      const body = {...defaultValues, ...input}
      body.status = body.status ? SWITCH.ON : SWITCH.OFF
      mutate(convertDataAssign(body))
    })()

  }

  return [
    {
      register,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
      setValue,
      listApiFeaturesForOption,
      listInternalSystemForOption,
      isLoadingGetDetail,
      isLoading,
    },
    { onSubmit },
  ] as const
}
