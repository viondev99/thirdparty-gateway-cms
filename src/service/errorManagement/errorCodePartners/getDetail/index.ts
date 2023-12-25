import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getErrorCodePartnerById = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/partner-error-codes/${params?.id}`,
    params,
  })
  return data
}

export const useQueryGetErrorCodePartnerById = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/partner-error-codes/${params?.id}`, params],
    () => getErrorCodePartnerById(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
