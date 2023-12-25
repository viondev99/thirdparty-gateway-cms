import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'
import { RESPONSE_CODE } from '@/config/responseCode'

export const getDecodeDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'get',
    url: API_URL.DECODE.DETAIL + `/${params.id}`,
  })
  return (data?.responseCode === RESPONSE_CODE.SUCCESS) ? data.data : null
}

export const useQueryDecodeDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.DECODE.DETAIL + `/${params.id}`],
    () => getDecodeDetail(params),
    { ...options }
  )
}
