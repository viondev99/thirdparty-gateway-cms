import { BaseResponse } from "@/service/type"

export type RequestParamsReportCompareExport= {
    startTime?: any,
    endTime?: any,
    startTimeReport?: any,
    endTimeReport?: any,
    page?: number,
    size?: number
}
type Item = {
    fileContent: any,
    fileName: string,
}
export type ResponseParamsReportCompareExport = BaseResponse<Item>