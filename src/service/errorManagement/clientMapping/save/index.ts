import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postClientMapping = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: `/api/v1/client-error-mapping`,
    data: requestBody,
  })
}

export const updateClientMapping = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'put',
    url: `/api/v1/client-error-mapping/${requestBody.partnerId}`,
    data: requestBody,
  })
}
