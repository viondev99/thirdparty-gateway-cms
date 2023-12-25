import { thirdPartyGWApi } from '@/config/axiosConfig';
import { RequestParamsReportCompare as Request, ResponseParamsReportCompare as Response } from './type'
import { API_URL } from '@/config/apiUrl';
import { useQuery } from 'react-query';

export const reportCompare = async (request: Request): Promise<Response> => {
    const { page = 0, size = 10 }: any = request;
    const { data } = await thirdPartyGWApi({
        method: 'POST',
        url: API_URL.REPORT.REPORT_COMPARE,
        data: request,
        params: {
          page, size
        }
    });
    return data;
}

export const useQueryReportCompare = (
    params: Request,
    options?: any
  ) => {
    return useQuery<Response>(
      [API_URL.REPORT.REPORT_COMPARE, params],
      () => reportCompare(params),
      { ...options }
    )
  }