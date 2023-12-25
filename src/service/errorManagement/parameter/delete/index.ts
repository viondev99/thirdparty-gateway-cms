import { authErrorAPI } from '@/config/axiosConfig'
import { RequestParams } from './type'

export const deleteParam = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'delete',
    url: `/api/v1/parameters/${params.id}`,
  })
  return data
}
