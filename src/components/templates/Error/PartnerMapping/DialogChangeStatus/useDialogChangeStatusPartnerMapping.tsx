import { useDialog } from '@/components/hooks/dialog/useDialog'
import { errorMsg, successMsg } from '@/helper/message'
import { changeStatusParameter } from '@/service/errorManagement/parameter/list'
import { changeStatusPartnerMapping } from '@/service/errorManagement/partnerMapping/list'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'

export const useDialogChangeStatusPartnerMapping = (
  id: number,
  refetch: any
) => {
  const { hideDialog } = useDialog()
  const { handleSubmit } = useForm({
    defaultValues: {
      partyId: id,
      status: 'PUBLISHED',
    },
  })

  const { mutate, isLoading } = useMutation(changeStatusPartnerMapping, {
    onSuccess: (res) => {
      console.log('_______ res _______', res)
      if (res?.httpCode !== 200) {
        errorMsg(res?.description)
      } else {
        successMsg('Success')
        refetch()
      }
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
