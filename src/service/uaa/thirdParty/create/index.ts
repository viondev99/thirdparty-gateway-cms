import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const createThirdPartyApi = async (
  body: RequestBody['POST']
): Promise<Response['POST']> => {
  const { data } = await thirdPartyGWApi({
    method: 'POST',
    url: API_URL.THIRDPARTY.CREATE_THIRD_PARTY_MANAGEMENT,
    data: body
  })

  return data
}

export const useQueryCreateThirdPartyApi = (
  body: RequestBody['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    [API_URL.THIRDPARTY.CREATE_THIRD_PARTY_MANAGEMENT],
    () => createThirdPartyApi(body),
    {...options }
  )
}
