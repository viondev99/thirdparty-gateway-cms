import React, { useMemo, useState, useCallback, useEffect } from 'react'
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
} from '@/service/uaa/assignFeatureManagement/list/schema'
import { RequestBody } from '@/service/uaa/assignFeatureManagement/list/type'
import { useQueryGetFeatureList } from '@/service/uaa/assignFeatureManagement/list'
import { useQueryGetInternalSystemList } from '@/service/uaa/internalSystem/list'
import { useQueryGetApiFeatureList } from '@/service/uaa/apiFeature/list'
import { Options } from '@/utils/customArray'
import { listStatus1 } from '@/constants/status'
import { DialogDeleteFeature } from '../Delete/index.page'
import { Tooltip } from '@mui/material'
import { getTimeZone } from '@/constants/time'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { checkExistLocalStorage } from '@/constants/localStorage'
import { LIST_MODULES, TABLE_NAME } from '@/constants/logHistory'

const defaultValues = {
  internalServiceId: 0,
  status: 2,
  modelApiId: 0,
  page: 0,
  size: 10,
  sort: 'createdAt,desc',
}

export const convertDataAssign = (queryData: any) => {
  const clone = JSON.parse(JSON.stringify(queryData))
  if (clone?.internalServiceId) {
    const [internalServiceId, systemType] = (
      clone.internalServiceId + ''
    ).split('_')
    clone.internalServiceId = internalServiceId
    clone.systemType = systemType
  }
  return clone
}

export const useList = () => {
  const { t } = useTranslation('assignApiFeature/list')
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
          header: t('table.apiFeature'),
          fieldName: 'modelApiName',
          styleCell: {
            align: 'left',
          },
        },
        {
          header: t('table.system'),
          fieldName: 'internalServiceName',
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

  const apiFeatures = useQueryGetApiFeatureList({})
  let listApiFeature = Options(apiFeatures.data ?? [])
  listApiFeature = sortArrayByLabel(listApiFeature)
  listApiFeature.unshift({ value: 0, label: 'All' })

  const getApiFeatureName = (modelApiId: number) => {
    const apiFeature = (listApiFeature ?? []).find(
      (el: any) => el.value === modelApiId
    )
    return apiFeature?.label ?? ''
  }

  useEffect(() => {
    if (watch('status') === null) {
      setValue('status', 2)
    }
  }, [watch('status')])

  useEffect(() => {
    if (!watch('modelApiId')) {
      setValue('modelApiId', 0)
    }
  }, [watch('modelApiId')])

  useEffect(() => {
    if (!watch('internalServiceId')) {
      setValue('internalServiceId', 0)
    }
  }, [watch('internalServiceId')])

  const internalServices = useQueryGetInternalSystemList({})
  let listInternalService: { value: any; label: string }[] = Array.from(
    internalServices?.data ?? ([] as any)
  ).map((el: any) => ({
    value: el.id + '_' + el.systemType,
    label: el.systemType + ' - ' + el.code + ' - ' + el.name,
  }))
  listInternalService = sortArrayByLabel(listInternalService)
  listInternalService.unshift({ value: 0, label: 'All' })

  const getInternalServiceName = (
    internalServiceId: number,
    systemType: string
  ) => {
    const internalService = (listInternalService ?? []).find(
      (el: any) => el.value === internalServiceId + '_' + systemType
    )
    return internalService?.label ?? ''
  }

  const status = listStatus1()
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
    localStorage.setItem('assign_search', JSON.stringify(body))
  })

  useEffect(() => {
    const queryPageHistory =
      checkExistLocalStorage() && localStorage.getItem('assign_search')
    const dataQueryPageHistory = queryPageHistory
      ? JSON.parse(queryPageHistory)
      : null

    if (dataQueryPageHistory && router.query?.directFrom === 'addNewAssign') {
      setValue('modelApiId', dataQueryPageHistory?.modelApiId ?? 0)
      setValue(
        'internalServiceId',
        dataQueryPageHistory?.internalServiceId ?? 0
      )
      setValue('status', dataQueryPageHistory?.status ?? 2)

      const query = {
        modelApiId: dataQueryPageHistory?.modelApiId,
        internalServiceId: dataQueryPageHistory?.internalServiceId,
        status: dataQueryPageHistory?.status,
        page: dataQueryPageHistory?.page,
        size: dataQueryPageHistory?.size,
        sort: dataQueryPageHistory?.sort,
      }
      setQueryPage(query)
    } else {
      localStorage.removeItem('assign_search')
    }
  }, [])

  const handleDoubleClick = useCallback(
    (item: number) => {
      router.push(`/assign-api-feature-management/${item}/detail`)
    },
    [router]
  )

  const goToHistoryLog = (item: any) => {
    router.push({
      pathname: '/log-history',
      query: {
        rowId: item?.id,
        tableName: TABLE_NAME.GRANT_FEATURE_API,
      },
    })
  }

  const { isLoading, data, refetch } = useQueryGetFeatureList(
    convertDataAssign(queryPage)
  )

  const tableData = (data?.content ?? []).map((item, index) => {
    return {
      index:
        data?.number === 0
          ? index + 1
          : Number(data?.size) * Number(data?.number) + index + 1,
      modelApiName: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {item?.modelApiId || getApiFeatureName(Number(item?.modelApiId))
            ? getApiFeatureName(Number(item.modelApiId))
            : '-'}
        </div>
      ),
      internalServiceName: (
        <div
          style={{ textAlign: 'left', cursor: 'pointer' }}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {getInternalServiceName(
            item?.internalServiceId as any,
            item?.systemType ?? ''
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
      status: (
        <span
          className={`${
            item.status === 1 ? 'text-[#00CC6A]' : 'text-red-500'
          } cursor-pointer`}
          onDoubleClick={() => handleDoubleClick(item.id)}
        >
          {getStatusName(item.status)}
        </span>
      ),
      action: (
        <Action
          actionList={['watch', 'edit', 'delete', 'search']}
          onWatchAction={() => {
            router.push(`/assign-api-feature-management/${item.id}/detail`)
          }}
          onEditAction={() => {
            router.push(`/assign-api-feature-management/${item.id}/edit`)
          }}
          onDeleteAction={() => {
            showDialog(
              <DialogDeleteFeature
                id={item.id}
                name={getApiFeatureName(Number(item.modelApiId))}
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
      setError,
      control,
      formState,
      trigger,
      setValue,
      columns,
      status,
      tableData,
      listApiFeature,
      listInternalService,
      page: data?.number ? data?.number : 0,
      size: data?.size ?? 20,
      totalPages: data?.totalPages,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
