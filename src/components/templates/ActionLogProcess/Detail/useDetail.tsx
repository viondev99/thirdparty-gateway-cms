import { useRouter } from 'next/router'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  GetInput,
  GetInputSchema,
} from '@/service/uaa/actionLogProcess/detail/schema'
import { useQueryGetPartnerList } from '@/service/uaa/partner/list'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { ACTION_PARTNER_INFO } from '@/constants/decodeManagement'
import { useQueryActionLogProcessDetail } from '@/service/uaa/actionLogProcess/detail'
import { useMemo } from 'react'

export const useDetail = () => {
  const router = useRouter()
  const decodeId = Number(router?.query?.id)
  const defaultValues = {
    id: decodeId,
  }
  const { control } = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const getActionLogProcessDetail = useQueryActionLogProcessDetail({
    id: decodeId,
  })
  const dataDetail = getActionLogProcessDetail?.data ?? null

  const listPartnersType = useQueryGetPartnerTypeList({})
  const getPartnerType = listPartnersType?.data?.find(
    (it: any) => it.id === dataDetail?.thirdPartyTypeId
  )
  const partnerTypeName = getPartnerType
    ? `${getPartnerType?.roleTypeCode} - ${getPartnerType?.roleTypeName}`
    : ''

  const bodyListPartner = useMemo(() => {
    let body = {}
    const roleTypeCode = getPartnerType?.roleTypeCode

    if (dataDetail?.thirdPartyTypeId) {
      body = {
        ...body,
        thirdPartyTypeId: dataDetail?.thirdPartyTypeId,
        roleTypeCode: roleTypeCode,
      }
    }

    if (dataDetail?.thirdPartyId) {
      body = {
        ...body,
        thirdPartyId: dataDetail?.thirdPartyId,
      }
    }

    return { ...body, action: ACTION_PARTNER_INFO.DETAIL }
  }, [getPartnerType?.roleTypeCode, dataDetail?.thirdPartyTypeId, dataDetail?.thirdPartyId])

  const listPartners = useQueryGetPartnerList(bodyListPartner)
  const getPartner = listPartners?.data?.partner?.find(
    (it: any) => it.partnerId === dataDetail?.thirdPartyId
  )
  const partnerName = getPartner
    ? `${getPartner?.partnerCode} - ${getPartner?.partnerName}`
    : ''

  const getService = listPartners?.data?.service?.find(
    (it: any) => it.serviceId === dataDetail?.thirdPartyServiceId
  )
  const serviceName = getService
    ? `${getService?.serviceCode} - ${getService?.serviceName}`
    : ''

  return [
    {
      dataDetail,
      control,
      partnerName,
      serviceName,
      listPartnersType,
      partnerTypeName,
    },
  ] as const
}
