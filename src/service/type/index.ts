export type BaseResponse<T> = {
  httpCode: number
  traceId: string
  responseCode: string
  description: string
  data?: T
  fieldErrors?: any
}

export type PageResponse<T> = {
  httpCode: number
  traceId: string
  responseCode: string
  description: string
  data?: {
    content: T
    page: number
    size: number
    sort: string
    totalElements: number
    totalPages: number
    last: boolean
    numberOfElements: number
    number: number
  }
  content?:T
  page?: number
  size?: number
  totalPages?: number
  fieldErrors?: any
  number?: number
}
