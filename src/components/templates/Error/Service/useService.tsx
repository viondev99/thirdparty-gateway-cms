import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { useQueryGetServiceList } from '@/service/errorManagement/service/list'
import { GetInputSchema } from '@/service/errorManagement/service/list/schema'
import { RequestBody } from '@/service/errorManagement/service/list/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { DialogDeleteService } from './DialogDelete'
import { useTranslation } from 'react-i18next'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogChangeStatusService } from './DialogChangeStatus'
import { renderStatus } from '@/helper/utils'
import moment from 'moment'

const defaultValues = {
  page: 0,
  size: 20,
  search: '',
}

export const useService = () => {
  const { t } = useTranslation('error/service')
  const { showDialog } = useDialog()

  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit } = methodForm

  const { isLoading, data, refetch } = useQueryGetServiceList(queryPage)

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
          header: t('name'),
          fieldName: 'name',
        },
        {
          header: t('urlReference'),
          fieldName: 'urlReference',
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
        {
          header: '',
          fieldName: 'changeStatus',
        },
      ] as ColumnProps[],
    [t]
  )

  const rowService = data
    ? (data?.data?.content ?? []).map((item: any) => {
        return {
          code: item?.code,
          name: item?.name,
          urlReference: item?.urlReference,
          status: renderStatus(item?.status),
          createdBy:
            item?.createdBy?.firstName ??
            '' ??
            '' + ' ' + item?.createdBy?.lastName ??
            '',
          createdAt:
            item?.createdAt && moment(item?.createdAt).format('DD/MM/YYYY'),
          action: (
            <Action
              actionList={item?.status === 'DRAFT' ? ['delete'] : []}
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteService id={item?.id} refetch={refetch} />
                )
              }
            />
          ),
          changeStatus: item?.status === 'DRAFT' && (
            <ButtonCustom
              theme='reset'
              width={80}
              height={24}
              fontSize={12}
              sx={{ padding: 0, minHeight: '24px', maxHeight: '24px' }}
              onClick={() =>
                showDialog(
                  <DialogChangeStatusService id={item?.id} refetch={refetch} />
                )
              }
            >
              Published
            </ButtonCustom>
          ),
        }
      })
    : []

  return [
    { control, rowService, columns, data: data?.data, t, isLoading },
    { onSubmit, onChangePageSize },
  ] as const
}
