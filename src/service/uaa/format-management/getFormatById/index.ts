import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import {  FormatResponse as Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const getFormatById = async (
    id: number
): Promise<Response> => {
    const { data } = await thirdPartyGWApi({
        method: 'GET',
        url: API_URL.FORMAT.DETAIL.replace(':id', String(id)),
    })

    return data;
}

export const useQuerygetFormatById = (
    id: number,
    options?: any
) => {
    return useQuery<Response>(
        [API_URL.FORMAT.DETAIL.replace(':id', String(id))],
        () => getFormatById(id),
        { ...options }
    )
}

