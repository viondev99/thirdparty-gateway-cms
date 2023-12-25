
import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { deleteApiFeature } from '@/service/uaa/outboundManagement/delete'
import {
  DeleteInput,
  DeleteInputSchema,
} from '@/service/uaa/assignFeatureManagement/delete/schema'

import { errorMsg, successMsg } from '@/utils/message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'

export const useDialogDeleteConfirm = (id: number, refetch: any) => {
  const { hideDialog } = useDialog()
  const { handleSubmit, register, formState } = useFormCustom<DeleteInput>({
    defaultValues: {
      id,
    },
    resolver: zodResolver(DeleteInputSchema),
  })

  const { mutate, isLoading } = useMutation(deleteApiFeature, {
    onSuccess: (data) => {
      successMsg('Success')
      hideDialog()
      refetch()
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
