import CoreAutocomplete from '@/components/atoms/CoreAutocomplete'
import CoreInput from '@/components/atoms/CoreInput'
import { PlusIcon } from '@/components/atoms/PlusIcon'
import { RemoveIcon } from '@/components/atoms/RemoveIcon'
import { errorFormField, errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetOriginalTranslationByErrorCodeId } from '@/service/errorManagement/originalTranslations/getDetail'
import { saveOriginalTranslation } from '@/service/errorManagement/originalTranslations/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/originalTranslations/save/schema'
import { useQueryGetParameterList } from '@/service/errorManagement/parameter/list'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { useMutation } from 'react-query'

const defaultValues = {
  errorCodeId: null,
  errorCodeName: '',
  languageId: null,
  languageName: '',
  groupContents: [
    {
      attributeGroupId: null,
      contents: [
        {
          message: '',
          attributeValueIds: [],
          paramIds: []

        }
      ]
    },
  ],
}

export const useSaveOriginalTranslation = () => {
  const { query } = useRouter()
  const { t } = useTranslation('error/original-translation')

  const [selectionStart, setSelectionStart] = useState<{
    nameDynamic: any
    position: number
  }>({
    nameDynamic: '',
    position: 0,
  })

  const [isSeeMoreParam, setIsSeeMoreParam] = useState(false)

  const router = useRouter()

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    resolver: zodResolver(SaveInputSchema),
  })

  const { control, formState, handleSubmit, reset, setValue, watch, setError } =
    methodForm

  console.log('============= watch', watch())

  const [errorCodeId, errorCodeName, languages] = watch([
    'errorCodeId',
    'errorCodeName',
    'languages',
  ])

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'groupContents',
  })

  const onCancel = () => {
    router.back()
  }

  const { mutate } = useMutation(saveOriginalTranslation, {
    onSuccess: (res) => {
      if (res?.data?.fieldErrors && res?.data?.fieldErrors.length > 0) {
        errorFormField(
          setError,
          res?.data?.fieldErrors,
          res?.data?.description ?? 'System Error'
        )
      } else {
        successMsg('Success')
        router.back()
      }
    },
    onError: (error: any) => {
      errorMsg(error)
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    mutate(data)
  }, err => console.log('============= err', err))

  const { data: params, isLoading: isLoadingParams } = useQueryGetParameterList(
    { page: 0, size: 1000, status: 'PUBLISHED' }
  )

  const { data: originalTranslation, isLoading: isLoadingTranslation } =
    useQueryGetOriginalTranslationByErrorCodeId(
      {
        id: Number(query?.id),
      },
      { enabled: !!Number(query?.id) }
    )

  useEffect(() => {
    if (originalTranslation?.data) {
      reset({
        ...originalTranslation?.data,
        groupContents:
          originalTranslation?.data?.groupContents?.length > 0
            ? originalTranslation?.data?.groupContents?.map((item: any) => ({
              ...item,
              contents: item?.contents?.map((i: any) => ({
                ...i,
                attributeValueIds: i?.attributeValues?.map((i1: any) => i1?.attributeValueId),
                paramIds: i?.params?.map((i1: any) => i1?.paramId)
              })),

            }))
            : [{
              groupAttributeId: null,
              contents: [
                {
                  message: '',
                  attributeValueIds: [],
                  paramIds: []

                }
              ]
            }],
        languageId: originalTranslation?.data?.languages?.languageId,
      })
    }
  }, [reset, originalTranslation, query, setValue])



  return [
    {
      control,
      formState,
      isLoadingParams,
      t,
      errorCodeId,
      errorCodeName,
      languages,
      methodForm,
      params,
      isSeeMoreParam,
      fields, append, remove, watch, setSelectionStart, selectionStart, setIsSeeMoreParam, setValue
    },
    { onSubmit, onCancel },
  ] as const
}
