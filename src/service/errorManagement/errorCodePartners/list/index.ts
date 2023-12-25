import { authErrorAPI } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { defaultOption } from '@/config/reactQueryConfig'

export const getErrorCodePartnerList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/partner-error-codes',
    params,
  })
  return data
}

export const useQueryGetErrorCodePartnerList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/partner-error-codes', params],
    () => getErrorCodePartnerList(params),
    { ...defaultOption, ...options }
  )
}

export const changeStatusErrorCodePartner = async (
  requestData: RequestBody['PUT']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'put',
    url: `/api/v1/partner-error-codes/status/${requestData?.id}`,
    data: requestData,
  })
  return data
}
