import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getThirdPartyAPIList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.THIRDPARTY.GET_LIST_THIRD_PARTY_API,
    params: params
  })

  return data ? mock : data
}

const mock = [
  {id: 1, name: 'API_1'}
]

export const useQueryGetThirdPartyAPIList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.THIRDPARTY.GET_LIST_THIRD_PARTY_API],
    () => getThirdPartyAPIList(params),
    {...options }
  )
}
