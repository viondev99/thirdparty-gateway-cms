import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import {
  GetInput,
  GetInputSchema,
} from '@/service/errorManagement/clientMapping/list/schema'
import { RequestBody } from '@/service/errorManagement/clientMapping/list/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { DialogDeleteClientMapping } from './DialogDelete'
import { useTranslation } from 'react-i18next'
import { useQueryGetClientMappingList } from '@/service/errorManagement/clientMapping/list'
import moment from 'moment'

const defaultValues = {
  errorCodeInternal: '',
  errorCodeClient: '',
  systemId: null,
  page: 0,
  size: 20,
}

export const useClientMapping = () => {
  const { t } = useTranslation('error/client-mapping')
  const { showDialog } = useDialog()

  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const methodForm = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit, reset } = methodForm

  const { isLoading, data, refetch } = useQueryGetClientMappingList(queryPage)

  const onSubmit = handleSubmit(async (input) => {
    setQueryPage({ ...input })
  })

  const onChangePageSize = (val: any) => {
    const { page, size } = val
    setQueryPage({ ...queryPage, page, size })
  }

  const columns = useMemo(
    () =>
      [
        {
          header: t('client'),
          fieldName: 'partnerName',
        },
        {
          header: t('totalErrorCode'),
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
          header: t('common:action'),
          fieldName: 'action',
        },
      ] as ColumnProps[],
    [t]
  )

  const rowErrorCode = data
    ? (data?.data?.content ?? []).map((item: any) => {
        return {
          partnerName: item?.partnerName,
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
              actionList={['delete', 'edit']}
              onEditAction={() =>
                router.push(`/error-management/mapping/client/${item?.id}`)
              }
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteClientMapping id={item?.id} refetch={refetch} />
                )
              }
            />
          ),
        }
      })
    : []

  return [
    { control, rowErrorCode, columns, data: data?.data, isLoading, t },
    { onSubmit, onChangePageSize },
  ] as const
}
