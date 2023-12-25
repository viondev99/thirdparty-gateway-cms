import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const updateThirdPartyApi = async (
  body: RequestBody['PUT']
): Promise<Response['PUT']> => {
  const { data } = await thirdPartyGWApi({
    method: 'PUT',
    url: API_URL.THIRDPARTY.EDIT_THIRD_PARTY_MANAGEMENT,
    data: body
  })

  return data
}

export const useQueryUpdateThirdPartyApi = (
  body: RequestBody['PUT'],
  options?: any
) => {
  return useQuery<Response['PUT']>(
    [API_URL.THIRDPARTY.EDIT_THIRD_PARTY_MANAGEMENT],
    () => updateThirdPartyApi(body),
    {...options }
  )
}
