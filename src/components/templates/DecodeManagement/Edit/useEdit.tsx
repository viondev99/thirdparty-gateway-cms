import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import {
  PutInput,
  PutInputSchema,
} from '@/service/uaa/decodeManagement/edit/schema'
import { useMutation } from 'react-query'
import { errorMsg, successMsg } from '@/utils/message'
import { RESPONSE_CODE } from '@/config/responseCode'
import { Options } from '@/utils/customArray'
import { SWITCH } from '@/constants/switch'
import { useEffect, useMemo, useState } from 'react'
import { sortArrayByLabel } from '@/utils/localeCompareArray'
import { checkExistLocalStorage } from '@/constants/localStorage'
import { useQueryGetPartnerList } from '@/service/uaa/partner/list'
import { useQueryDecodeDetail } from '@/service/uaa/decodeManagement/detail'
import { editDecode } from '@/service/uaa/decodeManagement/edit'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { ACTION_PARTNER_INFO } from '@/constants/decodeManagement'
import { useButtonSaveDisableDecode } from '@/components/hooks/button-save-status/useButtonSaveDisableDecode'

const defaultValues = {
  id: 0,
  thirdPartyId: 0,
  code: '',
  status: true,
  description: '',
  decodeConfigDetails: [],
  decodeConfigDetailsEdit: []
}

export const useEdit = () => {
  const { t } = useTranslation('decode/edit')
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
  } = useFormCustom<PutInput>({
    defaultValues,
    resolver: zodResolver(PutInputSchema),
  })
  const [prevValue, setPreValue] = useState<any>(null)
  const {disableButtonSave} = useButtonSaveDisableDecode(control, prevValue, !!prevValue);

  const [isLoading, setIsLoading] = useState(false)
  const id = Number(router?.query?.id)

  const { data: dataDetail, isLoading: isLoadingGetDetail } =
    useQueryDecodeDetail({ id: id }, { enabled: true })

  const decodeDetail = dataDetail?.data ?? null

  useEffect(() => {
    id && dataDetail && reset(dataDetail)
    setPreValue(dataDetail);
  }, [dataDetail, id, reset])

  useEffect(() => {
    setValue('decodeConfigDetailsEdit', dataDetail?.decodeConfigDetails)
  }, [isLoadingGetDetail])

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
        roleTypeCode: typeSelected?.roleTypeCode,
      }
    }
    return { ...body, action: ACTION_PARTNER_INFO.EDIT }
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

  const getPartner = listPartners?.data?.partner?.find(
    (it: any) => it.partnerId === decodeDetail?.thirdPartyId
  )
  const partnerName = getPartner
    ? `${getPartner?.partnerCode} - ${getPartner?.partnerName}`
    : ''

  const { mutate } = useMutation(editDecode, {
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
      PutInputSchema.parse(watch())
    } catch (e: any) {
      console.log(control._defaultValues)
      console.log(JSON.parse(e.message))
    }
    handleSubmit(async (input) => {
      const body = { ...defaultValues, ...input}
      for (let i = 0; i < body.decodeConfigDetailsEdit.length; i++) {
        let item = body.decodeConfigDetails.reverse().find((c: any) => body.decodeConfigDetailsEdit[i].id && (c.id === body.decodeConfigDetailsEdit[i].id))
        if (!item) {
          body.decodeConfigDetailsEdit[i].isDeleted = true;
          body.decodeConfigDetails.push(body.decodeConfigDetailsEdit[i]);
        }
      }
      body.status = body.status ? SWITCH.ON : SWITCH.OFF
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
      decodeDetail,
      partnerName,
      partnerTypes,
      disableButtonSave
    },
    { onSubmit },
  ] as const
}
