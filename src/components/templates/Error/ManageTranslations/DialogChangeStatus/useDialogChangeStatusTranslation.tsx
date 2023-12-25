import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { changeStatusAttribute } from '@/service/errorManagement/attributes/list'
import { changeStatusTranslation } from '@/service/errorManagement/translations/list'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

export const useDialogChangeStatusTranslation = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
      status: 'PUBLISHED',
    },
  })

  const { mutate, isLoading } = useMutation(changeStatusTranslation, {
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
