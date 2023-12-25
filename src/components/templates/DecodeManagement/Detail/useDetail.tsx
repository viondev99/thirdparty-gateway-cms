import { useRouter } from 'next/router'
import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { GetInput, GetInputSchema } from '@/service/uaa/decodeManagement/detail/schema'
import { useQueryDecodeDetail } from '@/service/uaa/decodeManagement/detail'
import { useQueryGetPartnerList } from '@/service/uaa/partner/list'
import { useQueryGetPartnerTypeList } from '@/service/uaa/partnerType/list'
import { ACTION_PARTNER_INFO } from '@/constants/decodeManagement'

export const useDetail = () => {
  const router = useRouter()
  const decodeId = Number(router?.query?.id)
  const defaultValues = {
    id: decodeId
  }
  const {
    control,
  } = useFormCustom<GetInput>({
    defaultValues,
    resolver: zodResolver(GetInputSchema),
  })

  const getDecodeDetail = useQueryDecodeDetail({ id: decodeId})
  const decodeDetail = getDecodeDetail?.data ?? null

  const listPartnersType = useQueryGetPartnerTypeList({})
  const getPartnerType = listPartnersType?.data?.find(
    (it: any) => it.id === decodeDetail?.thirdPartyTypeId
  )
  const partnerTypeName = getPartnerType ?
    `${getPartnerType.roleTypeCode} - ${getPartnerType.roleTypeName}`
    : ''

  const listPartners = useQueryGetPartnerList({
    action: ACTION_PARTNER_INFO.SEARCH,
    thirdPartyId: decodeDetail?.thirdPartyId
  })
  const getPartner = listPartners?.data?.partner?.find((it: any) => it.partnerId === decodeDetail?.thirdPartyId)
  const partnerName = getPartner ? `${getPartner?.partnerCode} - ${getPartner?.partnerName}` : ''

  return [
    {
      decodeDetail,
      control,
      partnerName,
      listPartnersType,
      partnerTypeName,
    },
  ] as const
}
