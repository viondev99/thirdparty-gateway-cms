import { thirdPartyGWApi } from '@/config/axiosConfig';
import { RequestParamsReportCompareExport as Request, ResponseParamsReportCompareExport as Response } from './type'
import { API_URL } from '@/config/apiUrl';
import { useQuery } from 'react-query';

export const reportCompareExport = async (request: Request): Promise<Response> => {
    const { data } = await thirdPartyGWApi({
        method: 'POST',
        url: API_URL.REPORT.REPORT_COMPARE_EXPORT,
        data: request,
    });
    return data;
}

export const useQueryReportCompareExport = (
    params: Request,
    options?: any
  ) => {
    return useQuery<Response>(
      [API_URL.REPORT.REPORT_COMPARE_EXPORT, params],
      () => reportCompareExport(params),
      { ...options }
    )
  }