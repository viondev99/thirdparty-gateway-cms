import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const publishApiFeature = async (
  body: RequestBody['PUT']
): Promise<Response['PUT']> => {
  const { data } = await thirdPartyGWApi({
    method: 'PUT',
    url: API_URL.UPDATE_FEATURE,
    data: body
  })

  return data
}

export const useQueryPublishApiFeature = (
  body: RequestBody['PUT'],
  options?: any
) => {
  return useQuery<Response['PUT']>(
    [API_URL.UPDATE_FEATURE],
    () => publishApiFeature(body),
    { ...options }
  )
}
