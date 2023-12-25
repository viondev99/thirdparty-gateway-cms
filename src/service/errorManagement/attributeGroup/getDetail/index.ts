import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams } from './type'

export const getAttributeGroupDetail = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/group-attributes/${params.id}`,
  })
  return data
}

export const useQueryGetAttributeGroupDetail = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/group-attributes/${params.id}`, params],
    () => getAttributeGroupDetail(params),
    {
      ...defaultOption,
      ...options,
      enabled: !!params.id,
    }
  )
}
