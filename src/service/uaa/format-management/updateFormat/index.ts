import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import {  FormatResponse as Response } from './type'
import { API_URL } from '@/config/apiUrl'

export const deleteFormat = async (
    id: number,
): Promise<Response> => {
    const { data } = await thirdPartyGWApi({
        method: 'DELETE',
        url: API_URL.FORMAT.DELETE.replace(':id', String(id)),
    })

    return data;
}

export const useQuerydeleteFormat = (
    id: number,
    options?: any
) => {
    return useQuery<Response>(
        [API_URL.FORMAT.UPDATE.replace(':id', String(id))],
        () => deleteFormat(id),
        { ...options }
    )
}

