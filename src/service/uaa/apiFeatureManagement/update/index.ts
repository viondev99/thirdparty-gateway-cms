import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const updateApiFeature = async (
  body: RequestBody['PUT']
): Promise<Response['PUT']> => {
  const { data } = await thirdPartyGWApi({
    method: 'PUT',
    url: API_URL.API_FEATURE.UPDATE,
    data: body
  })

  return data
}

export const useQueryUpdateFeature = (
  body: RequestBody['PUT'],
  options?: any
) => {
  return useQuery<Response['PUT']>(
    [API_URL.API_FEATURE.UPDATE],
    () => updateApiFeature(body),
    {  ...options }
  )
}
