import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postAttribute = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: `/api/v1/attributes`,
    data: requestBody,
  })
}

export const putAttribute = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'put',
    url: `/api/v1/attributes/${requestBody.id}`,
    data: requestBody,
  })
}
