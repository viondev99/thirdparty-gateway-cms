import { useDialog } from '@/components/hooks/dialog/useDialog'
import { useFormCustom } from '@/lib/form'
import {
  PutInput,
  PutInputSchema,
} from '@/service/uaa/apiFeatureManagement/publish/schema'

import { errorMsg, successMsg } from '@/utils/message'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from 'react-query'
import { useTranslation } from 'react-i18next'
import { RESPONSE_CODE } from '@/config/responseCode'
import { publishDecode } from '@/service/uaa/decodeManagement/publish'

export const useDialogPublishConfirm = (id: number, refetch: any) => {
  const { t } = useTranslation('decode/list')
  const { hideDialog } = useDialog()
  const { handleSubmit, register, formState } = useFormCustom<PutInput>({
    defaultValues: {
      id,
    },
    resolver: zodResolver(PutInputSchema),
  })

  const { mutate, isLoading } = useMutation(publishDecode, {
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
