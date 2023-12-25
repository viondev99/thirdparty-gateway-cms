import { useFormCustom } from '@/lib/form'
import {
  GetInput,
  GetInputSchema,
} from '@/service/uaa/actionLogHistory/detail/schema'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useQueryActionLogHistoryDetail } from '@/service/uaa/actionLogHistory/detail'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useMemo, useState } from 'react'
import { Tooltip } from '@mui/material'
import { LIST_ACTION_TYPE } from '@/constants/actionLogHistory'

export const useDetail = (id: number, refetch: any) => {
  const { t } = useTranslation('actionLogHistory/detail')
  const defaultValues = {
    id: id,
  }
  const { control } = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })
  const [showCompare, setShowCompare] = useState<boolean>(false)
  const [valueCompare, setValueCompare] = useState<object>({
    id: '',
    oldValue: '',
    newValue: '',
  })

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
          header: t('table.rowId'),
          fieldName: 'rowId',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.tableName'),
          fieldName: 'tableName',
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
          header: t('table.oldValue'),
          fieldName: 'oldValue',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.newValue'),
          fieldName: 'newValue',
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

  const getActionTypeName = (item: number) => {
    const nameType = LIST_ACTION_TYPE.find((it: any) => it.value - 1 === item)
    return nameType?.label
  }

  const getActionLogHistoryDetail =
    useQueryActionLogHistoryDetail(defaultValues)
  const dataDetail = getActionLogHistoryDetail?.data ?? null

  const tableData = (dataDetail ?? []).map((item: any, index: number) => {
    return {
      index: index + 1,
      rowId: <div style={{ textAlign: 'left' }}>{item?.rowId || '-'}</div>,
      tableName: (
        <div style={{ textAlign: 'left' }}>{item?.tableName || '-'}</div>
      ),
      actionType: (
        <div style={{ textAlign: 'left' }}>{item?.action || '-'}</div>
      ),
      oldValue: item?.oldValue ? (
        item?.oldValue?.length > 30 ? (
          <Tooltip title={item?.oldValue}>
            <div style={{ textAlign: 'left' }}>{`${item?.oldValue?.slice(
              0,
              30
            )} ...`}</div>
          </Tooltip>
        ) : (
          item?.oldValue
        )
      ) : (
        '-'
      ),
      newValue: item?.newValue ? (
        item?.newValue?.length > 30 ? (
          <Tooltip title={item?.newValue}>
            <div style={{ textAlign: 'left' }}>{`${item?.newValue?.slice(
              0,
              30
            )} ...`}</div>
          </Tooltip>
        ) : (
          item?.newValue
        )
      ) : (
        '-'
      ),
      action: (
        <div
          className='underline text-blue-600 cursor-pointer'
          onClick={() => {
            setShowCompare(true)
            setValueCompare({
              id: item?.id,
              oldValue: item?.oldValue ? item?.oldValue : '',
              newValue: item?.newValue ? item?.newValue : '',
            })
          }}
        >
          {t('table.compare')}
        </div>
      ),
    }
  })

  return [
    {
      control,
      dataDetail,
      tableData,
      columns,
      showCompare,
      valueCompare,
    },
  ] as const
}
