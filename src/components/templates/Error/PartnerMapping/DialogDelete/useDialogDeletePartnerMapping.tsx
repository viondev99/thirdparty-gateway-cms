import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { deletePartnerMapping } from '@/service/errorManagement/partnerMapping/delete'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

export const useDialogDeletePartnerMapping = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
    },
  })

  const deletePartnerMappingApi = useMutation(deletePartnerMapping, {
    onSuccess: (data) => {
      successMsg('Success')
      refetch()
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const onSubmit = handleSubmit(async (input?: any) => {
    deletePartnerMappingApi.mutate(input)
    hideDialog()
  })

  return [{ isLoading: deletePartnerMappingApi.isLoading }, { onSubmit }] as const
}
