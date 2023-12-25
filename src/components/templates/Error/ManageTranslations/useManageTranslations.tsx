import { useDialog } from '@/components/hooks/dialog/useDialog'
import { Action } from '@/components/molecules/Action'
import { ColumnProps } from '@/components/organism/TableCustom'
import { renderStatus } from '@/helper/utils'
import { useFormCustom } from '@/lib/form'
import { useQueryGetTranslationList } from '@/service/errorManagement/translations/list'
import {
  GetInput,
  GetInputSchema,
} from '@/service/errorManagement/translations/list/schema'
import { RequestBody } from '@/service/errorManagement/translations/list/type'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { DialogDeleteTranslation } from './DialogDelete'
import { ButtonCustom } from '@/components/atoms/ButtonCustom'
import { DialogChangeStatusTranslation } from './DialogChangeStatus'

const defaultValues = {
  search: '',
  page: 0,
  size: 20,
}

export const useManageTranslations = () => {
  const { t } = useTranslation('error/manage-translation')
  const { showDialog } = useDialog()

  const router = useRouter()
  const [queryPage, setQueryPage] = useState<RequestBody['GET']>(defaultValues)
  const methodForm = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const { control, handleSubmit } = methodForm

  const { isLoading, data, refetch } = useQueryGetTranslationList(queryPage)

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
          header: t('language'),
          fieldName: 'language',
        },
        {
          header: t('system'),
          fieldName: 'system',
        },
        {
          header: t('service'),
          fieldName: 'service',
        },
        {
          header: t('translated'),
          fieldName: 'numberTranslated',
        },
        {
          header: t('untranslated'),
          fieldName: 'numberUntranslated',
        },
        {
          header: t('common:status'),
          fieldName: 'status',
        },
        {
          header: 'Action',
          fieldName: 'action',
        },
        {
          header: '',
          fieldName: 'changeStatus',
        },
      ] as ColumnProps[],
    [t]
  )

  const rowTranslations = data
    ? (data?.data?.content ?? []).map((item: any) => {
      return {
        language: item?.language,
        system: item?.system,
        service: item?.service,
        translated: item?.translated,
        untranslated: item?.untranslated,
        status: renderStatus(item?.status),
        action: (
          <Action
            actionList={['delete', 'edit']}
            onEditAction={() =>
              router.push(`/error-management/translations/${item?.id}`)
            }
            onDeleteAction={() =>
              showDialog(
                <DialogDeleteTranslation id={item?.id} refetch={refetch} />
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
                <DialogChangeStatusTranslation
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
    { control, rowTranslations, columns, data: data?.data, isLoading, t },
    { onSubmit, onChangePageSize },
  ] as const
}
