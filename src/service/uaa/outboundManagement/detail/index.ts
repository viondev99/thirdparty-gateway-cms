import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getOutboundDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'get',
    url: API_URL.OUTBOUND.DETAIL_OUTBOUND_THIRD_PARTY_CONFIG + `/${params.id}`,
  })
  return data ? data?.data : {}
}

export const useQueryGetOutboundDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL?.OUTBOUND.DETAIL_OUTBOUND_THIRD_PARTY_CONFIG + `/${params.id}`],
    () => getOutboundDetail(params),
    { ...options }
  )
}
