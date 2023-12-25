import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { useQueryGetListFormatManagement } from '@/service/uaa/format-management/getListFormatManagement'
import moment from 'moment'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DialogDeleteConfirm } from '../Delete/index.page'
import { FormatPathUrl } from '../FormatPathUrl'
import { Button } from '@mui/material'
import { DialogPublishFormat } from '@/components/templates/FormatManagement/Publish/index.page'
import { LIST_MODULES, TABLE_NAME } from '@/constants/logHistory'

const defaultValues = {
  code: '',
  status: '2',
  page: 0,
  size: 10,
  sort: 'createdAt,desc',
}

export const useList = () => {
  const { t } = useTranslation('format/list')
  const { t: tCommon } = useTranslation('common')
  const router = useRouter()
  const [page, setPage] = useState(0)
  const [size, setSize] = useState(10)

  const { control, watch, formState, setValue, handleSubmit, register } =
    useFormCustom({
      defaultValues: defaultValues,
    })

  const [queryPage, setQueryPage] = useState<any>(defaultValues)

  const onSubmit = (reset?: any) =>
    handleSubmit((inputs) => {
      setQueryPage({ ...inputs, page: 0, size: size })
      setPage(0)
      reset?.()
    })

  const onChangeSort = (sortValue: any) => {
    if (sortValue?.length > 0) {
      setQueryPage({ ...queryPage, sort: sortValue })
      setPage(0)
    }
  }

  const { showDialog } = useDialog()

  const { isLoading, data, refetch } =
    useQueryGetListFormatManagement(queryPage)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.no'),
          fieldName: 'index',
          styleCell: {
            align: 'center',
            sx: {
              whiteSpace: 'nowrap',
            },
          },
        },
        {
          header: t('table.code'),
          fieldName: 'code',
          styleCell: {
            align: 'left',
            sx: {
              whiteSpace: 'nowrap',
            },
          },
        },
        {
          header: t('table.value'),
          fieldName: 'value',
          styleCell: {
            align: 'left',
            sx: {
              whiteSpace: 'nowrap',
            },
          },
        },
        {
          header: t('table.description'),
          fieldName: 'description',
          styleCell: {
            align: 'left',
            sx: {
              whiteSpace: 'nowrap',
            },
          },
        },
        {
          header: t('table.created_at'),
          fieldName: 'createdAt',
          styleCell: {
            align: 'center',
            sx: {
              whiteSpace: 'nowrap',
            },
          },
        },
        {
          header: t('table.created_by'),
          fieldName: 'created_by',
          styleCell: {
            align: 'center',
            sx: {
              whiteSpace: 'nowrap',
            },
          },
        },
        {
          header: t('table.status'),
          fieldName: 'status',
          styleCell: {
            align: 'center',
            sx: {
              whiteSpace: 'nowrap',
            },
          },
        },
        {
          header: t('table.action'),
          fieldName: 'action',
          styleCell: {
            align: 'center',
            sx: {
              whiteSpace: 'nowrap',
            },
          },
        },
      ] as ColumnProps[],
    [t]
  )

  useEffect(() => {
    if (!watch('status')) {
      setValue('status', '2')
    }
  }, [watch('status')])

  const renderStatus = (status: any) => {
    return status == 1 ? t('Published') : t('Draft')
  }

  const onChangePageSize = ({ page, size }: any) => {
    setPage(page)
    setSize(size)
    setQueryPage({ ...queryPage, page, size })
  }

  const openConfirmPublish = (id: number) => {
    showDialog(<DialogPublishFormat id={id} refetch={refetch} />)
  }

  const showPublished = (id: number) => {
    return (
      <Button
        size='small'
        variant='outlined'
        disabled={isLoading}
        style={{ padding: '16px' }}
        onClick={() => {
          openConfirmPublish(id)
        }}
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

  const renderActionList = (item: any): any[] => {
    if (item.status == 0) {
      return ['watch', 'edit', 'delete', 'search']
    }
    return ['watch', 'edit', 'search']
  }

  const tableData = data?.data?.content?.map((el, index: number) => {
    return {
      id: el.id,
      index: index + 1,
      code: el.code,
      value: el.value,
      description: el.description,
      createdAt: moment(el.createdAt).format('DD/MM/YYYY HH:mm:ss'),
      created_by: el.createdBy,
      status: el.status ? (
        <div className='text-[#00CC6A]'>{renderStatus(el.status)}</div>
      ) : (
        <div className='text-red-500 flex items-center justify-center'>
          <span>{renderStatus(Number(el.status))}</span>
          <span className={'ml-5'}>{showPublished(Number(el.id))}</span>
        </div>
      ),
      action: (
        <Action
          actionList={renderActionList(el)}
          onWatchAction={() => {
            router.push(FormatPathUrl.DETAIL.replace('[id]', String(el.id)))
          }}
          onEditAction={() => {
            router.push(FormatPathUrl.EDIT.replace('[id]', String(el.id)))
          }}
          onDeleteAction={() => {
            showDialog(
              <DialogDeleteConfirm
                id={el.id}
                name={tCommon('label.delete')}
                refetch={refetch}
              />
            )
          }}
          onSearchAction={() => goToHistoryLog(el)}
        />
      ),
    }
  })

  const onDoubleClick = (row: any) => {
    router.push(FormatPathUrl.DETAIL.replace('[id]', String(row.id)))
  }

  return [
    {
      t,
      tCommon,
      control,
      formState,
      setValue,
      tableData,
      columns,
      totalPages: data?.data?.totalPages,
      page: data?.data?.number,
      size: data?.data?.size,
      isLoading,
      router,
    },
    { onSubmit, onChangePageSize, onDoubleClick, onChangeSort },
  ] as const
}
