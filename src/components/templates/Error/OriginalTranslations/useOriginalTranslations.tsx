import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { useQueryGetErrorCodeList } from '@/service/errorManagement/errorCode/list'
import {
  GetInput,
  GetInputSchema,
} from '@/service/errorManagement/errorCode/list/schema'
import { RequestBody } from '@/service/errorManagement/errorCode/list/type'
import { zodResolver } from '@hookform/resolvers/zod'
import moment from 'moment'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'

const defaultValues = {
  search: '',
  languageId: null,
  page: 0,
  size: 20,
}

export const useOriginalTranslations = () => {
  const { t } = useTranslation('error/original-translation')
  const { showDialog } = useDialog()

  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const methodForm = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit } = methodForm

  const { isLoading, data, refetch } = useQueryGetErrorCodeList(queryPage)

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
          header: t('code'),
          fieldName: 'code',
        },
        {
          header: t('defaultLanguageName'),
          fieldName: 'defaultLanguageName',
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
          header: t('common:status'),
          fieldName: 'status',
        },
        {
          header: t('common:action'),
          fieldName: 'action',
        },
      ] as ColumnProps[],
    [t]
  )

  const rowOriginalTranslations = data
    ? (data?.data?.content ?? []).map((item: any) => {
        return {
          code: item?.code,
          defaultLanguageName: item?.defaultLanguageName,
          createdBy:
            item?.createdBy?.firstName ??
            '' ??
            '' + ' ' + item?.createdBy?.lastName ??
            '',
          createdAt:
            item?.createdAt && moment(item?.createdAt).format('DD/MM/YYYY'),
          status: item?.status,
          action: (
            <Action
              actionList={['edit']}
              onEditAction={() =>
                router.push(
                  `/error-management/original-translation/${item?.id}`
                )
              }
            />
          ),
        }
      })
    : []

  return [
    {
      control,
      rowOriginalTranslations,
      columns,
      data: data?.data,
      isLoading,
      t,
    },
    { onSubmit, onChangePageSize },
  ] as const
}
