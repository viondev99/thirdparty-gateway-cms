import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { changeStatusSystem } from '@/service/errorManagement/system/put'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

export const useDialogChangeStatusSystem = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
      status: 'PUBLISHED',
    },
  })

  const { mutate, isLoading } = useMutation(changeStatusSystem, {
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
