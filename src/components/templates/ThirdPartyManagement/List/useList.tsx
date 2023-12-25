import React, { useMemo, useState, useCallback, useEffect } from 'react'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { RequestBody } from '@/service/uaa/thirdParty/list/type'
import { useQueryGetApiFeatureList } from '@/service/uaa/apiFeature/list'
import { Options } from '@/utils/customArray'
import { listStatus, listStatus1 } from '@/constants/status'
import moment from 'moment'
import { DialogDeleteThirdPartyApi } from '../Delete'
import { useQueryGetThirdPartyList } from '@/service/uaa/thirdParty/list'
import {
  getPartnerList,
  useQueryGetPartnerList,
} from '@/service/uaa/partner/list'
import { GetInput, GetInputSchema } from '@/service/uaa/thirdParty/list/schema'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { Button, Tooltip } from '@mui/material'
import { DialogPublishThirdPartyApi } from '@/components/templates/ThirdPartyManagement/List/Publish/index.page'
import { getTimeZone } from '@/constants/time'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { checkExistLocalStorage } from '@/constants/localStorage'
import { useQueryGetOutboundList } from '@/service/uaa/outboundManagement/list'
import { useWatch } from 'react-hook-form'
import { ACTION_PARTNER_INFO } from '@/constants/decodeManagement'
import { LIST_MODULES, TABLE_NAME } from '@/constants/logHistory'

const defaultValues = {
  thirdPartyTypeId: 0,
  thirdPartyId: 0,
  name: '',
  featureApiId: 0,
  status: 2,
  sort: 'CREATED_AT,desc',
  thirdPartyServiceId: 0,
  page: 0,
  size: 10,
}

