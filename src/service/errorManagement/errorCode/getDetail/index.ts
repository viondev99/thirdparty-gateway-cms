import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams } from './type'

export const getErrorCodeById = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/error-codes/${params?.id}`,
  })
  return data
}

export const useQueryGetErrorCodeById = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/error-codes/${params?.id}`, params],
    () => getErrorCodeById(params),
    {
      ...defaultOption,
      ...options,
      enabled: !!params?.id,
    }
  )
}
