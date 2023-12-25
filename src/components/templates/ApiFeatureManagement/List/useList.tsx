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
} from '@/service/uaa/apiFeatureManagement/list/schema'
import { RequestBody } from '@/service/uaa/apiFeatureManagement/list/type'
import { useQueryGetFeatureList } from '@/service/uaa/apiFeatureManagement/list'
import { useQueryGetApiFeatureList } from '@/service/uaa/apiFeature/list'
import { Options } from '@/utils/customArray'
import { listStatus, listStatus1 } from '@/constants/status'
import { DialogDeleteApiFeature } from '../Delete/index.page'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogPublishApiFeature } from '@/components/templates/ApiFeatureManagement/List/Publish/index.page'
import moment from 'moment'
import { Button, Tooltip } from '@mui/material'
import { getTimeZone } from '@/constants/time'
import { checkExistLocalStorage } from '@/constants/localStorage'
import { LIST_MODULES, TABLE_NAME } from '@/constants/logHistory'

const defaultValues = {
  status: 2,
  name: '',
  page: 0,
  size: 10,
  sort: 'createdAt,desc',
}

export const useList = () => {
  const { t } = useTranslation('apiFeature/list')
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

  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.no'),
          fieldName: 'index',
          styleCell: {
            height: '65px',
            align: 'center'
          },
        },
        {
          header: t('table.apiFeature'),
          fieldName: 'apiFeature',
        },
        {
          header: t('table.description'),
          fieldName: 'description',
        },

        {
          header: t('table.createdAt'),
          fieldName: 'createdDate',
        },
        {
          header: t('table.createdBy'),
          fieldName: 'createdBy',
        },
        {
          header: t('table.status'),
          fieldName: 'status',
          styleCell: {
            align: 'center'
          },
        },
        {
          header: t('table.action'),
          fieldName: 'action',
          styleCell: {
            align: 'center'
          },
        },
      ] as ColumnProps[],
    [t]
  )

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
    localStorage.setItem('feature_search', JSON.stringify(body))
  })

  useEffect(() => {
    const queryPageHistory = checkExistLocalStorage() && localStorage.getItem('feature_search')
    const dataQueryPageHistory = queryPageHistory ? JSON.parse(queryPageHistory) : null

    if(queryPageHistory && router.query?.directFrom === 'addNewFeature') {
      setValue('name', dataQueryPageHistory?.name ?? '')
      setValue('status', dataQueryPageHistory?.status ?? 2)

      const query = {
        name: dataQueryPageHistory?.name,
        status: dataQueryPageHistory?.status,
        page: dataQueryPageHistory?.page,
        size: dataQueryPageHistory?.size,
        sort: dataQueryPageHistory?.sort
      }
      setQueryPage(query)
    } else {
      localStorage.removeItem('feature_search')
    }
  }, [])

  const openConfirmPublish = (id: number, apiFeatureName: any) => {
    showDialog(
      <DialogPublishApiFeature
        id={id}
        name={apiFeatureName}
        refetch={refetch}
      />
    )
  }

  const showPublished = (id: number, apiFeatureName: string) => {
    return (
      <Button
        size="small"
        variant="outlined"
        disabled={isLoading}
        style={{padding: '16px'}}
        onClick={() => openConfirmPublish(id, apiFeatureName)}
      >
        Publish
      </Button>
    )
  }

  const { isLoading, data, refetch } = useQueryGetFeatureList(queryPage)

  function convertAndFormatString(inputString: string) {
    const cleanedString = inputString.replace(/[^A-Za-z0-9\s]/g, ' ')

    const lowercaseString = cleanedString.toLowerCase()

    const words = lowercaseString.split(' ')
    for (let i = 0; i < words.length; i++) {
      if (words[i].length > 0) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1)
      }
    }
    const titleCaseString = words.join(' ')

    return titleCaseString
  }

  const handleDoubleClick = useCallback(
    (item: number) => {
      router.push(`/api-feature-management/${item}/detail`)
    },
    [router]
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

  const tableData = (data?.content ?? []).map((item, index) => {
    return {
      index: data?.number === 0 ? index + 1 : Number(data?.size) * Number(data?.number) + index + 1,
      apiFeature: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(Number(item.id))}
        >
          {
            item?.name ?
              (
                item?.name?.length > 30 ? 
                <Tooltip title={item?.name}>
                  <div>{`${item?.name?.slice(0, 30)} ...`}</div>
                </Tooltip>
              : 
                item?.name
              )
            : '-'
          }
        </div>
      ),
      createdDate: (
        <div
          className='cursor-pointer'
          onDoubleClick={() => handleDoubleClick(Number(item.id))}
        >
          {item.createdAt ? getTimeZone(item.createdAt) : '-'}
        </div>
      ),
      createdBy: (
        <div
          className='cursor-pointer'
          onDoubleClick={() => handleDoubleClick(Number(item.id))}
        >
          {item.createdBy ? item.createdBy : '-'}
        </div>
      ),
      description: (
        <div
          style={{whiteSpace: 'pre-wrap'}}
          className='cursor-pointer'
          onDoubleClick={() => handleDoubleClick(Number(item.id))}
        >
          {item?.description ?
            (
              item?.description?.length > 30 ? 
                <Tooltip title={item?.description}>
                  <div>{`${item?.description?.slice(0, 30)} ...`}</div>
                </Tooltip>
              : item?.description
            )
            : '-'
          }
        </div>
      ),
      status: item.status ? (
        <div className='text-[#00CC6A]'>{getStatusName(item.status)}</div>
      ) : (
        <div className='text-red-500 flex items-center justify-center'>
          <div>{getStatusName(Number(item.status))}</div>
          <span style={{ marginLeft: 10 }}>
            {showPublished(Number(item.id), item.apiCode ? item.apiCode + '-' + item.name : '')}
          </span>
        </div>
      ),
      action: (
        <Action
          actionList={!item.status ? ['watch', 'edit', 'delete', 'search'] : ['watch', 'search']}
          onWatchAction={() => {
            router.push(`/api-feature-management/${item.id}/detail`)
          }}
          onEditAction={() => {
            router.push(`/api-feature-management/${item.id}/edit`)
          }}
          onDeleteAction={() => {
            showDialog(
              <DialogDeleteApiFeature
                id={item.id ? item.id : 0}
                name={item.apiCode ? item.apiCode + '-' + item.name : ''}
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
      size: data?.size ?? 20,
      totalPages: data?.totalPages,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
