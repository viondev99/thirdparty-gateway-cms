import { authErrorAPI } from '@/config/axiosConfig'
import { RequestParams } from './type'

export const deleteErrorCode = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'delete',
    url: `/api/v1/error-codes/${params?.id}`,
    params,
  })
  return data
}
