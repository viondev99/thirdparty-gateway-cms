import { errorFormField, errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetPartnerMappingById } from '@/service/errorManagement/partnerMapping/getDetail'
import {
  postPartnerMapping,
  updatePartnerMapping,
} from '@/service/errorManagement/partnerMapping/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/partnerMapping/save/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const defaultValues = {
  id: null,
  partnerId: null,
  systemId: null,
  partnerErrorInternalErrorMaps: [
    {
      internalErrorId: null,
      partnerErrorIds: [],
    },
  ],
}

export const useSavePartnerMapping = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    resolver: zodResolver(SaveInputSchema),
  })

  const { control, watch, handleSubmit, reset, setValue } = methodForm

  const [partnerId, systemId] = watch(['partnerId', 'systemId'])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'partnerErrorInternalErrorMaps',
  })

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? updatePartnerMapping : postPartnerMapping,
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

  const { data, isLoading } = useQueryGetPartnerMappingById(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    if (id && data) {
      const { partyErrorCodeMappingValues = [] } = data.data
      reset({
        ...data.data,
        partnerErrorInternalErrorMaps:
          Array.isArray(partyErrorCodeMappingValues) &&
            partyErrorCodeMappingValues.length > 0
            ? data?.data?.partyErrorCodeMappingValues?.map((item: any) => ({
              ...item
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

  console.log('============= watch()', watch())

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
      partnerId,
      systemId,
    },
    { onSubmit, onCancel },
  ] as const
}
