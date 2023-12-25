
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import {
  DeleteInput,
  DeleteInputSchema,
} from '@/service/uaa/assignFeatureManagement/delete/schema'

import { errorMsg, successMsg } from '@/utils/message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import { deleteFormat } from '@/service/uaa/format-management/updateFormat'
import { isSuccess } from '@/constants/isSuccess'
import { toast } from 'react-toastify'
import { messageError } from '@/constants/messageError'
import { useTranslation } from 'react-i18next'

export const useDialogDeleteConfirm = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit, register, formState } = useFormCustom<DeleteInput>({
    defaultValues: {
      id,
    },
    resolver: zodResolver(DeleteInputSchema),
  })
  const { t } = useTranslation('format/delete')
  const { mutate, isLoading } = useMutation(deleteFormat, {
    onSuccess: (data) => {
      if (isSuccess(data)) {
        successMsg(t('success'))
        hideDialog()
        refetch()
      }else{
        errorMsg(data.description)
      }
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const onSubmit = handleSubmit(async (input: any) => {
    mutate(input?.id)
  })

  return [
    { register, errors: formState.errors, isLoading },
    { onSubmit },
  ] as const
}
