import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postErrorCode = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: '/api/v1/error-codes',
    data: requestBody,
  })
}

export const updateErrorCode = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  const { id } = requestBody
  return await authErrorAPI({
    method: 'put',
    url: `/api/v1/error-codes/${id}`,
    data: requestBody,
  })
}
