import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { useFormCustom } from '@/lib/form'
import {
  changeStatusAttributeGroup,
  useQueryGetAttributeGroupList,
} from '@/service/errorManagement/attributeGroup/list'
import {
  GetInput,
  GetInputSchema,
} from '@/service/errorManagement/attributeGroup/list/schema'
import { RequestBody } from '@/service/errorManagement/attributeGroup/list/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DialogDeleteAttributeGroup } from './DialogDeleteAttributeGroup'
import { useMutation } from 'react-query'
import { errorMsg, successMsg } from '@/helper/message'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogChangeStatusAttributeGroup } from './DialogChangeStatus'
import { renderStatus } from '@/helper/utils'
import moment from 'moment'
import { Box } from '@mui/material'
import { truncateText } from '@/helper/truncateText'

const defaultValues = {
  page: 0,
  size: 20,
}

export const useAttributeGroup = () => {
  const { t } = useTranslation('error/attribute-group')
  const { showDialog } = useDialog()
  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)
  const methodForm = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit, reset } = methodForm
  const { isLoading, data, refetch } = useQueryGetAttributeGroupList(queryPage)

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
          header: t('table.code'),
          fieldName: 'code',
        },
        {
          header: t('table.name'),
          fieldName: 'name',
        },
        {
          header: t('table.priority'),
          fieldName: 'priority',
        },
        {
          header: t('table.description'),
          fieldName: 'description',
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

  const content = (data?.data?.content ?? []).map((item: any) => {
    return {
      code: item.code,
      name: item.name,
      priority: item.priority,
      description: truncateText(item?.description),
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
              pathname: '/error-management/attribute-group/[id]',
              query: {
                id: item.id,
              },
            })
          }}
          onDeleteAction={() =>
            showDialog(
              <DialogDeleteAttributeGroup id={item.id} refetch={refetch} />
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
              <DialogChangeStatusAttributeGroup
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
