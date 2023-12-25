import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const editOutboundThirdPartyConfig = async (
  body: RequestBody['PUT']
): Promise<Response['PUT']> => {
  const { data } = await thirdPartyGWApi({
    method: 'PUT',
    url: API_URL.OUTBOUND.EDIT_OUTBOUND_THIRD_PARTY_CONFIG,
    data: body
  })

  return data
}

export const useQueryUpdateOutbound = (
  body: RequestBody['PUT'],
  options?: any
) => {
  return useQuery<Response['PUT']>(
    [API_URL.OUTBOUND?.EDIT_OUTBOUND_THIRD_PARTY_CONFIG],
    () => editOutboundThirdPartyConfig(body),
    { ...options }
  )
}
