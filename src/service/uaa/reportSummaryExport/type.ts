
// 0: Type, Third Party, Service

import { BaseResponse } from "@/service/type"

// 1: Internal System
export type RequestParamsReportSummaryExport= {
    thirdPartyTypeId?: number,
    thirdPartyId ?: number,
    thirdPartyServiceId?: number,
    internalSystemId?: number,
    groupBy?: number,
    page?: number,
    size?: number,
}
type Item = {
    fileContent: string,
    fileName: string
}
export type ResponseParamsReportSummaryExport = BaseResponse<Item>