import { thirdPartyGWApi, thirdPartyMDMApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { PartnerServiceRequest  as Request, PartnerServiceResponse as Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getPartnerService = async (
  params: Request
): Promise<Response> => {
  const { data } = await thirdPartyMDMApi({
    method: 'GET',
    url: API_URL.GET_PARTNER_SERVICE,
    params,
  })

  return data ? data?.data : []
}

export const useQueryGetPartnerService = (
  params: Request,
  options?: any
) => {
  return useQuery<Response>(
    [API_URL.GET_PARTNER_SERVICE, params],
    () => getPartnerService(params),
    { ...options }
  )
}
