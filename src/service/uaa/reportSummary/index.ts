import { thirdPartyGWApi } from '@/config/axiosConfig';
import { RequestParamsReportSummary as Request, ResponseParamsReportSummary as Response } from './type'
import { API_URL } from '@/config/apiUrl';
import { useQuery } from 'react-query';

export const reportSummary = async (request: Request): Promise<Response> => {
    const { page = 0, size = 10 }: any = request;
    const { data } = await thirdPartyGWApi({
        method: 'POST',
        url: API_URL.REPORT.REPORT_SUMMARY,
        data: request,
        params: {
          page, size
        }
    });
    return data;
}

export const useQueryReportSummary = (
    params: Request,
    options?: any
  ) => {
    return useQuery<Response>(
      [API_URL.REPORT.REPORT_SUMMARY, params],
      () => reportSummary(params),
      { ...options }
    )
  }