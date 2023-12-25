import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getOutboundList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const paramRequest = {...params}
  if (!paramRequest.thirdPartyTypeId) {
    delete paramRequest.thirdPartyTypeId
  }
  if (!paramRequest.thirdPartyId) {
    delete paramRequest.thirdPartyId
  }
  if (paramRequest.status == 2) {
    delete paramRequest.status
  }
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.OUTBOUND.SEARCH,
    params: paramRequest
  })

  return data ? data.data : data
}

export const useQueryGetOutboundList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.OUTBOUND.SEARCH, params],
    () => getOutboundList(params),
    {...options }
  )
}

