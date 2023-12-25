import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestBody, RequestParams, Response } from './type'

export const getAttributeList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/attributes',
    params,
  })

  return data
}

export const useQueryGetAttributeList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/attributes', params],
    () => getAttributeList(params),
    { ...defaultOption, ...options }
  )
}

export const getAllAttributeByGroupId = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/attributes/group-attribute/${params.groupId}`,
    params,
  })

  return data.data
}

export const useQueryGetAllAttributeByGroupId = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [`/api/v1/attributes/group-attribute/${params.groupId}`, params],
    () => getAllAttributeByGroupId(params),
    { ...defaultOption, ...options }
  )
}

export const changeStatusAttribute = async (
  requestData: RequestBody['POST']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'post',
    url: `/api/v1/attributes/published/${requestData?.id}`,
    data: requestData,
  })
  return data ? data.data : data
}
