import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getThirdPartyDetail = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.THIRDPARTY.DETAIL + `/${params.id}`,
  })

  return data ? data.data : data
}

export const useQueryGetThirdPartyDetail = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.THIRDPARTY.DETAIL + `/${params.id}`],
    () => getThirdPartyDetail(params),
    { ...options }
  )
}
