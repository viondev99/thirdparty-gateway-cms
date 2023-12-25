import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getFeatureList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const paramRequest = { ...params }
  if (paramRequest.status == 2) {
    delete paramRequest.status
  }
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.API_FEATURE.LIST,
    params: paramRequest,
  })

  return data ? data.data : data
}

export const useQueryGetFeatureList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.API_FEATURE.LIST, params],
    () => getFeatureList(params),
    { ...options }
  )
}
