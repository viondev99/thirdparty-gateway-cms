import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { deleteErrorCode } from '@/service/errorManagement/errorCode/delete'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

export const useDialogDeleteErrorCode = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
    },
  })

  const deleteErrorCodeApi = useMutation(deleteErrorCode, {
    onSuccess: (data) => {
      successMsg('Success')
      refetch()
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const onSubmit = handleSubmit(async (input?: any) => {
    deleteErrorCodeApi.mutate(input)
    hideDialog()
  })

  return [{ isLoading: deleteErrorCodeApi.isLoading }, { onSubmit }] as const
}
