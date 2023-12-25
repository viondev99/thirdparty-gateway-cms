import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { FormatResponse as Response } from './type'
import { API_URL } from '@/config/apiUrl'
type Props = { dataTypeId?: number, thirdPartyId?: number, thirdPartyTypeId?: number }
export const getAllFormatActive = async ({ dataTypeId, thirdPartyId, thirdPartyTypeId }: Props): Promise<Response> => {
    const { data } = await thirdPartyGWApi({
        method: 'GET',
        url: API_URL.FORMAT.SEARCH_ALL_ACTIVE
    })

    return data;
}

export const useQuerygetAllFormatActive = ({ dataTypeId, thirdPartyId, thirdPartyTypeId }: Props,
    options?: any
) => {
    return useQuery<Response>(
        [API_URL.FORMAT.SEARCH_ALL_ACTIVE],
        () => getAllFormatActive({ dataTypeId, thirdPartyId, thirdPartyTypeId }),
        { ...options }
    )
}

