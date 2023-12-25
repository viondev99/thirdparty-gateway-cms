import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'
import { RESPONSE_CODE } from '@/config/responseCode'

export const getLogHistoryDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'get',
    url: API_URL.ACTION_LOG_HISTORY.DETAIL,
    params: params
  })
  return (data?.responseCode === RESPONSE_CODE.SUCCESS) ? data.data : null
}

export const useQueryLogHistoryDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.ACTION_LOG_HISTORY.DETAIL],
    () => getLogHistoryDetail(params),
    { ...options }
  )
}
