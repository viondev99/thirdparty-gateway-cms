import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const createOutboundThirdPartyConfig = async (
  body: RequestBody['POST']
): Promise<Response['POST']> => {
  const { data } = await thirdPartyGWApi({
    method: 'POST',
    url: API_URL.OUTBOUND.CREATE_OUTBOUND_THIRD_PARTY_CONFIG,
    data: body
  })

  return data
}

export const useQueryCreateOutboundThirdPartyConfig = (
  body: RequestBody['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    [API_URL.OUTBOUND.CREATE_OUTBOUND_THIRD_PARTY_CONFIG],
    () => createOutboundThirdPartyConfig(body),
    { ...options }
  )
}
