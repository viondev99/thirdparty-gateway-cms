import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import {
  GetInput,
  GetInputSchema,
} from '@/service/uaa/outboundManagement/list/schema'
import { RequestBody } from '@/service/uaa/outboundManagement/list/type'
import { useQueryGetOutboundList } from '@/service/uaa/outboundManagement/list'
import { listStatus1 } from '@/constants/status'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { useQueryGetPartnerList } from '@/service/uaa/partnerInfo/list'
import { authType } from '@/constants/authType'
import { Tooltip } from '@mui/material'
import { checkExistLocalStorage } from '@/constants/localStorage'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { TABLE_NAME } from '@/constants/logHistory'

const defaultValues = {
  status: 2,
  thirdPartyTypeId: 0,
  thirdPartyId: 0,
  code: '',
  page: 0,
  size: 10,
  sort: 'createdAt,desc',
}

export const useList = () => {
  const { t } = useTranslation('outbound/list')
  const { showDialog, hideDialog } = useDialog()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    control,
    formState,
    trigger,
  } = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const listPartnerTypes = useQueryGetPartnerTypeList({})
  let partnerTypes = (listPartnerTypes?.data ?? []).map((partnerType: any) => {
    return {
      value: partnerType.id,
      label: partnerType.roleTypeCode + ' - ' + partnerType.roleTypeName,
    }
  })
  partnerTypes = sortArrayByLabel(partnerTypes)
  partnerTypes.unshift({ value: 0, label: 'All' })

  const bodyListPartners = useMemo(() => {
    let body = {}
    const typeSelected: any = listPartnerTypes.data?.find(
      (it: any) => it.id === watch('thirdPartyTypeId')
    )
    if (watch('thirdPartyTypeId') === 0) {
      body = {
        status: 'ACTIVE',
      }
    } else {
      body = {
        roleTypeCode: typeSelected?.roleTypeCode,
        thirdPartyTypeId: watch('thirdPartyTypeId'),
        status: 'ACTIVE',
      }
    }

    return body
  }, [watch('thirdPartyTypeId')])

  const listPartners = useQueryGetPartnerList(bodyListPartners)
  let partners = (listPartners?.data?.partner ?? []).map((partner: any) => {
    return {
      value: partner.partnerId,
      label:
        (partner?.partnerCode ?? '') + ' - ' + (partner?.partnerName ?? ''),
    }
  })
  partners = sortArrayByLabel(partners)
  partners.unshift({ value: 0, label: 'All' })

  const getTypeName = (thirdPartyTypeId: number) => {
    const typeName = partnerTypes.find(
      (partnerType: any) => partnerType.value === thirdPartyTypeId
    )
    return typeName?.label ?? ''
  }

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

  const status = listStatus1()
  status.unshift({ value: 2, label: 'All' })

  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

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
          fieldName: 'typeName',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.thirdParty'),
          fieldName: 'partnerName',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.authentication_code'),
          fieldName: 'code',
          styleCell: {
            align: 'left',
          },
        },

        {
          header: t('table.description'),
          fieldName: 'description',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.effectiveDate'),
          fieldName: 'effectAt',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.expirationDate'),
          fieldName: 'expiredAt',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.authType'),
          fieldName: 'authType',
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

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const onSubmit = handleSubmit(async (input) => {
    const body = {
      ...defaultValues,
      ...input,
    }
    setQueryPage(body)
    localStorage.setItem('outbound_search', JSON.stringify(body))
  })

  useEffect(() => {
    const queryPageHistory =
      checkExistLocalStorage() && localStorage.getItem('outbound_search')
    const dataQueryPageHistory = queryPageHistory
      ? JSON.parse(queryPageHistory)
      : null

    if (queryPageHistory && router.query?.directFrom === 'addNewOutbound') {
      setValue('thirdPartyTypeId', dataQueryPageHistory?.thirdPartyTypeId ?? '')
      setValue('thirdPartyId', dataQueryPageHistory?.thirdPartyId ?? '')
      setValue('status', dataQueryPageHistory?.page ?? 2)

      const query = {
        thirdPartyTypeId: dataQueryPageHistory?.thirdPartyTypeId,
        thirdPartyId: dataQueryPageHistory?.thirdPartyId,
        status: dataQueryPageHistory?.status,
        page: dataQueryPageHistory?.page,
        size: dataQueryPageHistory?.size,
        sort: dataQueryPageHistory?.sort,
      }
      setQueryPage(query)
    } else {
      localStorage.removeItem('outbound_search')
    }
  }, [])

  const { isLoading, data, refetch } = useQueryGetOutboundList(queryPage)

  const authTypeName = (item: number) => {
    switch (item) {
      case authType.BASIC_AUTH:
        return 'Basic Auth'

      case authType.BEARER_AUTH:
        return 'Bearer Auth'

      case authType.OAUTH2:
        return 'Oauth2'

      default:
        return ''
    }
  }

  const handleDoubleClick = useCallback(
    (item: number) => {
      router.push(`/outbound-management/${item}/detail`)
    },
    [router]
  )

  const goToHistoryLog = (item: any) => {
    router.push({
      pathname: '/log-history',
      query: {
        rowId: item?.id,
        tableName: TABLE_NAME.AUTHEN_CONFIG,
      },
    })
  }

  const dataTable = (data?.content ?? []).map((item, index) => {
    return {
      ...item,
      index:
        data?.number === 0
          ? index + 1
          : Number(data?.size) * Number(data?.number) + index + 1,
      typeName: (
        <div
          className='cursor-pointer'
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {getTypeName(item.thirdPartyTypeId) !== ''
            ? getTypeName(item.thirdPartyTypeId)
            : '-'}
        </div>
      ),
      partnerName: (
        <div
          className='cursor-pointer'
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {getPartnerName(item.thirdPartyId) !== ''
            ? getPartnerName(item.thirdPartyId)
            : '-'}
        </div>
      ),
      description: (
        <div
          className='cursor-pointer'
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.description ? (
            item?.description?.length > 30 ? (
              <Tooltip title={item?.description}>
                <div>{`${item?.description?.slice(0, 30)} ...`}</div>
              </Tooltip>
            ) : (
              item?.description
            )
          ) : (
            '-'
          )}
        </div>
      ),
      effectAt: (
        <div
          className='cursor-pointer'
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item.effectAt ? item.effectAt : '-'}
        </div>
      ),
      expiredAt: (
        <div
          className='cursor-pointer'
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.expiredAt ? item?.expiredAt : '-'}
        </div>
      ),
      authType: (
        <div
          className='cursor-pointer'
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item.authenTypeId ? authTypeName(item.authenTypeId) : '-'}
        </div>
      ),
      status: item.status ? (
        <div
          className='text-[#00CC6A] cursor-pointer'
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {t('active')}
        </div>
      ) : (
        <div
          className='text-red-500 cursor-pointer'
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {t('inactive')}
        </div>
      ),
      action: (
        <Action
          actionList={['watch', 'edit', 'search']}
          onWatchAction={() => {
            router.push(`/outbound-management/${item.id}/detail`)
          }}
          onEditAction={() => {
            router.push(`/outbound-management/${item.id}/edit`)
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
      setError,
      control,
      formState,
      trigger,
      columns,
      status,
      partners,
      partnerTypes,
      dataTable,
      page: data?.number ? data?.number : 0,
      size: data?.size ?? 20,
      totalPages: data?.totalPages,
      setValue,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
