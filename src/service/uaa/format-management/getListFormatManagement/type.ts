import { PageResponse } from "@/service/type"

export type SearchFormatListRequestParams = {
    code?: string,
    status?: '0' | '1',
    page: number,
    size: number
}

export type Item = {
    id: number,
    code: string,
    value: string,
    type: string,
    description: string,
    isCheckSum: boolean,
    createdBy: string,
    updatedAt: string,
    createdDate: string,
    updatedDate: string,
    updatedBy: string,
    status: string,
    createdAt?: string
}

export type SearchFormatListResponse = PageResponse<Array<Item>>