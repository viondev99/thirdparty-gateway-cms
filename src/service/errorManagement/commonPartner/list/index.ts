import { authErrorAPI } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { defaultOption } from '@/config/reactQueryConfig'

export const getCommonPartnerList = async (params: any): Promise<any> => {
  const { data } = await authErrorAPI({
    method: 'get',
    url: '/api/v1/partners',
    params,
  })
  return data
}

export const useQueryGetCommonPartnerList = (params: any, options?: any) => {
  return useQuery<any>(
    ['/api/v1/partners', params],
    () => getCommonPartnerList(params),
    { ...defaultOption, ...options }
  )
}
