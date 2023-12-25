import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { Response, RequestBody } from './type'
import { API_URL } from '@/config/apiUrl'

export const getFormatList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.GET_FORMAT_LIST,
    params,
  })

  return data ? data?.data : []
}

export const useQueryGetFormatList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<any>(
    [API_URL.GET_FORMAT_LIST, params],
    () => getFormatList(params),
    { ...options }
  )
}
