import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import { useQueryGetErrorCodePartnerList } from '@/service/errorManagement/errorCodePartners/list'
import { GetInputSchema } from '@/service/errorManagement/errorCodePartners/list/schema'
import { RequestBody } from '@/service/errorManagement/errorCodePartners/list/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { Box } from '@mui/material'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { DialogDeleteErrorCodePartner } from './DialogDelete'
import { useTranslation } from 'react-i18next'
import moment from 'moment'
import { renderStatus } from '@/helper/utils'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogChangeStatusErrorCodePartner } from './DialogChangeStatus'
import { truncateText } from '@/helper/truncateText'

const defaultValues = {
  page: 0,
  size: 20,
  partnerId: null,
  search: '',
}

export const useErrorCodePartners = () => {
  const { showDialog } = useDialog()
  const { t } = useTranslation('error/error-code-partners')

  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const methodForm = useFormCustom<RequestBody['GET']>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit } = methodForm

  const { isLoading, data, refetch } =
    useQueryGetErrorCodePartnerList(queryPage)

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
          header: t('partner'),
          fieldName: 'partners',
        },
        {
          header: t('errorCode'),
          fieldName: 'code',
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
          partners: item?.partnerName,
          createdBy:
            item?.createdBy?.firstName ??
            '' ??
            '' + ' ' + item?.createdBy?.lastName ??
            '',
          status: renderStatus(item?.status),
          createdAt:
            item?.createdAt && moment(item?.createdAt).format('DD/MM/YYYY'),
          description: truncateText(item?.description),
          solution: truncateText(item?.solution),
          action: (
            <Action
              actionList={item?.status === 'DRAFT' ? ['delete', 'edit'] : []}
              onEditAction={() =>
                router.push(`/error-management/partner-error-code/${item?.id}`)
              }
              onDeleteAction={() =>
                showDialog(
                  <DialogDeleteErrorCodePartner
                    id={item?.id}
                    refetch={refetch}
                  />
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
                  <DialogChangeStatusErrorCodePartner
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
