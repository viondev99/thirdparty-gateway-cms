import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import {
  GetInput,
  GetInputSchema,
} from '@/service/errorManagement/attributes/list/schema'
import { useQueryGetAttributeList } from '@/service/errorManagement/attributes/list'
import { RequestBody } from '@/service/errorManagement/attributes/list/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DialogDeleteAttribute } from './DialogDeleteAttribute'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogChangeStatusAttribute } from './DialogChangeStatus'
import { renderStatus } from '@/helper/utils'
import moment from 'moment'

const defaultValues = {
  page: 0,
  size: 20,
  groupId: null,
}

export const useAttribute = () => {
  const { t } = useTranslation('error/attribute')
  const { showDialog } = useDialog()
  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)
  const methodForm = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit } = methodForm
  const { isLoading, data, refetch } = useQueryGetAttributeList(queryPage)

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
          header: t('attributeGroup'),
          fieldName: 'group',
        },
        {
          header: t('type'),
          fieldName: 'type',
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
          header: t('status'),
          fieldName: 'status',
        },
        {
          header: t('action'),
          fieldName: 'action',
        },
        {
          header: '',
          fieldName: 'changeStatus',
        },
      ] as ColumnProps[],
    [t]
  )

  const content = (data?.data?.content ?? []).map((item: any) => {
    return {
      code: item.code,
      name: item.name,
      group: item.groupName,
      type: item.type,
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
          onEditAction={() => {
            router.push({
              pathname: '/error-management/attribute-management/[id]',
              query: {
                id: item.id,
              },
            })
          }}
          onDeleteAction={() =>
            showDialog(<DialogDeleteAttribute id={item.id} refetch={refetch} />)
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
              <DialogChangeStatusAttribute id={item?.id} refetch={refetch} />
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
