import { PageResponse } from "@/service/type"

export type RequestParamsReportCompare= {
    startTime?: any,
    endTime?: any,
    startTimeReport?: any,
    endTimeReport?: any,
    page?: number,
    size?: number
}
type Item = {
    totalRequestReport: number,
    avgResponseTimeReport: number,
    totalRequestCompare: number,
    avgResponseTimeCompare: number,
    totalSuccessCompare: number,
    totalSuccessReport: number,
}
export type ResponseParamsReportCompare = PageResponse<Array<Item>>