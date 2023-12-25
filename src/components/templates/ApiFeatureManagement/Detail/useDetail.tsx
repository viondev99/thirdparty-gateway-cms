import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  GetInputSchema,
} from '@/service/uaa/apiFeatureManagement/detail/schema'
import { useQueryGetDetailAPIFeatureManagement } from '@/service/uaa/apiFeatureManagement/detail'
import { useQueryGetDataInit } from '@/service/uaa/common/list'
import { useEffect, useState } from 'react'
import { sortArrayByLabel } from '@/utils/localeCompareArray'

export const useDetail = () => {
  const { t } = useTranslation('apiFeatureManagement/index')
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
  } = useFormCustom({
    resolver: zodResolver(GetInputSchema),
  })

  const id = Number(router?.query?.id)

  const [loadDataInit, setLoadDataInit] = useState(false)
  const [loadDataDetail, setLoadDataDetail] = useState(false)

  const { data: dataInit, isLoading: isLoadingGetDataInit } =
    useQueryGetDataInit( { enabled: !loadDataInit })

  let dataTypes = (dataInit?.dataTypes ?? []).map((dataType: { id: any; name: any }) => {return {value: dataType.id, label: dataType.name}});
  dataTypes = sortArrayByLabel(dataTypes)
  dataTypes.unshift({value: 0, label: 'Select'})

  const {data: dataDetail, isLoading: loadingDataDetail} = useQueryGetDetailAPIFeatureManagement({ id }, { enabled: !loadDataDetail })

  const information = {
    featureName: dataDetail?.name ?? '',
    apiCode: dataDetail?.apiCode ?? '',
    description: dataDetail?.description ?? ''
  }
  const request: any = dataDetail?.request ?? []
  const response = dataDetail?.response ?? []
  const status = dataDetail?.status ?? 0

  useEffect(() => {
    if (dataInit) {
      setLoadDataInit(true)
    }
    if (dataDetail) {
      setLoadDataDetail(true)
    }
  }, [dataDetail, dataInit])

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
      information,
      request,
      response,
      dataTypes,
      id,
      status,
    },
  ] as const
}
