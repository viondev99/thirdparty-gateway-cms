import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getApiFeatureList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.GET_LIST_API_FEATURE,
  })

  return data ? data.data : data
}

export const useQueryGetApiFeatureList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.GET_LIST_API_FEATURE],
    () => getApiFeatureList(params),
    {...options }
  )
}
