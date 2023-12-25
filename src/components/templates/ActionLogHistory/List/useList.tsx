import { useMemo, useState, useCallback, useEffect } from 'react'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import {
  PostInput,
  PostInputSchema,
} from '@/service/uaa/actionLogHistory/list/schema'
import {
  QueryParams,
  RequestBody,
} from '@/service/uaa/actionLogHistory/list/type'
import { TIME_LIMITED, getTimeZone } from '@/constants/time'
import {
  getActionLogHistoryList,
  useQueryGetActionLogHistoryList,
} from '@/service/uaa/actionLogHistory/list'
import { DialogDetail } from '../Detail'
import {
  LIST_ACTION_TYPE_SEARCH,
  LIST_MODULES,
} from '@/constants/actionLogHistory'
import moment from 'moment'

const defaultParams = {
  page: 0,
  size: 10,
  sort: 'issueDatetime,desc',
}

const defaultValues = {
  module: 0,
  actionType: 0,
  actionUser: '',
  fromActionDate: ``,
  toActionDate: ``,
  code: '',
}

export const useList = () => {
  const { t } = useTranslation('actionLogHistory/list')
  const { showDialog, hideDialog } = useDialog()

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
    clearErrors,
  } = useFormCustom<PostInput>({
    defaultValues,
    resolver: zodResolver(PostInputSchema),
  })

  const [isRefetch, setIsRefetch] = useState<boolean>(false)

  const [queryPage, setQueryPage] = useState<RequestBody['POST']>(defaultValues)
  const [queryParams, setQueryParams] =
    useState<QueryParams['POST']>(defaultParams)
  const [loading, setLoading] = useState(false)

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
          header: t('table.module'),
          fieldName: 'module',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.actionType'),
          fieldName: 'actionType',
          styleCell: {
            align: 'left',
          },
        },

        {
          header: t('table.actionUser'),
          fieldName: 'actionUser',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.actionDate'),
          fieldName: 'actionDate',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.clientIp'),
          fieldName: 'clientIp',
          styleCell: {
            align: 'center',
          },
        },
        {
          header: t('table.serverIp'),
          fieldName: 'serverIp',
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
          header: t('table.action'),
          fieldName: 'action',
          styleCell: {
            align: 'center',
          },
        },
      ] as ColumnProps[],
    [t]
  )

  const listModule = LIST_MODULES

  const listActionType = LIST_ACTION_TYPE_SEARCH

  useEffect(() => {
    if (!watch('module')) {
      setValue('module', 0)
    }
  }, [watch('module')])

  useEffect(() => {
    if (!watch('actionType')) {
      setValue('actionType', 0)
    }
  }, [watch('actionType')])

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryParams({ ...queryParams, page, size })
  }

  const onSubmit = handleSubmit(async (input) => {
    let body = {
      ...defaultValues,
      ...input,
    }

    if (watch('fromActionDate')) {
      body = {
        ...body,
        fromActionDate: moment(body.fromActionDate).format(
          'YYYY-MM-DD' + 'T' + TIME_LIMITED.EFFECTIVE_TIME
        ),
      }
    }

    if (watch('toActionDate')) {
      body = {
        ...body,
        toActionDate: moment(body.toActionDate).format(
          'YYYY-MM-DD' + 'T' + TIME_LIMITED.EXPIRED_TIME
        ),
      }
    }

    await setQueryPage(body)
    await getActionLogHistoryList(queryParams, body)
    setIsRefetch(true)
  })

  const handleDoubleClick = useCallback((item: number) => {
    showDialog(<DialogDetail id={item} refetch={refetch} />)
  }, [])

  const { isLoading, data, refetch } = useQueryGetActionLogHistoryList(
    queryParams,
    queryPage
  )

  useEffect(() => {
    setIsRefetch(false)
  }, [queryPage])

  useEffect(() => {
    refetch()
  }, [isRefetch])

  const tableData = (data?.content ?? []).map((item, index) => {
    return {
      index:
        data?.number === 0
          ? index + 1
          : Number(data?.size) * Number(data?.number) + index + 1,
      module: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.actionModule ? item?.actionModule : '-'}
        </div>
      ),
      actionType: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.actionCode ? item?.actionCode : '-'}
        </div>
      ),
      actionUser: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.userName ? item?.userName : '-'}
        </div>
      ),
      actionDate: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.issueDatetime ? getTimeZone(item?.issueDatetime) : '-'}
        </div>
      ),
      clientIp: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.clientIp ? item?.clientIp : '-'}
        </div>
      ),
      serverIp: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.serverIp ? item?.serverIp : '-'}
        </div>
      ),
      description: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.description ? item?.description : '-'}
        </div>
      ),
      action: (
        <Action
          actionList={['watch']}
          onWatchAction={() => {
            showDialog(<DialogDetail id={item.id} refetch={refetch} />)
          }}
        />
      ),
    }
  })

  return [
    {
      isLoading,
      loading,
      register,
      setValue,
      handleSubmit,
      watch,
      setError,
      clearErrors,
      control,
      formState,
      trigger,
      columns,
      tableData,
      page: data?.number ? data?.number : 0,
      size: data?.size ?? 10,
      totalPages: data?.totalPages,
      listModule,
      listActionType,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
