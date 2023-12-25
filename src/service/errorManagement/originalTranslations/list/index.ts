import { authErrorAPI } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { defaultOption } from '@/config/reactQueryConfig'

export const getOriginalTranslationList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/original-translation',
    params,
  })
  return data
}

export const useQueryGetOriginalTranslationList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    ['/api/v1/original-translation', params],
    () => getOriginalTranslationList(params),
    { ...defaultOption, ...options }
  )
}

// export const changeStatusErrorCode = async (
//   requestData: RequestBody['PUT']
// ): Promise<any> => {
//   const { data } = await authErrorAPI({
//     method: 'put',
//     url: `/api/v1/error-codes/status/${requestData?.id}`,
//     data: requestData,
//   })
//   return data
// }
