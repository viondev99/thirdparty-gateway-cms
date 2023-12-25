
// 0: Type, Third Party, Service

import { PageResponse } from "@/service/type"

// 1: Internal System
export type RequestParamsReportSummary= {
    fromDate?: any,
    toDate?: any,
    thirdPartyTypeId?: number,
    thirdPartyId ?: number,
    thirdPartyServiceId?: number,
    internalSystemId?: number,
    groupBy?: number,
    page?: number,
    size?: number,
}

type Item = {
    thirdPartyTypeId: number,
    thirdPartyId: number,
    thirdPartyServiceId: number,
    systemType: any,
    internalSystemId: number,
    totalRequest: number,
    avgResponseTime: number,
    totalSuccess: number,
    avgFail: number
}

export type ResponseParamsReportSummary = PageResponse<Array<Item>>