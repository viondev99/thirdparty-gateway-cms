import { useMemo, useState, useCallback, useEffect } from 'react'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  GetInput,
  GetInputSchema,
} from '@/service/uaa/decodeManagement/list/schema'
import { RequestBody } from '@/service/uaa/decodeManagement/list/type'
import { listStatus, listStatus1 } from '@/constants/status'
import { DialogDeleteFeature } from '../Delete/index.page'
import { Button, Tooltip } from '@mui/material'
import { getTimeZone } from '@/constants/time'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { checkExistLocalStorage } from '@/constants/localStorage'
import { useQueryGetPartnerList } from '@/service/uaa/partner/list'
import { useQueryGetDecodeList } from '@/service/uaa/decodeManagement/list'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { ACTION_PARTNER_INFO } from '@/constants/decodeManagement'
import { DialogPublishDecode } from './Publish/index.page'
import { LIST_MODULES, TABLE_NAME } from '@/constants/logHistory'

const defaultValues = {
  thirdPartyId: 0,
  status: 2,
  code: '',
  page: 0,
  size: 10,
  sort: 'createdAt,desc',
}

export const useList = () => {
  const { t } = useTranslation('decode/list')
  const { showDialog, hideDialog } = useDialog()
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
  } = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

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
          header: t('table.code'),
          fieldName: 'code',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.thirdPartyType'),
          fieldName: 'thirdPartyTypeId',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.thirdParty'),
          fieldName: 'thirdPartyId',
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
          header: t('table.createdAt'),
          fieldName: 'createdAt',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.createdBy'),
          fieldName: 'createdBy',
          styleCell: {
            align: 'left',
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

  const getLabelListPartnerType = (item: any): any => {
    return (partnerTypes??[])?.find((el: any) => el.value == item.thirdPartyTypeId )?.label??'';
  }

  const getLabelListPartner = (item: any): any => {
    return (listPartnersInfo??[])?.find((el: any) => el.value == item.thirdPartyId)?.label??'';
  }

  const listPartners = useQueryGetPartnerList(bodyListPartners)
  let listPartnersInfo = (listPartners?.data?.partner ?? []).map((it: any) => {
    return {
      value: it.partnerId,
      label: `${it.partnerCode ?? ''} - ${it.partnerName ?? ''}`,
    }
  })
  listPartnersInfo = sortArrayByLabel(listPartnersInfo)
  listPartnersInfo.unshift({ value: 0, label: 'All' })

  useEffect(() => {
    if (watch('status') === null) {
      setValue('status', 2)
    }
  }, [watch('status')])

  useEffect(() => {
    if (!watch('code')) {
      setValue('code', '')
    }
  }, [watch('code')])

  useEffect(() => {
    if (!watch('thirdPartyId')) {
      setValue('thirdPartyId', 0)
    }
  }, [watch('thirdPartyId')])

  useEffect(() => {
    if (!watch('thirdPartyTypeId')) {
      setValue('thirdPartyTypeId', 0)
    }
  }, [watch('thirdPartyTypeId')])

  const status = listStatus()
  status.unshift({ value: 2, label: 'All' })

  const getStatusName = (statusNumber: number) => {
    const st = status.find((e) => e.value === statusNumber)
    return st?.label ?? ''
  }

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
    localStorage.setItem('decode_search', JSON.stringify(body))
  })

  useEffect(() => {
    const queryPageHistory =
      checkExistLocalStorage() && localStorage.getItem('decode_search')
    const dataQueryPageHistory = queryPageHistory
      ? JSON.parse(queryPageHistory)
      : null

    if (dataQueryPageHistory && router.query?.directFrom === 'addNewDecode') {
      setValue('thirdPartyTypeId', dataQueryPageHistory?.thirdPartyTypeId ?? 0)
      setValue('code', dataQueryPageHistory?.code ?? '')
      setValue('thirdPartyId', dataQueryPageHistory?.thirdPartyId ?? 0)
      setValue('status', dataQueryPageHistory?.status ?? 2)

      const query = {
        thirdPartyTypeId: dataQueryPageHistory?.thirdPartyTypeId,
        code: dataQueryPageHistory?.code,
        thirdPartyId: dataQueryPageHistory?.thirdPartyId,
        status: dataQueryPageHistory?.status,
        page: dataQueryPageHistory?.page,
        size: dataQueryPageHistory?.size,
        sort: dataQueryPageHistory?.sort,
      }
      setQueryPage(query)
    } else {
      localStorage.removeItem('decode_search')
    }
  }, [])

  const handleDoubleClick = useCallback(
    (item: number) => {
      router.push(`/decode-management/${item}/detail`)
    },
    [router]
  )

  const { isLoading, data, refetch } = useQueryGetDecodeList(queryPage)

  const openConfirmPublish = (id: number) => {
    showDialog(<DialogPublishDecode id={id} refetch={refetch} />)
  }

  const showPublished = (id: number) => {
    return (
      <Button
        size='small'
        variant='outlined'
        disabled={isLoading}
        style={{ padding: '16px' }}
        onClick={() => openConfirmPublish(id)}
      >
        Publish
      </Button>
    )
  }

  const goToHistoryLog = (item: any) => {
    router.push({
      pathname: '/log-history',
      query: {
        rowId: item?.id,
        tableName: TABLE_NAME.FORMAT_CONFIG,
      },
    })
  }

  const tableData = (data?.content ?? []).map((item, index) => {
    return {
      index:
        data?.number === 0
          ? index + 1
          : Number(data?.size) * Number(data?.number) + index + 1,
      code: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.code ? (
            item?.code?.length > 30 ? (
              <Tooltip title={item?.code}>
                <div>{`${item?.code?.slice(0, 30)}...`}</div>
              </Tooltip>
            ) : (
              item?.code
            )
          ) : (
            '-'
          )}
        </div>
      ),
      thirdPartyTypeId: getLabelListPartnerType(item),
      thirdPartyId: getLabelListPartner(item), 
      description: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
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
      createdAt: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item.createdAt ? getTimeZone(item.createdAt) : '-'}
        </div>
      ),
      createdBy: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item?.id)}
        >
          {item?.createdBy ? item?.createdBy : '-'}
        </div>
      ),
      status: (
        <div className='flex items-center'>
          <span
            className={`${
              item.status === 1 ? 'text-[#00CC6A]' : 'text-red-500 mr-5'
            } cursor-pointer`}
            onDoubleClick={() => handleDoubleClick(item.id)}
          >
            {getStatusName(item.status)}
          </span>
          {item.status === 0 && showPublished(Number(item.id))}
        </div>
      ),
      action: (
        <Action
          actionList={item.status != 1 ? ['watch', 'edit', 'delete', 'search'] : ['watch', 'edit', 'search']}
          onWatchAction={() => {
            router.push(`/decode-management/${item.id}/detail`)
          }}
          onEditAction={() => {
            router.push(`/decode-management/${item.id}/edit`)
          }}
          onDeleteAction={() => {
            showDialog(<DialogDeleteFeature id={item.id} refetch={refetch} />)
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
      setValue,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
      columns,
      status,
      tableData,
      page: data?.number ? data?.number : 0,
      size: data?.size ?? 10,
      totalPages: data?.totalPages,
      listPartnersInfo,
      partnerTypes,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
