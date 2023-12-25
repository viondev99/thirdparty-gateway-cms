import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getListMethod = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.GET_LIST_METHOD,
    params,
  })

  return data ? dataMock : dataMock
}

const dataMock = [
  {
    id: 'get',
    name: 'GET',
  },
  {
    id: 'post',
    name: 'POST',
  },
  {
    id: 'put',
    name: 'PUT',
  },
  {
    id: 'patch',
    name: 'PATCH',
  },
  {
    id: 'delete',
    name: 'DELETE',
  },
]

export const useQueryGetListMethod = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.GET_LIST_METHOD, params],
    () => getListMethod(params),
    { ...options }
  )
}
