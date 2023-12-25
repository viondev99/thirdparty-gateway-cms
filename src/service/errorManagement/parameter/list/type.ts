import { PageResponse } from '@/service/type'

type Parameter = {
  id: number
  name: string
  typeParam: string
  templateCode: string
  dataType: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
  createdBy: any
  updatedBy: number
}

export type Response = {
  GET: PageResponse<Parameter[]>
}

export type RequestBody = {
  GET: {
    search?: string
    status?: string
    dataType?: string | null
    typeParam?: string | null
    page: number
    size: number
  }
  POST: {
    id: number
    status: string
  }
}
