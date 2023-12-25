import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  PostInput,
  PostInputSchema,
} from '@/service/uaa/decodeManagement/create/schema'
import { useMutation } from 'react-query'
import { errorMsg, successMsg } from '@/utils/message'
import { RESPONSE_CODE } from '@/config/responseCode'
import { SWITCH } from '@/constants/switch'
import { useEffect, useMemo, useState } from 'react'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { checkExistLocalStorage } from '@/constants/localStorage'
import { createDecode } from '@/service/uaa/decodeManagement/create'
import { useQueryGetPartnerList } from '@/service/uaa/partner/list'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { ACTION_PARTNER_INFO } from '@/constants/decodeManagement'
import { useWatch } from 'react-hook-form'

const defaultValues = {
  thirdPartyTypeId: 0,
  thirdPartyId: 0,
  code: '',
  description: '',
  decodeConfigDetails: [
    {
      internalValue: '',
      externalValue: '',
    }
  ],
}

export const useCreate = () => {
  const { t } = useTranslation('decode/create')
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setError,
    control,
    formState,
    trigger,
    setValue,
    getValues,
    reset,
  } = useFormCustom<PostInput>({
    defaultValues,
    resolver: zodResolver(PostInputSchema),
  })

  const [isLoading, setIsLoading] = useState(false)
  const [isLoadData, setLoadData] = useState(false)
  const [isChange, setChange] = useState(false)
  const formValue = useWatch({ control });

  useEffect(() => {
    if(!isChange && isLoadData){
      setChange(true);
    }
  }, [formValue])
  useEffect(() => {
    setLoadData(true)
  }, [])

  const listPartnerType = useQueryGetPartnerTypeList({})
  let partnerTypes = (listPartnerType?.data ?? []).map((t: any) => {
    return { value: t.id, label: t?.roleTypeCode + ' - ' + t.roleTypeName }
  })
  partnerTypes = sortArrayByLabel(partnerTypes)
  partnerTypes.unshift({ value: 0, label: 'Select' })

  const bodyListPartners = useMemo(() => {
    let body = {}
    const typeSelected: any = listPartnerType.data?.find((it: any) => 
      it.id === watch('thirdPartyTypeId')
    )
    if (watch('thirdPartyTypeId') && Number(watch('thirdPartyTypeId')) !== 0) {
      body = {
        thirdPartyTypeId: watch('thirdPartyTypeId'),
        roleTypeCode: typeSelected.roleTypeCode,
      }
    }
    return { ...body, action: ACTION_PARTNER_INFO.CREATE }
  }, [watch('thirdPartyTypeId')])

  const listPartners = useQueryGetPartnerList(bodyListPartners)
  let listPartnersInfo = (listPartners?.data?.partner ?? []).map((it: any) => {
    return {
      value: it.partnerId,
      label: `${it.partnerCode ?? ''} - ${it.partnerName ?? ''}`,
    }
  })
  listPartnersInfo = sortArrayByLabel(listPartnersInfo)
  listPartnersInfo.unshift({ value: 0, label: 'Select' })

  const { mutate } = useMutation(createDecode, {
    onSuccess: (data: any) => {
      if (data.responseCode === RESPONSE_CODE.SUCCESS) {
        successMsg(t('success'))
        setIsLoading(false)
        if (checkExistLocalStorage() && localStorage.getItem('decode_search')) {
          router.replace('/decode-management?directFrom=addNewDecode')
        } else {
          router.replace('/decode-management')
        }
      } else {
        errorMsg(data.description)
        setIsLoading(false)
      }
    },
    onError: (error: any) => {
      errorMsg(error.message)
      setIsLoading(false)
    },
  })

  const onSubmit = () => {
    try {
      PostInputSchema.parse(watch())
    } catch (e: any) {
      console.log(JSON.parse(e.message))
    }
    handleSubmit(async (input) => {
      const body = { ...defaultValues, ...input }
      setIsLoading(true)
      mutate(body)
    })()
  }

  return [
    {
      isLoading,
      register,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
      trigger,
      setValue,
      listPartnersInfo,
      partnerTypes,
      isChange
    },
    { onSubmit },
  ] as const
}
