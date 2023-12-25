import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getDecodeList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const paramRequest = {...params}
  if (!paramRequest.code) {
    delete paramRequest.code
  }
  if (!paramRequest.thirdPartyId || paramRequest.thirdPartyId == 0) {
    delete paramRequest.thirdPartyId
  }
  if (!paramRequest.thirdPartyTypeId || paramRequest.thirdPartyTypeId == 0) {
    delete paramRequest.thirdPartyTypeId
  }
  if (paramRequest.status == 2) {
    delete paramRequest.status
  }

  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.DECODE.SEARCH,
    params: paramRequest
  })

  return data ? data.data : data
}

export const useQueryGetDecodeList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.DECODE.SEARCH, params],
    () => getDecodeList(params),
    {...options }
  )
}

