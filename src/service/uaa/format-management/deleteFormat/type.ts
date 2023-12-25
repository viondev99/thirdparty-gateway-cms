import { BaseResponse } from "@/service/type"

export type UpdateFormatRequestBody = {
    id: number,
    code: string,
    value: string,
    status: number,
    description?: string
}

export type Item = {
}

export type FormatResponse = BaseResponse<Item>