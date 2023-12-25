import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const postTranslation = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: '/api/v1/translations',
    data: requestBody,
  })
}

export const updateTranslation = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  const { id } = requestBody
  return await authErrorAPI({
    method: 'put',
    url: `/api/v1/translations/${id}`,
    data: requestBody,
  })
}
