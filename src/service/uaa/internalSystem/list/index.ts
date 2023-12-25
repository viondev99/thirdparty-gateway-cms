import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getInternalSystemList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.GET_LIST_INTERNAL_SYSTEM,
  })

  return data ? data.data : data
}

export const useQueryGetInternalSystemList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.GET_LIST_INTERNAL_SYSTEM],
    () => getInternalSystemList(params),
    {...options }
  )
}
