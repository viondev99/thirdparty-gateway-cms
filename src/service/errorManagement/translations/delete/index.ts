import { authErrorAPI } from '@/config/axiosConfig'
import { RequestParams } from './type'

export const deleteTranslation = async (
  params: RequestParams['DELETE']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'delete',
    url: `/api/v1/translations/${params?.id}`,
    params,
  })
  return data
}
