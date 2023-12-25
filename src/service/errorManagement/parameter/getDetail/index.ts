import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams } from './type'

export const getParameterDetail = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/parameters/${params.id}`,
  })
  return data
}

export const useQueryGetParameterDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/parameters/${params.id}`, params],
    () => getParameterDetail(params),
    {
      ...defaultOption,
      ...options,
      enabled: !!params.id,
    }
  )
}
