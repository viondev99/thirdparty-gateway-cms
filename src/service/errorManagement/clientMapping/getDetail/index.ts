import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams } from './type'

export const getClientMappingById = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/client-error-mapping`,
    params,
  })
  return data
}

export const useQueryGetClientMappingById = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/client-error-mapping`, params],
    () => getClientMappingById(params),
    {
      ...defaultOption,
      ...options,
      enabled: !!params?.clientId,
    }
  )
}
