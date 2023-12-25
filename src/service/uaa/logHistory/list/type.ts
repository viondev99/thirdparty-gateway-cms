import { PageResponse } from '@/service/type'

export type Response = {
  GET: any
}

export type RequestBody = {
  GET: {
    rowId?: number
    tableName?: any
    actionType?: any
    fromActionDate?: any
    toActionDate?: any
    module?: any
    id?: number
  }
}
