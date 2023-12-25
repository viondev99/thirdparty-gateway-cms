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
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { DialogDeleteErrorCode } from './DialogDelete'
import { useTranslation } from 'react-i18next'
import { renderStatus } from '@/helper/utils'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogChangeStatusErrorCode } from './DialogChangeStatus'
import moment from 'moment'
import { truncateText } from '@/helper/truncateText'

const defaultValues = {
  search: '',
  systemId: null,
  page: 0,
  size: 20,
}

export const useErrorCode = () => {
  const { t } = useTranslation('error/error-code')
  const { showDialog } = useDialog()

  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const methodForm = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit, reset } = methodForm

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
          header: t('common:system'),
          fieldName: 'systemName',
        },
        {
          header: t('description'),
          fieldName: 'description',
          styleCell: { style: { width: 250 } },
        },
        {
          header: t('solution'),
          fieldName: 'solution',
          styleCell: { style: { width: 250 } },
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

  const rowErrorCode = data
    ? (data?.data?.content ?? []).map((item: any) => {
        return {
          code: item?.code,
          systemName: item?.systemName,
          createdBy:
            item?.createdBy?.firstName ??
            '' ??
            '' + ' ' + item?.createdBy?.lastName ??
            '',
          createdAt:
            item?.createdAt && moment(item?.createdAt).format('DD/MM/YYYY'),
          description: truncateText(item?.description),
          solution: truncateText(item?.solution),
          status: renderStatus(item?.status),
          action: (
            <Action
              actionList={item?.status === 'DRAFT' ? ['delete', 'edit'] : []}
              onEditAction={() =>
                router.push(`/error-management/error-code/${item?.id}`)
              }
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteErrorCode id={item?.id} refetch={refetch} />
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
                  <DialogChangeStatusErrorCode
                    id={item?.id}
                    refetch={refetch}
                  />
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
    { control, rowErrorCode, columns, data: data?.data, isLoading, t },
    { onSubmit, onChangePageSize },
  ] as const
}
