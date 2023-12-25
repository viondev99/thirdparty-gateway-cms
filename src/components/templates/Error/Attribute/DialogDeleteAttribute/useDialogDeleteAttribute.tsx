import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { deleteAttribute } from '@/service/errorManagement/attributes/delete'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

export const useDialogDeleteAttribute = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
    },
  })

  const { mutate, isLoading } = useMutation(deleteAttribute, {
    onSuccess: (data) => {
      successMsg('Success')
      refetch()
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const onSubmit = handleSubmit(async (input?: any) => {
    mutate(input)
    hideDialog()
  })

  return [{ isLoading }, { onSubmit }] as const
}
