import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams } from './type'

export const getOriginalTranslationByErrorCodeId = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/original-translation/${params?.id}`,
  })
  return data
}

export const useQueryGetOriginalTranslationByErrorCodeId = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/original-translation/${params?.id}`, params],
    () => getOriginalTranslationByErrorCodeId(params),
    {
      ...defaultOption,
      ...options,
      enabled: !!params?.id,
    }
  )
}
