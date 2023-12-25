import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { QueryParams, RequestBody, Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getActionLogHistoryList = async (
  params: QueryParams['POST'],
  body: RequestBody['POST']
): Promise<Response['POST']> => {
  const queryParams = { ...params }
  const paramRequest = { ...body }
  if (!paramRequest.module || paramRequest.module === 0) {
    delete paramRequest.module
  }
  if (!paramRequest.actionType || paramRequest.actionType === 0) {
    delete paramRequest.actionType
  }
  if (!paramRequest.actionUser || paramRequest.actionUser === '') {
    delete paramRequest.actionUser
  }
  if (
    !paramRequest.fromActionDate ||
    paramRequest.fromActionDate === '' ||
    paramRequest.fromActionDate === undefined
  ) {
    delete paramRequest.fromActionDate
  }
  if (
    !paramRequest.toActionDate ||
    paramRequest.toActionDate === '' ||
    paramRequest.toActionDate === undefined
  ) {
    delete paramRequest.toActionDate
  }
  if (!paramRequest.code || paramRequest.code === '') {
    delete paramRequest.code
  }

  const { data } = await thirdPartyGWApi({
    method: 'POST',
    url: API_URL.ACTION_LOG_HISTORY.SEARCH,
    params: { ...queryParams },
    data: { ...paramRequest },
  })

  return data ? data.data : data
}

export const useQueryGetActionLogHistoryList = (
  params: QueryParams['POST'],
  body: RequestBody['POST'],
  options?: any
) => {
  return useQuery<Response['POST']>(
    [API_URL.ACTION_LOG_HISTORY.SEARCH, params],
    () => getActionLogHistoryList(params, body),
    { ...options }
  )
}
