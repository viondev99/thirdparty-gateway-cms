import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postPartnerMapping = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: `/api/v1/party-error-mapping`,
    data: requestBody,
  })
}

export const updatePartnerMapping = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'put',
    url: `/api/v1/party-error-mapping/${requestBody?.id}`,
    data: requestBody,
  })
}
