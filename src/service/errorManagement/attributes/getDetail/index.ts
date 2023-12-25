import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams, Response } from './type'

export const getAttributeDetail = async (
  params: RequestParams['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/attributes/${params.id}`,
  })
  return data
}

export const useQueryGetAttributeDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/attributes/${params.id}`, params],
    () => getAttributeDetail(params),
    {
      ...defaultOption,
      ...options,
    }
  )
}
