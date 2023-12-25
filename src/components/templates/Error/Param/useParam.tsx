import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import {
  GetInput,
  GetInputSchema,
} from '@/service/errorManagement/parameter/list/schema'
import { RequestBody } from '@/service/errorManagement/parameter/list/type'
import { useQueryGetParameterList } from '@/service/errorManagement/parameter/list'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DialogDeleteParam } from './DialogDeleteParam'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogChangeStatusParameter } from './DialogChangeStatus'
import { renderStatus } from '@/helper/utils'
import moment from 'moment'

const defaultValues = {
  page: 0,
  size: 20,
}

export const useParam = () => {
  const { t } = useTranslation('error/param')
  const { showDialog } = useDialog()
  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)
  const methodForm = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit } = methodForm
  const { isLoading, data, refetch } = useQueryGetParameterList(queryPage)

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
          header: t('table.name'),
          fieldName: 'name',
        },
        {
          header: t('table.dataType'),
          fieldName: 'dataType',
        },
        {
          header: t('table.typeParam'),
          fieldName: 'typeParam',
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
          header: t('table.status'),
          fieldName: 'status',
        },
        {
          header: t('table.action'),
          fieldName: 'action',
        },
        {
          header: '',
          fieldName: 'changeStatus',
        },
      ] as ColumnProps[],
    [t]
  )

  const content = (data?.data?.content ?? []).map((item) => {
    return {
      templateCode: item?.templateCode,
      name: item.name,
      typeParam: item.typeParam,
      dataType: item.dataType,
      createdBy:
        item?.createdBy?.firstName ??
        '' ??
        '' + ' ' + item?.createdBy?.lastName ??
        '',
      createdAt:
        item?.createdAt && moment(item?.createdAt).format('DD/MM/YYYY'),
      status: renderStatus(item?.status),
      action: (
        <Action
          actionList={item?.status === 'DRAFT' ? ['edit', 'delete'] : []}
          onDeleteAction={() =>
            showDialog(<DialogDeleteParam id={item.id} refetch={refetch} />)
          }
          onEditAction={() =>
            router.push(`/error-management/param-management/${item?.id}`)
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
              <DialogChangeStatusParameter id={item?.id} refetch={refetch} />
            )
          }
        >
          Published
        </ButtonCustom>
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
