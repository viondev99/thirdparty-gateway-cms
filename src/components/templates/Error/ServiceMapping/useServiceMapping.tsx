import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import {
  GetInput,
  GetInputSchema,
} from '@/service/errorManagement/serviceMapping/list/schema'
import {
  downloadFileError,
  useQueryGetServiceMappingList,
} from '@/service/errorManagement/serviceMapping/list'
import { RequestBody } from '@/service/errorManagement/serviceMapping/list/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DialogDeleteServiceMapping } from './DialogDeleteServiceMapping'
import { useMutation } from 'react-query'
import { errorMsg, successMsg } from '@/helper/message'
import { createDownloadFile } from '@/helper/download'
import moment from 'moment'

const defaultValues = {
  page: 0,
  size: 20,
}

export const useServiceMapping = () => {
  const { t } = useTranslation('error/service-mapping')
  const { showDialog } = useDialog()
  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)
  const methodForm = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit } = methodForm
  const { isLoading, data, refetch } = useQueryGetServiceMappingList(queryPage)

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const handleDownload = useMutation(downloadFileError, {
    onSuccess: (data) => {
      createDownloadFile(data, 'error-code')
      successMsg('Download Success')
      refetch()
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const columns = useMemo(
    () =>
      [
        {
          header: t('table.service'),
          fieldName: 'name',
        },
        {
          header: t('table.totalErrorCode'),
          fieldName: 'quantity',
        },
        {
          header: t('common:createdAt'),
          fieldName: 'createdAt',
        },
        {
          header: t('common:createdBy'),
          fieldName: 'createdBy',
        },

        {
          header: t('table.action'),
          fieldName: 'action',
        },
      ] as ColumnProps[],
    [t]
  )

  const content = (data?.data?.content ?? []).map((item) => {
    return {
      name: item?.name,
      quantity: item?.quantity,
      createdBy:
        item?.createdBy?.firstName ??
        '' ??
        '' + ' ' + item?.createdBy?.lastName ??
        '',
      createdAt:
        item?.createdAt && moment(item?.createdAt).format('DD/MM/YYYY'),
      action: (
        <Action
          actionList={['lock', 'edit', 'download', 'sync']}
          onEditAction={() => {
            router.push({
              pathname: '/error-management/mapping/service/[id]',
              query: {
                id: item.id,
              },
            })
          }}
          onDeleteAction={() =>
            showDialog(
              <DialogDeleteServiceMapping id={item.id} refetch={refetch} />
            )
          }
          onDownloadAction={() => handleDownload.mutate({ id: item?.id })}
        />
      ),
    }
  })

  return [
    {
      control,
      content,
      columns,
      isLoading,
      data: data?.data,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
