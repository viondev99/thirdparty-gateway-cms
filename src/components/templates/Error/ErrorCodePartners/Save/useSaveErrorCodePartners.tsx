import { errorFormField, errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetErrorCodePartnerById } from '@/service/errorManagement/errorCodePartners/getDetail'
import {
  postErrorCodePartner,
  updateErrorCodePartner,
} from '@/service/errorManagement/errorCodePartners/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/errorCodePartners/save/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  name: '',
  partnerId: null,
  description: '',
  solution: '',
  systemId: null,
}

export const useSaveErrorCodePartners = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    resolver: zodResolver(SaveInputSchema),
  })

  const { control, formState, handleSubmit, reset, watch, setError } =
    methodForm

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? updateErrorCodePartner : postErrorCodePartner,
    {
      onSuccess: (res) => {
        // if (res?.data?.fieldErrors && res?.data?.fieldErrors.length > 0) {
        //   errorFormField(
        //     setError,
        //     res?.data?.fieldErrors,
        //     res?.data?.description ?? 'System Error'
        //   )
        // } else {
        //   successMsg('Success')
        //   router.back()
        // }
        if (res?.data?.httpCode !== 200) {
          errorMsg(res?.data?.description)
        } else {
          successMsg('Success')
          router.back()
        }
      },
      onError: (error: any) => {
        errorMsg(error)
      },
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  const { data: errorCodePartner, isLoading: isLoadingErrorCodePartner } =
    useQueryGetErrorCodePartnerById({ id }, { enabled: isUpdate })

  useEffect(() => {
    id && errorCodePartner?.data && reset(errorCodePartner?.data)
    console.log(errorCodePartner)
  }, [errorCodePartner, reset, id])

  return [
    {
      control,
      formState,
      isUpdate,
      isLoadingSubmit,
      isLoadingErrorCodePartner,
      watch,
    },
    { onCancel, onSubmit },
  ] as const
}
