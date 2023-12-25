import { errorFormField, errorMsg, successMsg } from '@/helper/message'
import { useFormCustom } from '@/lib/form'
import { useQueryGetAttributeGroupList } from '@/service/errorManagement/attributeGroup/list'
import { useQueryGetAttributeDetail } from '@/service/errorManagement/attributes/getDetail'
import {
  postAttribute,
  putAttribute,
} from '@/service/errorManagement/attributes/save'
import {
  SaveInput,
  SaveInputSchema,
} from '@/service/errorManagement/attributes/save/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useFieldArray } from 'react-hook-form'
import { useMutation } from 'react-query'

const defaultValues = {
  code: '',
  name: '',
  type: null,
  attributeType: null,
  isDisplay: false,
  attributeValue: {
    keyAtb: '',
    value: '',
  },
  attributeValues: [
    {
      keyAtb: '',
      value: '',
    },
  ],
  deleteAttributeValueIds: [],
}

export const useSaveAttribute = () => {
  const router = useRouter()
  const id = Number(router.query?.id)
  const isUpdate = !!id

  const methodForm = useFormCustom<SaveInput>({
    defaultValues,
    // resolver: zodResolver(SaveInputSchema),
  })

  const {
    control,
    formState,
    handleSubmit,
    reset,
    setError,
    watch,
    register,
    setValue,
  } = methodForm

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'attributeValues',
    keyName: 'key',
  })

  const onCancel = () => {
    router.back()
  }

  const { mutate, isLoading: isLoadingSubmit } = useMutation(
    isUpdate ? putAttribute : postAttribute,
    {
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
    }
  )

  const onSubmit = handleSubmit(
    async (data) => {
      if (data.isDisplay && data.type === 'TEXT') {
        data.attributeValue.keyAtb = data.attributeValue.value
      }
      mutate(data)
    },
    (err) => console.log('_______ err _______', err)
  )

  const { data: attributeGroupList } = useQueryGetAttributeGroupList({
    page: 0,
    size: 1000,
    status: 'PUBLISHED',
  })

  const { data, isLoading } = useQueryGetAttributeDetail(
    { id },
    { enabled: !!id }
  )

  useEffect(() => {
    console.log(data)
    if (id && data && data.data) {
      reset(data.data)
      if (!data.data.attributeValues) {
        setValue('attributeValues', [
          {
            keyAtb: '',
            value: '',
          },
        ])
      }
      if (!data.data.attributeValue) {
        setValue('attributeValue', {
          keyAtb: '',
          value: '',
        })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, data, reset])

  return [
    {
      control,
      formState,
      watch,
      register,
      fields,
      append,
      setValue,
      remove,
      attributeGroupSelect: (attributeGroupList?.data?.content ?? []).map(
        (i) => ({
          label: i.name,
          value: i.id,
        })
      ),
      isUpdate,
      isLoading,
      isLoadingSubmit,
    },
    { onSubmit, onCancel },
  ] as const
}
