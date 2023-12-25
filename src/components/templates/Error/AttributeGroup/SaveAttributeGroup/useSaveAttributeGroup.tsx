import { errorFormField, errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetAttributeGroupDetail } from '@/service/errorManagement/attributeGroup/getDetail'
import {
  postAttributeGroup,
  putAttributeGroup,
} from '@/service/errorManagement/attributeGroup/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/attributeGroup/save/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useMutation } from 'react-query'

const defaultValues = {
  id: null,
  code: '',
  name: '',
  description: '',
}

export const useSaveAttributeGroup = () => {
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

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAttributeGroup : postAttributeGroup,
    {
      onSuccess: (res) => {
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
    }
  )

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  })

  const { data, isLoading } = useQueryGetAttributeGroupDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data) {
      reset(data.data)
    }
  }, [id, data, reset])

  return [
    { control, formState, isUpdate, isLoading, isLoadingSubmit },
    { onSubmit, onCancel },
  ] as const
}
