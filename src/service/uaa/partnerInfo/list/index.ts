import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { PartnerResponse, PartnerRequestBody } from './type'
import { API_URL } from '@/config/apiUrl'

export const getPartnerList = async (
  params: PartnerRequestBody['GET']
): Promise<PartnerResponse['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.GET_PARTNER,
    params,
  })

  return data ? data?.data : []
}

export const useQueryGetPartnerList = (
  params: PartnerRequestBody['GET'],
  options?: any
) => {
  return useQuery<PartnerResponse['GET']>(
    [API_URL.GET_PARTNER, params],
    () => getPartnerList(params),
    { ...options }
  )
}
