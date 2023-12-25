import { authErrorAPI } from '@/config/axiosConfig'
import { defaultOption } from '@/config/reactQueryConfig'
import { useQuery } from 'react-query'
import { RequestParams } from './type'

export const getTranslationById = async (
  params: RequestParams['GET']
): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: `/api/v1/translations/${params?.id}`,
  })
  return data
}

export const useQueryGetTranslationById = (
  params: RequestParams['GET'],
  options?: any
) => {
  return useQuery(
    [`/api/v1/translations/${params?.id}`, params],
    () => getTranslationById(params),
    {
      ...defaultOption,
      ...options,
      enabled: !!params?.id,
    }
  )
}
