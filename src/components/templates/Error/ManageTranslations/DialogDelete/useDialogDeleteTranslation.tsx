import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { deleteErrorCode } from '@/service/errorManagement/errorCode/delete'
import { deleteTranslation } from '@/service/errorManagement/translations/delete'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

export const useDialogDeleteTranslation = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
    },
  })

  const deleteTranslationApi = useMutation(deleteTranslation, {
    onSuccess: (data) => {
      successMsg('Success')
      refetch()
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const onSubmit = handleSubmit(async (input?: any) => {
    deleteTranslationApi.mutate(input)
    hideDialog()
  })

  return [{ isLoading: deleteTranslationApi.isLoading }, { onSubmit }] as const
}
