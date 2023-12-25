import { authErrorAPI } from '@/config/axiosConfig'
import { RequestBody } from './type'

export const saveOriginalTranslation = async (
  requestBody: RequestBody['SAVE']
): Promise<any> => {
  return await authErrorAPI({
    method: 'post',
    url: '/api/v1/original-translation',
    data: requestBody,
  })
}
