import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getListProtocol = async (
  params: RequestBody['GET']
): Promise<Response['GET']> => {
  const { data } = await thirdPartyGWApi({
    method: 'GET',
    url: API_URL.GET_LIST_PROTOCOL,
    params,
  })

  return data ? dataMock : dataMock
}

const dataMock = [
  {
    id: 'protocol1',
    name: 'Protocol 1',
  },
  {
    id: 'protocol2',
    name: 'Protocol 2',
  },
  {
    id: 'protocol3',
    name: 'Protocol 3',
  },
  {
    id: 'protocol4',
    name: 'Protocol 4',
  },
  {
    id: 'protocol5',
    name: 'Protocol 5',
  },
]

export const useQueryGetListProtocol = (
  params: RequestBody['GET'],
  options?: any
) => {
  return useQuery<Response['GET']>(
    [API_URL.GET_LIST_PROTOCOL, params],
    () => getListProtocol(params),
    { ...options }
  )
}
