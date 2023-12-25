import { errorFormField, errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetClientMappingById } from '@/service/errorManagement/clientMapping/getDetail'
import {
  postClientMapping,
  updateClientMapping,
} from '@/service/errorManagement/clientMapping/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/clientMapping/save/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const defaultValues = {
  partnerId: null,
  partnerErrorInternalErrorMaps: [
    {
      internalErrorId: null,
      partnerErrorIds: [],
    },
  ],
}

export const useSaveClientMapping = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    resolver: zodResolver(SaveInputSchema),
  })

  const { control, watch, handleSubmit, setError, reset, setValue } = methodForm

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'partnerErrorInternalErrorMaps',
  })

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? updateClientMapping : postClientMapping,
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

  const { data, isLoading } = useQueryGetClientMappingById(
    { clientId: id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data) {
      const { partnerErrorInternalErrorMaps = [] } = data.data
      reset({
        ...data.data,
        partnerErrorInternalErrorMaps:
          Array.isArray(partnerErrorInternalErrorMaps) &&
          partnerErrorInternalErrorMaps.length > 0
            ? data?.data?.partnerErrorInternalErrorMaps?.map((item: any) => ({
                ...item,
                internalErrorId: item?.errorCodeId,
              }))
            : [
                {
                  internalErrorId: null,
                  partnerErrorIds: [],
                },
              ],
      })
    }
  }, [id, data, reset, setValue])

  return [
    {
      control,
      fields,
      append,
      remove,
      watch,
      isLoadingSubmit,
      isUpdate,
      isLoading,
    },
    { onSubmit, onCancel },
  ] as const
}
