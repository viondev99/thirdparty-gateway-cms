import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams } from './type'

export const getPartnerMappingById = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/party-error-mapping/${params?.id}`,
  })
  return data
}

export const useQueryGetPartnerMappingById = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/party-error-mapping/${params?.id}`, params],
    () => getPartnerMappingById(params),
    {
      ...defaultOption,
      ...options,
      enabled: !!params?.id,
    }
  )
}
