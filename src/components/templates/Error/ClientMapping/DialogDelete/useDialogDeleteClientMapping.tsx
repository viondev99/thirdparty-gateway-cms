import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { deleteClientMapping } from '@/service/errorManagement/clientMapping/delete'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

export const useDialogDeleteClientMapping = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      id,
    },
  })

  const deleteClientMappingApi = useMutation(deleteClientMapping, {
    onSuccess: (data) => {
      successMsg('Success')
      refetch()
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const onSubmit = handleSubmit(async (input?: any) => {
    deleteClientMappingApi.mutate(input)
    hideDialog()
  })

  return [{ isLoading: deleteClientMappingApi.isLoading }, { onSubmit }] as const
}
