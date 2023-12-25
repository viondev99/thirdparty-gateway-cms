import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getServiceMappingDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/service-error-mapping/${params.id}`,
  })
  return data
}

export const useQueryGetServiceMappingDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/service-error-mapping/${params.id}`, params],
    () => getServiceMappingDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
