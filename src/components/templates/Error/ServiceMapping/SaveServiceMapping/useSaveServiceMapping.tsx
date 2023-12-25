import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { errorFormField, errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetErrorCodeList } from '@/service/errorManagement/errorCode/list'
import { RequestBody } from '@/service/errorManagement/errorCode/list/type'
import { useQueryGetServiceMappingDetail } from '@/service/errorManagement/serviceMapping/getDetail'
import {
  postServiceMapping,
  putServiceMapping,
} from '@/service/errorManagement/serviceMapping/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/serviceMapping/save/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'
import { chunk } from 'lodash'

const defaultValues = {
  id: null,
  serviceId: null,
  systemId: null,
  search: '',
}

const informationErrorCode = [
  {
    fieldName: 'code',
    label: 'Error Code',
  },
  {
    fieldName: 'name',
    label: 'Error Name',
  },
  {
    fieldName: 'systemName',
    label: 'System',
  },
  {
    fieldName: 'description',
    label: 'Description',
  },
  {
    fieldName: 'solution',
    label: 'Solution',
  },
]

export const useSaveServiceMapping = () => {
  const { t } = useTranslation('error/service-mapping')

  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>({
    page: 0,
    size: 20,
    search: '',
  })
  const [queryPageErrorSelected, setQueryPageErrorSelected] = useState<{
    page: number
    size: number
  }>({
    page: 0,
    size: 10,
  })
  const [errorCodeSelected, setErrorCodeSelected] = useState<any>([])

  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    resolver: zodResolver(SaveInputSchema),
  })

  const {
    control,
    formState,
    handleSubmit,
    reset,
    setError,
    watch,
    register,
    setValue,
  } = methodForm

  const [systemId, search] = watch(['systemId', 'search'])

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putServiceMapping : postServiceMapping,
    {
      onSuccess: (res: any) => {
        // if (res?.data?.fieldErrors && res?.data?.fieldErrors.length > 0) {
        //   errorFormField(
        //     setError,
        //     res?.data?.fieldErrors,
        //     res?.data?.description ?? 'System Error'
        //   )
        // } else {
        //   successMsg('Success')
        //   router.back()
        // }
        if (res?.data?.httpCode !== 200) {
          errorMsg(res?.data?.description)
        } else {
          successMsg('Success')
          router.back()
        }
      },
      onError: (error: any) => {
        errorMsg(error)
      },
    }
  )

  const columns = useMemo(
    () =>
      [
        {
          header: t('errorCode'),
          fieldName: 'code',
        },
        {
          header: t('errorName'),
          fieldName: 'name',
        },
        {
          header: t('system'),
          fieldName: 'systemName',
        },
        {
          header: t('description'),
          fieldName: 'description',
        },

        {
          header: '',
          fieldName: 'action',
        },
      ] as ColumnProps[],
    [t]
  )

  const chunkErrorCodeSelected = chunk(
    errorCodeSelected,
    queryPageErrorSelected.size ?? 5
  )

  const rowErrorCodeSelected = (
    chunkErrorCodeSelected[queryPageErrorSelected.page ?? 0] ?? []
  ).map((item: any) => {
    return {
      code: item?.code,
      name: item?.name,
      description: (
        <Box
          dangerouslySetInnerHTML={{
            __html: item?.description ?? '',
          }}
        />
      ),
      systemName: item?.systemName,
      action: (
        <Action
          actionList={['delete']}
          onDeleteAction={() =>
            setErrorCodeSelected((prev: any) =>
              [...prev].filter((x) => x?.id !== item?.id)
            )
          }
        />
      ),
    }
  })

  const onSubmit = handleSubmit(async (data) => {
    data.id = id
    mutate(data)
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const onChangePageSizeErrorSelected = (val: any) => {
    const { page, size } = val
    setQueryPageErrorSelected({ ...queryPage, page, size })
  }

  const { data, isLoading } = useQueryGetServiceMappingDetail(
    { id },
    { enabled: !!id }
  )

  const { data: errorCodes, isLoading: isLoadingErrorCodes } =
    useQueryGetErrorCodeList({
      ...queryPage,
      status: 'PUBLISHED',
      systemId,
    })

  useEffect(() => {
    const debounceSearch = setTimeout(
      () => setQueryPage((prev) => ({ ...prev, search })),
      1000
    )

    return () => clearTimeout(debounceSearch)
  }, [search])

  useEffect(() => {
    if (id && data && data.data) {
      reset(data.data)
      setErrorCodeSelected(data?.data?.errorCodeResponses)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data, reset])

  useEffect(() => {
    setValue(
      'errorCodeIds',
      errorCodeSelected?.map((i: any) => i?.id)
    )
  }, [errorCodeSelected, setValue])

  return [
    {
      control,
      formState,
      watch,
      register,
      isUpdate,
      isLoading,
      isLoadingSubmit,
      errorCodes,
      isLoadingErrorCodes,
      errorCodeSelected,
      setErrorCodeSelected,
      informationErrorCode,
      t,
      columns,
      rowErrorCodeSelected,
      queryPageErrorSelected,
      setQueryPageErrorSelected,
      onChangePageSizeErrorSelected,
      chunkErrorCodeSelected,
    },
    { onSubmit, onCancel, onChangePageSize },
  ] as const
}
