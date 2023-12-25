import { PageResponse } from '@/service/type'

type PartnerMapping = {
  id: number
  partnerName: string
  quantity: number
  partnerId: number
  systemName: string
  status: string
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: any
}

export type Response = {
  GET: PageResponse<Array<PartnerMapping>>
}

export type RequestBody = {
  GET: {
    errorCodeInternal?: string
    errorCodePartner?: string
    systemId?: number | null
    page: number
    size: number
  }
  POST: {
    partyId: number
    status: string
  }
}
