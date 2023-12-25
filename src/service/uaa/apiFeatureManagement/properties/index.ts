import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getPropertiesList = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.API_FEATURE.PROPERTIES + `/${params.id}/properties`,
    params,
  })

  return data ? data.data : data
}

export const useQueryGetPropertiesList = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.API_FEATURE.PROPERTIES + `/${params.id}/properties`],
    () => getPropertiesList(params),
    { ...options }
  )
}
