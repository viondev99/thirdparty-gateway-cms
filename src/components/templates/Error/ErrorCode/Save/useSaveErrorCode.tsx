import { errorFormField, errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetErrorCodeById } from '@/service/errorManagement/errorCode/getDetail'
import {
  postErrorCode,
  updateErrorCode,
} from '@/service/errorManagement/errorCode/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/errorCode/save/schema'
import { useQueryGetParameterList } from '@/service/errorManagement/parameter/list'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  name: '',
  description: '',
  solution: '',
  systemId: null,
}

export const useSaveErrorCode = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    resolver: zodResolver(SaveInputSchema),
  })

  const { control, formState, handleSubmit, reset, setError } = methodForm

  const onCancel = () => {
    router.back()
  }

  const saveErrorCode = useMutation(
    isUpdate ? updateErrorCode : postErrorCode,
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
    saveErrorCode.mutate(data)
  })

  const { data: errorCode, isLoading: isLoadingErrorCode } =
    useQueryGetErrorCodeById({ id })

  const { data: params, isLoading: isLoadingParams } = useQueryGetParameterList(
    { page: 0, size: 1000, status: 'PUBLISHED' }
  )

  useEffect(() => {
    errorCode && reset(errorCode.data)
  }, [errorCode, reset])

  return [
    { control, formState, isUpdate, isLoadingErrorCode },
    { onSubmit, onCancel },
  ] as const
}
