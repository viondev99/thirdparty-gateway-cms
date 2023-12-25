import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { deleteErrorCodePartner } from '@/service/errorManagement/errorCodePartners/delete'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

export const useDialogDeleteErrorCodePartner = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
    },
  })

  const deleteErrorCodePartnerApi = useMutation(deleteErrorCodePartner, {
    onSuccess: (data) => {
      successMsg('Success')
      hideDialog()
      refetch()
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const onSubmit = handleSubmit(async (input?: any) => {
    deleteErrorCodePartnerApi.mutate(input)
  })

  return [
    { isLoading: deleteErrorCodePartnerApi.isLoading },
    { onSubmit },
  ] as const
}
