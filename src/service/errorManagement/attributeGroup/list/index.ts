import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'

export const getAttributeGroupList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/group-attributes/list',
    params,
  })

  return data
}

export const useQueryGetAttributeGroupList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/group-attributes/list', params],
    () => getAttributeGroupList(params),
    { ...defaultOption, ...options }
  )
}

export const changeStatusAttributeGroup = async (
  requestData: RequestBody['POST']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'post',
    url: `/api/v1/group-attributes/published/${requestData?.id}`,
    data: requestData,
  })
  return data ? data.data : data
}
