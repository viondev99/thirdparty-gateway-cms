import { thirdPartyGWApi, thirdPartyMDMApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { PartnerTypeResponse, PartnerTypeRequestBody } from './type'
import { API_URL } from '@/config/apiUrl'

export const getPartnerTypeList = async (
  params: PartnerTypeRequestBody['GET']
): Promise<PartnerTypeResponse['GET']> => {
  const { data } = await thirdPartyMDMApi({
    method: 'GET',
    url: API_URL.GET_PARTNER_TYPE,
    params: {
      ...params,
      isPartner: true,
    },
  })

  return data ? data?.data : []
}

export const useQueryGetPartnerTypeList = (
  params: PartnerTypeRequestBody['GET'],
  options?: any
) => {
  return useQuery<PartnerTypeResponse['GET']>(
    [API_URL.GET_PARTNER_TYPE, params],
    () => getPartnerTypeList(params),
    { ...options }
  )
}
