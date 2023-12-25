import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import { deleteFeature } from '@/service/uaa/assignFeatureManagement/delete'
import {
  DeleteInput,
  DeleteInputSchema,
} from '@/service/uaa/assignFeatureManagement/delete/schema'

import { errorMsg, successMsg } from '@/utils/message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import { useTranslation } from 'next-i18next'
import { RESPONSE_CODE } from '@/config/responseCode'

export const useDialogDeleteConfirm = (id: number, refetch: any) => {
  const { t } = useTranslation('assignApiFeature/delete')
  const { hideDialog } = useDialog()
  const { handleSubmit, register, formState } = useFormCustom<DeleteInput>({
    defaultValues: {
      id,
    },
    resolver: zodResolver(DeleteInputSchema),
  })

  const { mutate, isLoading } = useMutation(deleteFeature, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        hideDialog()
        refetch()
      } else {
        errorMsg(data.description)
        hideDialog()
        refetch()
      }
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
