import { authErrorAPI } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { defaultOption } from '@/config/reactQueryConfig'

export const getServiceList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/services',
    params,
  })
  return data
}

export const useQueryGetServiceList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/services', params],
    () => getServiceList(params),
    { ...defaultOption, ...options }
  )
}

export const getServiceListFromUaa = async (
  params: RequestBody['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/services/uaa',
  })
  return data
}

export const useQueryGetServiceListFromUaa = (
  params: RequestBody['GET'],

  options?: any
) => {
  return useQuery<any>(
    ['/api/v1/services/uaa', params],
    () => getServiceListFromUaa(params),
    {
      ...options,
    }
  )
}
