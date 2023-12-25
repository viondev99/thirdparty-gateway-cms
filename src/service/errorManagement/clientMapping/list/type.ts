import { PageResponse } from '@/service/type'

type ClientMapping = {
  id: number
  partnerName: string
  quantity: number
  partnerId: number
}

export type Response = {
  GET: PageResponse<Array<ClientMapping>>
}

export type RequestBody = {
  GET: {
    errorCodeInternal?: string
    errorCodeClient?: string
    systemId?: number | null
    page: number
    size: number
  }
}
