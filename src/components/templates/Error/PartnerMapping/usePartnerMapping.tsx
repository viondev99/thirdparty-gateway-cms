import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import {
  GetInput,
  GetInputSchema,
} from '@/service/errorManagement/partnerMapping/list/schema'
import { RequestBody } from '@/service/errorManagement/partnerMapping/list/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { DialogDeletePartnerMapping } from './DialogDelete'
import { useTranslation } from 'react-i18next'
import { useQueryGetPartnerMappingList } from '@/service/errorManagement/partnerMapping/list'
import moment from 'moment'
import { renderStatus } from '@/helper/utils'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogChangeStatusPartnerMapping } from './DialogChangeStatus'

const defaultValues = {
  errorCodeInternal: '',
  errorCodePartner: '',
  systemId: null,
  page: 0,
  size: 20,
}

export const usePartnerMapping = () => {
  const { t } = useTranslation('error/partner-mapping')
  const { showDialog } = useDialog()

  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)

  const methodForm = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit } = methodForm

  const { isLoading, data, refetch } = useQueryGetPartnerMappingList(queryPage)

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
          fieldName: 'partnerName',
        },
        {
          header: t('system'),
          fieldName: 'systemName',
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
          header: t('common:status'),
          fieldName: 'status',
        },
        {
          header: t('common:action'),
          fieldName: 'action',
        },
        { header: '', fieldName: 'changeStatus' },
      ] as ColumnProps[],
    [t]
  )

  const rowErrorCode = data
    ? (data?.data?.content ?? []).map((item: any) => {
        return {
          partnerName: item?.partnerName,
          quantity: item?.quantity,
          systemName: item?.systemName,
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
              actionList={['delete', 'edit']}
              onEditAction={() =>
                router.push(`/error-management/mapping/partner/${item?.id}`)
              }
              onDeleteAction={() =>
                showDialog(
                  <DialogDeletePartnerMapping id={item?.id} refetch={refetch} />
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
                  <DialogChangeStatusPartnerMapping
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
