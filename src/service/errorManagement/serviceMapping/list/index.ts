import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response, RequestParams } from './type'

export const getServiceMappingList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/service-error-mapping/list',
    params,
  })

  return data
}

export const useQueryGetServiceMappingList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/service-error-mapping/list', params],
    () => getServiceMappingList(params),
    { ...defaultOption, ...options }
  )
}

export const downloadFileError = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/files/${params?.id}/file-error`,
    responseType: 'blob',
    params,
  })
  return data
}
