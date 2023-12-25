import { thirdPartyGWApi } from '@/config/axiosConfig'
import { useQuery } from 'react-query'
import { SearchFormatListRequestParams as Request, SearchFormatListResponse as Response } from './type'
import { API_URL } from '@/config/apiUrl'
import _ from 'lodash'
import { convertObjectForSearch } from '@/constants/convertObject'

export const getListFormatManagement = async (
    params: Request
): Promise<Response> => {
    const paramRequest = { ...params }
    let paramClone = convertObjectForSearch(paramRequest);
    
    if (paramClone.status != '0' && paramClone.status != '1') {
        paramClone = _.omit(paramClone, ['status']);
    }

    const { data } = await thirdPartyGWApi({
        method: 'GET',
        url: API_URL.FORMAT.SEARCH,
        params: paramClone
    })

    return data;
}

export const useQueryGetListFormatManagement = (
    params: Request,
    options?: any
) => {
    return useQuery<Response>(
        [API_URL.FORMAT.SEARCH, params],
        () => getListFormatManagement(params),
        { ...options }
    )
}

