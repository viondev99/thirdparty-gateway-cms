import { errorFormField, errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetParameterDetail } from '@/service/errorManagement/parameter/getDetail'
import { postParameter } from '@/service/errorManagement/parameter/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/parameter/save/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  name: '',
  status: 'DRAFT',
  typeParam: 'INTERNAL',
  dataType: 'STRING',
  description: '',
  templateType: '',
  template: '',
}

export const useSaveParam = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    resolver: zodResolver(SaveInputSchema),
  })

  const { control, formState, handleSubmit, reset, setError, watch } =
    methodForm

  const [templateType, typeParam] = watch(['templateType', 'typeParam'])

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(postParameter, {
    onSuccess: (res: any) => {
      // if (res?.data?.fieldErrors && res?.data?.fieldErrors.length > 0) {
      //   errorFormField(
      //     setError,
      //     res?.data?.fieldErrors,
      //     res?.data?.description ?? 'System Error'
      //   )
      //   errorMsg(res?.data?.description)
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
  })

  const onSubmit = handleSubmit(
    async (data) => {
      mutate(data)
    },
    (err) => console.log('_______ err _______', err)
  )

  const { data, isLoading } = useQueryGetParameterDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data) {
      reset(data.data)
    }
  }, [id, data, reset])

  return [
    {
      control,
      formState,
      isLoadingSubmit,
      isLoading,
      isUpdate,
      templateType,
      typeParam,
    },
    { onSubmit, onCancel },
  ] as const
}
