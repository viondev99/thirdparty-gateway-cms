import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getTypeThirdPartyList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.THIRDPARTY.GET_LIST_TYPE_THIRD_PARTY,
  })

  return data ? data.data : data
}

export const useQueryGetTypeThirdPartyList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.THIRDPARTY.GET_LIST_TYPE_THIRD_PARTY],
    () => getTypeThirdPartyList(params),
    {...options }
  )
}
