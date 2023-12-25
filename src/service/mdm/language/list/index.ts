import { defaultOption } from '@/config/reactQueryConfig'
import { RequestBody, Response } from './type'
import { useQuery } from 'react-query'
import { authMdmAPI } from '@/config/axiosConfig'

export const getLanguageList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authMdmAPI({
    method: 'get',
    url: '/api/v1/attributes',
    params,
  })

  return data
}

export const useQueryGetLanguageList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/attributes', params],
    () => getLanguageList(params),
    { ...defaultOption, ...options }
  )
}
