import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const createApiFeature = async (
  body: RequestBody['POST']
): Promise<Response['POST']> => {
  const { data } = await thirdPartyGWApi({
    method: 'POST',
    url: API_URL.API_FEATURE.CREATE,
    data: body
  })

  return data
}

export const useQueryCreateFeature = (
  body: RequestBody['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    [API_URL.API_FEATURE.CREATE],
    () => createApiFeature(body),
    {...options }
  )
}
