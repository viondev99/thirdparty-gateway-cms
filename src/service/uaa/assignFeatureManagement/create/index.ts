import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const createFeature = async (
  body: RequestBody['POST']
): Promise<Response['POST']> => {
  const { data } = await thirdPartyGWApi({
    method: 'POST',
    url: API_URL.CREATE_FEATURE,
    data: body
  })

  return data
}

export const useQueryCreateFeature = (
  body: RequestBody['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    [API_URL.CREATE_FEATURE],
    () => createFeature(body),
    { ...options }
  )
}
