import { BaseResponse, PageResponse } from "@/service/type"

export type Item = {
    id: number,
    code: string,
    value: string,
    type: string,
    description: string,
    isCheckSum: boolean,
    createdBy: string,
    createdDate: string,
    updatedDate: string,
    updatedBy: string,
    status: string
}

export type FormatResponse = BaseResponse<Item>