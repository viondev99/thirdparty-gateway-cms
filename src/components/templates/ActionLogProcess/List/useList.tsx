import { useMemo, useState, useCallback, useEffect } from 'react'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  PostInput,
  PostInputSchema,
} from '@/service/uaa/actionLogProcess/list/schema'
import {
  QueryParams,
  RequestBody,
} from '@/service/uaa/actionLogProcess/list/type'
import { Tooltip } from '@mui/material'
import { TIME_LIMITED, getTimeZone } from '@/constants/time'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import {
  getPartnerList,
  useQueryGetPartnerList,
} from '@/service/uaa/partner/list'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { ACTION_PARTNER_INFO } from '@/constants/decodeManagement'
import {
  getActionLogProcessList,
  useQueryGetActionLogProcessList,
} from '@/service/uaa/actionLogProcess/list'
import { useQueryGetApiFeatureList } from '@/service/uaa/apiFeature/list'
import moment from 'moment'

const defaultParams = {
  page: 0,
  size: 10,
  sort: 'receiveAt,desc',
}

const defaultValues = {
  fromDate: ``,
  toDate: ``,
  thirdPartyType: 0,
  thirdParty: 0,
  thirdPartyService: 0,
  requestId: '',
  featureApi: 0,
}

export const useList = () => {
  const { t } = useTranslation('actionLogProcess/list')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    setValue,
    trigger,
    getValues,
  } = useFormCustom<PostInput>({
    defaultValues,
    resolver: zodResolver(PostInputSchema),
  })

  const [isRefetch, setIsRefetch] = useState<boolean>(false)

  const [queryPage, setQueryPage] = useState<RequestBody['POST']>(defaultValues)
  const [queryParams, setQueryParams] =
    useState<QueryParams['POST']>(defaultParams)
  const [dataPartnerInfo, setDataPartnerInfo] = useState<any>(null)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.no'),
          fieldName: 'index',
          styleCell: {
            height: '65px',
            align: 'center',
          },
        },
        {
          header: t('table.requestId'),
          fieldName: 'requestId',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.type'),
          fieldName: 'type',
          styleCell: {
            align: 'left',
          },
        },

        {
          header: t('table.thirdParty'),
          fieldName: 'thirdParty',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.service'),
          fieldName: 'service',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.feature'),
          fieldName: 'feature',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.errCode'),
          fieldName: 'errCode',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.description'),
          fieldName: 'description',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.requestTime'),
          fieldName: 'requestTime',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.responseTime'),
          fieldName: 'responseTime',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.action'),
          fieldName: 'action',
          styleCell: {
            align: 'center',
          },
        },
      ] as ColumnProps[],
    [t]
  )

  const apiFeatures = useQueryGetApiFeatureList({})
  let listApiFeature: any = apiFeatures?.data ?? []
  listApiFeature = listApiFeature?.map((it: any) => {
    return { value: it?.name, label: `${it?.apiCode} - ${it?.name}` }
  })
  listApiFeature = sortArrayByLabel(listApiFeature)
  listApiFeature.unshift({ value: '0', label: 'All' })

  const listPartnerType = useQueryGetPartnerTypeList({})
  let partnerTypes = (listPartnerType?.data ?? []).map((t: any) => {
    return { value: t?.id, label: `${t?.roleTypeCode} - ${t?.roleTypeName}` }
  })
  partnerTypes = sortArrayByLabel(partnerTypes)
  partnerTypes.unshift({ value: 0, label: 'All' })

  const bodyListPartners = useMemo(() => {
    let body = {}
    if (watch('thirdPartyType') && Number(watch('thirdPartyType')) !== 0) {
      const typeSelected: any = listPartnerType?.data?.find(
        (it: any) => it.id === watch('thirdPartyType')
      )
      body = {
        ...body,
        thirdPartyTypeId: watch('thirdPartyType'),
        roleTypeCode: typeSelected?.roleTypeCode,
      }
    }

    return { ...body, action: ACTION_PARTNER_INFO.SEARCH }
  }, [watch('thirdPartyType')])

  const listPartners = useQueryGetPartnerList(bodyListPartners)
  let listPartnersInfo = (listPartners?.data?.partner ?? []).map((it: any) => {
    return {
      value: it.partnerId,
      label: `${it?.partnerCode} - ${it?.partnerName}`,
    }
  })
  listPartnersInfo = sortArrayByLabel(listPartnersInfo)
  listPartnersInfo.unshift({ value: 0, label: 'All' })

  let listServiceCode = (listPartners?.data?.service ?? []).map((it: any) => ({
    value: it.serviceId,
    label: `${it.serviceCode} - ${it.serviceName}`,
  }))
  listServiceCode = sortArrayByLabel(listServiceCode)
  listServiceCode.unshift({ value: 0, label: 'All' })

  useEffect(() => {
    if (!watch('thirdParty')) {
      setValue('thirdParty', 0)
    }
  }, [watch('thirdParty')])

  useEffect(() => {
    if (!watch('thirdPartyType')) {
      setValue('thirdPartyType', 0)
    }
  }, [watch('thirdPartyType')])

  useEffect(() => {
    if (!watch('featureApi')) {
      setValue('featureApi', '0')
    }
  }, [watch('featureApi')])

  useEffect(() => {
    if (!watch('thirdPartyService')) {
      setValue('thirdPartyService', 0)
    }
  }, [watch('thirdPartyService')])

  useEffect(() => {
    setValue('thirdPartyService', 0)
  }, [watch('thirdParty'), watch('thirdPartyType')])

  useEffect(() => {
    setValue('thirdParty', 0)
  }, [watch('thirdPartyType')])

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryParams({ ...queryParams, page, size })
  }

  const onSubmit = handleSubmit(async (input) => {
    let body = {
      ...defaultValues,
      ...input,
    }

    if (watch('fromDate')) {
      body = {
        ...body,
        fromDate: moment(body.fromDate).format(
          'YYYY-MM-DD' + 'T' + `${TIME_LIMITED.EFFECTIVE_TIME}`
        ),
      }
    }

    if (watch('toDate')) {
      body = {
        ...body,
        toDate: moment(body.toDate).format(
          'YYYY-MM-DD' + 'T' + `${TIME_LIMITED.EXPIRED_TIME}`
        ),
      }
    }

    await setQueryPage(body)
    await getActionLogProcessList(queryParams, body)
    setIsRefetch(true)
  })

  const handleDoubleClick = useCallback(
    (item: number) => {
      router.replace(`/action-log-process/${item}/detail`)
    },
    [router]
  )

  const getDataPartnerInfo = async () => {
    try {
      const response = await getPartnerList({
        action: ACTION_PARTNER_INFO.SEARCH,
      })
      setDataPartnerInfo(response)
    } catch (e: any) {
      console.log(e)
      setDataPartnerInfo([])
    }
  }

  useEffect(() => {
    getDataPartnerInfo()
  }, [])

  const getThirdPartyTypeName = (item: any) => {
    const typeName = listPartnerType?.data?.find((it: any) => it.id === item)
    return typeName
      ? `${typeName?.roleTypeCode} - ${typeName?.roleTypeName}`
      : '-'
  }

  const getPartnername = (item: any) => {
    const partnerName = dataPartnerInfo?.partner?.find(
      (it: any) => it.partnerId === item
    )
    return partnerName
      ? `${partnerName?.partnerCode} - ${partnerName?.partnerName}`
      : '-'
  }

  const getServieName = (service: any, partner: any) => {
    const partnerItem = dataPartnerInfo?.partner?.find(
      (it: any) => it.partnerId === partner
    )

    const serviceName = partnerItem?.services?.find(
      (it: any) => it.serviceId === service
    )
    return serviceName
      ? `${serviceName?.serviceCode} - ${serviceName?.serviceName}`
      : '-'
  }

  const { isLoading, data, refetch } = useQueryGetActionLogProcessList(
    queryParams,
    queryPage
  )

  useEffect(() => {
    setIsRefetch(false)
  }, [queryPage])

  useEffect(() => {
    refetch()
  }, [isRefetch])

  const tableData = (data?.content ?? []).map((item: any, index: number) => {
    return {
      index:
        data?.number === 0
          ? index + 1
          : Number(data?.size) * Number(data?.number) + index + 1,
      requestId: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.requestId ? item?.requestId : '-'}
        </div>
      ),
      type: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.thirdPartyTypeId
            ? getThirdPartyTypeName(item?.thirdPartyTypeId)
            : '-'}
        </div>
      ),
      thirdParty: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.thirdPartyId ? getPartnername(item?.thirdPartyId) : '-'}
        </div>
      ),
      service: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.thirdPartyServiceId
            ? getServieName(item?.thirdPartyServiceId, item?.thirdPartyId)
            : '-'}
        </div>
      ),
      feature: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.serviceCode ? item?.serviceCode : '-'}
        </div>
      ),
      errCode: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.errorCode ? item?.errorCode : '-'}
        </div>
      ),
      description: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.description ? (
            item?.description?.length > 30 ? (
              <Tooltip title={item?.description}>
                <div>{`${item?.description?.slice(0, 30)}...`}</div>
              </Tooltip>
            ) : (
              item?.description
            )
          ) : (
            '-'
          )}
        </div>
      ),
      requestTime: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item.receiveAt ? getTimeZone(item.receiveAt) : '-'}
        </div>
      ),
      responseTime: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item.responseAt ? getTimeZone(item.responseAt) : '-'}
        </div>
      ),
      action: (
        <Action
          actionList={['watch']}
          onWatchAction={() => {
            router.push(`/action-log-process/${item.id}/detail`)
          }}
        />
      ),
    }
  })

  return [
    {
      isLoading,
      register,
      setValue,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
      columns,
      tableData,
      page: data?.number ? data?.number : 0,
      size: data?.size ?? 10,
      totalPages: data?.totalPages,
      listPartnersInfo,
      partnerTypes,
      listApiFeature,
      listPartners,
      listServiceCode,
      bodyListPartners,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