export const useList = () => {
  const { t } = useTranslation('thirdParty/list')
  const { showDialog, hideDialog } = useDialog()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
    getValues,
    setValue,
  } = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const [loadingSearch, setLoadingSearch] = useState(false)

  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)
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
          header: t('table.type'),
          fieldName: 'type',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.thirdParty'),
          fieldName: 'thirdParty',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.name'),
          fieldName: 'name',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.service'),
          fieldName: 'thirdPartyServiceCode',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.apiFeature'),
          fieldName: 'apiFeature',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.endpoint'),
          fieldName: 'endpoint',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.method'),
          fieldName: 'method',
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
          header: t('table.created_at'),
          fieldName: 'created_at',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.created_by'),
          fieldName: 'created_by',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.status'),
          fieldName: 'status',
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

  const listPartnerType = useQueryGetPartnerTypeList({})
  let partnerTypes = (listPartnerType?.data ?? []).map((t: any) => {
    return { value: t.id, label: t?.roleTypeCode + ' - ' + t.roleTypeName }
  })
  partnerTypes = sortArrayByLabel(partnerTypes)
  partnerTypes.unshift({ value: 0, label: 'All' })
  const getThirdPartyTypeName = (type: number) => {
    let thirdPartyType: any = (listPartnerType?.data ?? []).find(
      (t: any) => t.id === type
    )
    return thirdPartyType?.roleTypeCode + ' - ' + thirdPartyType?.roleTypeName
  }

  const bodyListPartners = useMemo(() => {
    let body = {}
    const typeSelected: any = listPartnerType.data?.find(
      (it: any) => it.id === watch('thirdPartyTypeId')
    )
    if (watch('thirdPartyTypeId') && Number(watch('thirdPartyTypeId')) !== 0) {
      body = {
        thirdPartyTypeId: watch('thirdPartyTypeId'),
        roleTypeCode: typeSelected.roleTypeCode,
      }
    }
    return { ...body, action: ACTION_PARTNER_INFO.SEARCH }
  }, [watch('thirdPartyTypeId')])

  const listPartners = useQueryGetPartnerList(bodyListPartners)
  let partners = (listPartners?.data?.partner ?? []).map((partner: any) => {
    return {
      value: partner.partnerId,
      label: `${partner?.partnerCode} - ${partner?.partnerName}`,
    }
  })
  partners = sortArrayByLabel(partners)
  partners.unshift({ value: 0, label: 'All' })

  const getPartnerName = (thirdPartyId: number) => {
    const partner = (partners ?? []).find(
      (partner: any) => partner.value === thirdPartyId
    )
    return partner?.label ?? ''
  }

  useEffect(() => {
    if (watch('thirdPartyId')) {
      setValue('thirdPartyId', 0)
    }
  }, [watch('thirdPartyTypeId')])

  const listApiFeature = useQueryGetApiFeatureList({})
  let apiFeatures = Options(listApiFeature?.data ?? [])
  apiFeatures = sortArrayByLabel(apiFeatures)
  apiFeatures.unshift({ value: 0, label: 'All' })

  const getApiFeature = (apiFeature: any) => {
    const feature = (apiFeatures ?? []).find(
      (el: { value: any }) => el.value === apiFeature
    )
    return feature?.label ?? ''
  }

  const getApiFeatureName = (modelApiId: number) => {
    const apiFeature = (apiFeatures ?? []).find(
      (el: any) => el.value === modelApiId
    )
    return apiFeature?.label ?? ''
  }

  const status = listStatus()
  status.unshift({ value: 2, label: 'All' })

  const getStatusName = (statusNumber: any) => {
    const st = status.find((e) => e.value == statusNumber)
    return st?.label ?? ''
  }

  const mapServiceCodeName = useMemo((): any => {
    return Array.from(listPartners?.data?.partner ?? []).reduce(
      (preV: any, curV: any) => {
        if (!preV[curV.partnerId]) {
          preV[curV.partnerId] = {}
        }
        ;(curV?.services ?? []).map((item: any) => {
          if (!preV[curV.partnerId]?.[item?.serviceId]) {
            preV[curV.partnerId][item?.serviceId] = {}
            preV[curV.partnerId][item?.serviceId] = item?.serviceName
          }
        })

        return preV
      },
      {}
    )
  }, [listPartners])

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const onSubmit = handleSubmit(async (input) => {
    const body = {
      ...defaultValues,
      ...input,
    }
    setLoadingSearch(true)
    setQueryPage(body)
    setLoadingSearch(false)
    localStorage.setItem('thirdParty_search', JSON.stringify(body))
  })

  useEffect(() => {
    const queryPageHistory =
      checkExistLocalStorage() && localStorage.getItem('thirdParty_search')
    const dataQueryPageHistory = queryPageHistory
      ? JSON.parse(queryPageHistory)
      : null

    if (queryPageHistory && router.query?.directFrom === 'addNewThirdParty') {
      setValue('thirdPartyTypeId', dataQueryPageHistory?.thirdPartyTypeId ?? '')
      setValue('thirdPartyId', dataQueryPageHistory?.thirdPartyId ?? '')
      setValue(
        'thirdPartyServiceId',
        dataQueryPageHistory?.thirdPartyServiceId ?? 0
      )
      setValue('name', dataQueryPageHistory?.name ?? '')
      setValue('featureApiId', dataQueryPageHistory?.featureApiId ?? '')
      setValue('status', dataQueryPageHistory?.page ?? 2)

      const query = {
        thirdPartyTypeId: dataQueryPageHistory?.thirdPartyTypeId,
        thirdPartyId: dataQueryPageHistory?.thirdPartyId,
        name: dataQueryPageHistory?.name,
        featureApiId: dataQueryPageHistory?.featureApiId,
        status: dataQueryPageHistory?.status,
        page: dataQueryPageHistory?.page,
        size: dataQueryPageHistory?.size,
        sort: dataQueryPageHistory?.sort,
      }
      setQueryPage(query)
    } else {
      localStorage.removeItem('thirdParty_search')
    }
  }, [])

  const handleDoubleClick = useCallback(
    (item: number) => {
      router.push(`/third-party-management/${item}/detail`)
    },
    [router]
  )

  const openConfirmPublish = (id: number, name: any, featureName: any) => {
    showDialog(
      <DialogPublishThirdPartyApi
        id={id}
        name={name}
        refetch={refetch}
        featureName={featureName}
      />
    )
  }

  const showPublished = (id: number, name: string, featureName: string) => {
    return (
      <Button
        size='small'
        variant='outlined'
        disabled={isLoading}
        style={{ padding: '16px' }}
        onClick={() => openConfirmPublish(id, name, featureName)}
      >
        Publish
      </Button>
    )
  }

  useEffect(() => {
    setLoadingSearch(loadingSearch)
  }, [loadingSearch])

  const { isLoading, data, refetch }: any = useQueryGetThirdPartyList(
    queryPage,
    { enabled: !loadingSearch }
  )

  const goToHistoryLog = (item: any) => {
    router.push({
      pathname: '/log-history',
      query: {
        rowId: item?.id,
        tableName: TABLE_NAME.MODEL_API,
      },
    })
  }

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

  const tableData = (data?.content ?? []).map((item: any, index: any) => {
    return {
      index:
        data?.number === 0
          ? index + 1
          : Number(data?.size) * Number(data?.number) + index + 1,
      type: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.thirdPartyTypeId &&
          getThirdPartyTypeName(item?.thirdPartyTypeId) !== ''
            ? getThirdPartyTypeName(item.thirdPartyTypeId)
            : '-'}
        </div>
      ),
      thirdParty: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.thirdPartyId && getPartnerName(item?.thirdPartyId) !== ''
            ? getPartnerName(item?.thirdPartyId)
            : '-'}
        </div>
      ),
      name: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.name ? (
            item?.name?.length > 30 ? (
              <Tooltip title={item?.name}>
                <div>{`${item?.name.slice(0, 30)} ...`}</div>
              </Tooltip>
            ) : (
              item?.name
            )
          ) : (
            '-'
          )}
        </div>
      ),
      apiFeature: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.featureApiId && getApiFeature(item?.featureApiId) !== ''
            ? getApiFeature(item.featureApiId)
            : '-'}
        </div>
      ),
      endpoint: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.uri ? (
            item?.uri?.length > 30 ? (
              <Tooltip title={item?.uri}>
                <div>{`${item?.uri.slice(0, 30)} ...`}</div>
              </Tooltip>
            ) : (
              item?.uri
            )
          ) : (
            '-'
          )}
        </div>
      ),
      method: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.methodType ? item.methodType : '-'}
        </div>
      ),
      thirdPartyServiceCode: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.thirdPartyServiceId && item?.thirdPartyTypeId
            ? getServieName(item?.thirdPartyServiceId, item?.thirdPartyId)
            : '-'}
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
                <div>{`${item?.description.slice(0, 30)} ...`}</div>
              </Tooltip>
            ) : (
              item?.description
            )
          ) : (
            '-'
          )}
        </div>
      ),
      created_at: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item.createdAt ? getTimeZone(item.createdAt) : '-'}
        </div>
      ),
      created_by: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.createdBy ? item?.createdBy : '-'}
        </div>
      ),
      status: item.status ? (
        <div className='text-[#00CC6A]'>{getStatusName(item.status)}</div>
      ) : (
        <div className='text-red-500 flex items-center justify-center'>
          <div>{getStatusName(Number(item.status))}</div>
          <span style={{ marginLeft: 10 }}>
            {showPublished(
              item.id,
              item.name,
              getApiFeature(item.featureApiId)
            )}
          </span>
        </div>
      ),
      action: (
        <Action
          actionList={
            item.status
              ? ['watch', 'search']
              : ['watch', 'edit', 'delete', 'search']
          }
          onWatchAction={() => {
            router.push(`/third-party-management/${item.id}/detail`)
          }}
          onEditAction={() => {
            router.push(`/third-party-management/${item.id}/edit`)
          }}
          onDeleteAction={() => {
            showDialog(
              <DialogDeleteThirdPartyApi
                id={item.id}
                name={item.name}
                refetch={refetch}
              />
            )
          }}
          onSearchAction={() => goToHistoryLog(item)}
        />
      ),
    }
  })

  return [
    {
      isLoading,
      register,
      handleSubmit,
      watch,
      setValue,
      setError,
      control,
      formState,
      trigger,
      columns,
      status,
      tableData,
      apiFeatures,
      partners,
      partnerTypes,
      page: data?.number ? data?.number : 0,
      size: data?.size ?? 20,
      totalPages: data?.totalPages,
      listPartners,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
