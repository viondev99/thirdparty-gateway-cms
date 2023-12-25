import { authErrorAPI } from '@/config/axiosConfig'
import { RequestParams } from './type'

export const deleteService = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'delete',
    url: `/api/v1/services/${params?.id}`,
  })
  return data
}
