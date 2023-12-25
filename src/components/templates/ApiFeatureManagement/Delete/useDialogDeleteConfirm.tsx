import { useDialog } from '@/components/hooks/dialog/useDialog'
import { RESPONSE_CODE } from '@/config/responseCode'
import { useFormCustom } from '@/lib/form'
import { deleteApiFeature } from '@/service/uaa/apiFeatureManagement/delete'
import {
  DeleteInput,
  DeleteInputSchema,
} from '@/service/uaa/apiFeatureManagement/delete/schema'

import { errorMsg, successMsg } from '@/utils/message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

export const useDialogDeleteConfirm = (id: number, refetch: any) => {
  const { t } = useTranslation('apiFeature/delete')
  const { hideDialog } = useDialog()
  const { handleSubmit, register, formState } = useFormCustom<DeleteInput>({
    defaultValues: {
      id,
    },
    resolver: zodResolver(DeleteInputSchema),
  })

  const { mutate, isLoading } = useMutation(deleteApiFeature, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        hideDialog()
        refetch()
      } else {
        errorMsg(data.description)
        hideDialog()
        refetch()
      }
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const onSubmit = handleSubmit(async (input) => {
    mutate(input)
  })

  return [
    { register, errors: formState.errors, isLoading },
    { onSubmit },
  ] as const
}
