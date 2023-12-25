import { authErrorAPI } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { defaultOption } from '@/config/reactQueryConfig'

export const getTranslationList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/translations',
    params,
  })
  return data
}

export const useQueryGetTranslationList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/translations', params],
    () => getTranslationList(params),
    { ...defaultOption, ...options }
  )
}

export const changeStatusTranslation = async (
  requestData: RequestBody['POST']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'post',
    url: `/api/v1/translations/published/${requestData?.id}`,
    data: requestData,
  })
  return data ? data.data : data
}
