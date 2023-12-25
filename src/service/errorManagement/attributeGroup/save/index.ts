import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postAttributeGroup = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: `/api/v1/group-attributes`,
    data: requestBody,
  })
}

export const putAttributeGroup = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'put',
    url: `/api/v1/group-attributes/${requestBody.id}`,
    data: requestBody,
  })
}
