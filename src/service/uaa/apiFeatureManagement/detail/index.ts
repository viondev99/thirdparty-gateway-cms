import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'
import { RESPONSE_CODE } from '@/config/responseCode'

export const getDetailAPIFeatureManagement = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'get',
    url: API_URL.API_FEATURE.GET_DETAIL_API_FEATURE_MANAGEMENT + `/${params.id}`,
  })
  return (data?.responseCode === RESPONSE_CODE.SUCCESS) ? data?.data : null
}

export const useQueryGetDetailAPIFeatureManagement = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.API_FEATURE.GET_DETAIL_API_FEATURE_MANAGEMENT + `/${params.id}`],
    () => getDetailAPIFeatureManagement(params),
    {...options }
  )
}
