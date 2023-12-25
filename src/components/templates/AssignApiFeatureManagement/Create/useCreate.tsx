import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  PostInput,
  PostInputSchema,
} from '@/service/uaa/assignFeatureManagement/create/schema'
import { createFeature } from '@/service/uaa/assignFeatureManagement/create'
import { useMutation } from 'react-query'
import { errorMsg, successMsg } from '@/utils/message'
import { useQueryGetApiFeatureList } from '@/service/uaa/apiFeature/list'
import { useQueryGetInternalSystemList } from '@/service/uaa/internalSystem/list'
import { RESPONSE_CODE } from '@/config/responseCode'
import { Options } from '@/utils/customArray'
import { SWITCH } from '@/constants/switch'
import { useState } from 'react'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { checkExistLocalStorage } from '@/constants/localStorage'
import { convertDataAssign } from '../List/useList'

const defaultValues = {
  internalServiceId: 0,
  status: true,
  modelApiId: 0,
  description: '',
}

export const useCreate = () => {
  const { t } = useTranslation('assignApiFeature/create')
  const router = useRouter()
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
  } = useFormCustom<PostInput>({
    defaultValues,
    resolver: zodResolver(PostInputSchema),
  })

  const [isLoading, setIsLoading] = useState(false)

  const listApiFeatures = useQueryGetApiFeatureList({})
  let listApiFeaturesForOption = Options(listApiFeatures?.data)
  listApiFeaturesForOption = sortArrayByLabel(listApiFeaturesForOption)
  listApiFeaturesForOption.unshift({ value: 0, label: 'Select' })

  const listInternalSystem = useQueryGetInternalSystemList({})
  let listInternalSystemForOption = Array.from(listInternalSystem?.data??[] as any).map((el: any) => ({
    label: el.systemType + ' - ' + el.code + ' - ' + el.name,
    value: el.id + '_' + el.systemType as any,
  }))
  listInternalSystemForOption = sortArrayByLabel(listInternalSystemForOption)
  listInternalSystemForOption.unshift({ value: 0, label: 'Select' })

  const { mutate } = useMutation(createFeature, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        setIsLoading(false)
        if (checkExistLocalStorage() && localStorage.getItem('assign_search')) {
          router.replace('/assign-api-feature-management?directFrom=addNewAssign')
        } else {
          router.replace('/assign-api-feature-management')
        }
      } else {
        errorMsg(data.description)
        setIsLoading(false)
      }
    },
    onError: (error: any) => {
      errorMsg(error.message)
      setIsLoading(false)
    },
  })

  const onSubmit = () => {
    try {
      PostInputSchema.parse(watch())
    } catch (e: any) {
      console.log(control._defaultValues)
      console.log(JSON.parse(e.message))
    }
    handleSubmit(async (input) => {
      setIsLoading(true)
      const body = { ...defaultValues, ...input }
      body.status = body.status ? SWITCH.ON : SWITCH.OFF
      mutate(convertDataAssign(body))
    })()
  }

  return [
    {
      isLoading,
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
    },
    { onSubmit },
  ] as const
}
