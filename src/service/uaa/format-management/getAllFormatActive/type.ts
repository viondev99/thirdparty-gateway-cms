import { BaseResponse } from "@/service/type"

export type Item = {
    id: number,
    name: string,
    createdDate: string,
    createdBy: string,
}

export type FormatResponse = BaseResponse<Array<Item>>