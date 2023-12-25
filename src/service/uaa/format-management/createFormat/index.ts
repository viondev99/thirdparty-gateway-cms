import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import {  FormatResponse as Response, CreateFormatRequestBody as RequestBody } from './type'
import { API_URL } from '@/config/apiUrl'

export const createFormat = async (
    body: RequestBody
): Promise<Response> => {
    const { data } = await thirdPartyGWApi({
        method: 'POST',
        url: API_URL.FORMAT.CREATE,
        data: body
    })

    return data;
}

export const useQueryCreateFormat = (
    body: RequestBody,
    options?: any
) => {
    return useQuery<Response>(
        [API_URL.FORMAT.CREATE, body],
        () => createFormat(body),
        { ...options }
    )
}

