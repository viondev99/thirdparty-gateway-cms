import { authErrorAPI } from '@/config/axiosConfig'
import { RequestParams } from './type'

export const deleteSystem = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'delete',
    url: `/api/v1/systems/${params?.id}`,
  })
  return data
}
