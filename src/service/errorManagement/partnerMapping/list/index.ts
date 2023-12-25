import { authErrorAPI } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { defaultOption } from '@/config/reactQueryConfig'

export const getPartnerMappingList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/party-error-mapping/list',
    params,
  })
  return data
}

export const useQueryGetPartnerMappingList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/party-error-mapping', params],
    () => getPartnerMappingList(params),
    { ...defaultOption, ...options }
  )
}

export const changeStatusPartnerMapping = async (
  params: RequestBody['POST']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'post',
    url: `/api/v1/parameters/published`,
    data: { status: params.status },
    params: { partyId: params.partyId },
  })
  return data
}
