import { useMemo, useState, useEffect } from 'react'
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { GetInput, GetInputSchema } from '@/service/uaa/logHistory/list/schema'
import { TIME_LIMITED, getTimeZone } from '@/constants/time'
import { LIST_ACTION_TYPE } from '@/constants/actionLogHistory'
import { useRouter } from 'next/router'
import {
  useQueryActionLogHistoryDetail,
} from '@/service/uaa/logHistory/list'
import { Action } from '@/components/molecules/Action'
import moment from 'moment'
import { DialogDetail } from '../Detail'

export const useList = () => {
  const { t } = useTranslation('logHistory/detail')
  const { showDialog, hideDialog } = useDialog()
  const router = useRouter()
  const defaultValues = {
    rowId: Number(router?.query?.rowId),
    tableName: router?.query?.tableName,
    // module: router?.query?.module,
  }
  const { control, setValue, watch, handleSubmit, formState } =
    useFormCustom<GetInput>({
      defaultValues,
      resolver: zodResolver(GetInputSchema),
    })

  const [queryPage, setQueryPage] = useState<any>()

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.no'),
          fieldName: 'index',
          styleCell: {
            height: '65px',
            align: 'center',
            width: '3%',
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
            align: 'left',
          },
        },
        {
          header: t('table.serverIp'),
          fieldName: 'serverIp',
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
          header: t('table.action'),
          fieldName: 'action',
          styleCell: {
            align: 'center',
          },
        },
      ] as ColumnProps[],
    [t]
  )

  const listActionType = LIST_ACTION_TYPE

  const onSubmit = handleSubmit(async (input) => {
    let body = {
      ...defaultValues,
      ...input,
    }

    if (body.actionType == 0) {
      delete body.actionType
    }
    if (body.fromActionDate == '' || body.fromActionDate === undefined) {
      delete body.fromActionDate
    }
    if (body.toActionDate == '' || body.toActionDate === undefined) {
      delete body.toActionDate
    }
    setQueryPage(body)
  })

  const { isLoading, data, refetch } =
    useQueryActionLogHistoryDetail(defaultValues)
  const dataDetail = data ?? null

  const dataTable = useMemo(() => {
    let dataRenderTable = dataDetail
    const dataQuery = queryPage
    delete dataQuery?.rowId
    delete dataQuery?.tableName

    const valueActionType = LIST_ACTION_TYPE.find(
      (it: any) => it.value === dataQuery?.actionType
    )

    let dateFrom = dataQuery?.fromActionDate
      ? dataQuery?.fromActionDate
      : TIME_LIMITED.TIME_PAST

    let dateTo = dataQuery?.toActionDate
      ? moment(dataQuery?.toActionDate).endOf('day').format()
      : moment(new Date()).format(
          `YYYY-MM-DDT${TIME_LIMITED.EXPIRED_TIME}+07:00`
        )

    if (!dataQuery?.actionType) {
      dataRenderTable = dataDetail
      if (dataQuery?.fromActionDate || dataQuery?.toActionDate) {
        dataRenderTable = dataDetail?.filter((it: any) => {
          const issueDate = moment(it?.issueDate).format('YYYY-MM-DDThh:mm:ss')
          return issueDate >= dateFrom && issueDate <= dateTo
        })
      }
    } else if (!dataQuery?.fromActionDate && !dataQuery?.toActionDate) {
      dataRenderTable = dataDetail?.filter(
        (it: any) => it?.action === valueActionType?.value
      )
    } else if (dataQuery?.fromActionDate || dataQuery?.toActionDate) {
      dataRenderTable = dataDetail?.filter((it: any) => {
        const issueDate = moment(it?.issueDate).format('YYYY-MM-DDThh:mm:ss')
        return (
          it?.action === valueActionType?.value &&
          issueDate >= dateFrom &&
          issueDate <= dateTo
        )
      })
    }

    return dataRenderTable
  }, [dataDetail, queryPage])

  useEffect(() => {
    if (!watch('actionType')) {
      setValue('actionType', '0')
    }
  }, [watch('actionType')])

  const parseDate = (str: string) => {
    return new Date(str)
  }

  const dataRenderTable = dataTable?.sort(
    (a: any, b: any) =>
      parseDate(b?.issueDate)?.getTime() - parseDate(a?.issueDate)?.getTime()
  )

  const tableData = (dataRenderTable ?? []).map((item: any, index: number) => {
    return {
      index: index + 1,
      actionType: (
        <div style={{ textAlign: 'left' }}>{item?.action || '-'}</div>
      ),
      actionDate: (
        <div style={{ textAlign: 'left' }}>
          {item?.issueDate ? getTimeZone(item?.issueDate) : '-'}
        </div>
      ),
      clientIp: (
        <div style={{ textAlign: 'left' }}>{item?.clientIp || '-'}</div>
      ),
      serverIp: (
        <div style={{ textAlign: 'left' }}>{item?.serverIp || '-'}</div>
      ),
      description: (
        <div style={{ textAlign: 'left' }}>{item?.description || '-'}</div>
      ),
      action: (
        <Action
          actionList={['watch']}
          onWatchAction={() =>
            showDialog(<DialogDetail id={item?.actionAuditId} />)
          }
        />
      ),
    }
  })

  return [
    {
      setValue,
      handleSubmit,
      watch,
      control,
      columns,
      tableData,
      listActionType,
      formState,
    },
    { onSubmit },
  ] as const
}
