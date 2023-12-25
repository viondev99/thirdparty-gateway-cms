import { BaseResponse } from "@/service/type"

export type CreateFormatRequestBody = {
    code: string,
    value: string,
    status: number,
    description?: string
}

export type Item = {
}

export type FormatResponse = BaseResponse<Item>