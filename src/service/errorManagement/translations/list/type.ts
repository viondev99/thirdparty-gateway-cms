import { PageResponse } from '@/service/type'

type Translation = {
  id: number
  language: string
  service: string
  translated: number
  untranslated: number
  status: string
}

export type Response = {
  GET: PageResponse<Array<Translation>>
}

export type RequestBody = {
  GET: {
    search?: string
    status?: string
    page: number
    size: number
  }
  POST: {
    id: number
    status: string
  }
}
