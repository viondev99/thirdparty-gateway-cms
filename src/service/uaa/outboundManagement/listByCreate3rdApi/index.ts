import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getOutboundListForAdd3rdApi = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const paramRequest = {...params}
  if (!paramRequest.thirdPartyTypeId) {
    delete paramRequest.thirdPartyTypeId
  }
  if (!paramRequest.thirdPartyId) {
    delete paramRequest.thirdPartyId
  }
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.OUTBOUND.SEARCH_FOR_ADD_3RD_API,
    params: paramRequest
  })

  return data ? data.data : data
}

export const useQueryGetOutboundListForAdd3rdApi = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.OUTBOUND.SEARCH_FOR_ADD_3RD_API, params],
    () => getOutboundListForAdd3rdApi(params),
    {...options }
  )
}

