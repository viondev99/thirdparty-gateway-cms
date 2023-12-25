import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postErrorCodePartner = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: '/api/v1/partner-error-codes',
    data: requestBody,
  })
}

export const updateErrorCodePartner = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  const { id } = requestBody
  return await authErrorAPI({
    method: 'put',
    url: `/api/v1/partner-error-codes/${id}`,
    data: requestBody,
  })
}
