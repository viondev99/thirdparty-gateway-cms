import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getParameterList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/parameters/list',
    params,
  })

  return data
}

export const useQueryGetParameterList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/parameters/list', params],
    () => getParameterList(params),
    { ...defaultOption, ...options }
  )
}

export const changeStatusParameter = async (
  requestData: RequestBody['POST']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'post',
    url: `/api/v1/parameters/published/${requestData?.id}`,
    data: requestData,
  })
  return data ? data.data : data
}
