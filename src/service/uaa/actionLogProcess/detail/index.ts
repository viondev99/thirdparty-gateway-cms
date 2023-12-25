import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'
import { RESPONSE_CODE } from '@/config/responseCode'

export const getActionLogProcessDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'get',
    url: API_URL.ACTION_LOG_PROCESS.DETAIL + `/${params.id}`,
  })
  return (data?.responseCode === RESPONSE_CODE.SUCCESS) ? data.data : null
}

export const useQueryActionLogProcessDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.ACTION_LOG_PROCESS.DETAIL + `/${params.id}`],
    () => getActionLogProcessDetail(params),
    { ...options }
  )
}
