import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postServiceMapping = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: `/api/v1/service-error-mapping`,
    data: requestBody,
  })
}

export const putServiceMapping = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'put',
    url: `/api/v1/service-error-mapping/${requestBody.id}`,
    data: requestBody,
  })
}
