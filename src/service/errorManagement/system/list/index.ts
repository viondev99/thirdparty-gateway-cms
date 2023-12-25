import { authErrorAPI } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { defaultOption } from '@/config/reactQueryConfig'

export const getSystemList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/systems',
    params,
  })

  return data
}

export const useQueryGetSystemList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/systems', params],
    () => getSystemList(params),
    { ...defaultOption, ...options }
  )
}

export const getSystemListFromUaa = async (
  params: RequestBody['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/systems/uaa',
  })

  return data
}

export const useQueryGetSystemListFromUaa = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<any>(
    ['/api/v1/systems/uaa', params],
    () => getSystemListFromUaa(params),
    {
      ...options,
    }
  )
}
