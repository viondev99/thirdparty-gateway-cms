import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import {  FormatResponse as Response, UpdateFormatRequestBody as RequestBody } from './type'
import { API_URL } from '@/config/apiUrl'

export const updateFormat = async (
    body: RequestBody
): Promise<Response> => {
    const { data } = await thirdPartyGWApi({
        method: 'PUT',
        url: API_URL.FORMAT.UPDATE,
        data: body
    })

    return data;
}

export const useQueryUpdateFormat = (
    body: RequestBody,
    options?: any
) => {
    return useQuery<Response>(
        [API_URL.FORMAT.UPDATE, body],
        () => updateFormat(body),
        { ...options }
    )
}

