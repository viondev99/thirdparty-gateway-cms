import { PageResponse } from '@/service/type'

type Feature = {
  id?: number
  apiCode?: string
  authenConfigId?: string | number
  createdAt?: string
  createdBy?: string
  description?: string
  headers?: string
  isDeleted?: boolean
  methodType?: string
  name?: string
  protocol?: string
  request?: Request
  requestTemplate?: any
  response?: any
  responseTemplate?: any
  status?: number
  thirdPartyId?: any
  type?: number
  updatedAt?: string
  updatedBy?: string
  uri?: any
  uris?: any
}

export type Request = {
  childs: Childs[]
  dataTypeId?: number
  directionType?: number
  id?: number
  isDeleted?: boolean
  modelApiId?: number
  name: string
  status?: number
  type?: number
}

export type Childs = {
  index?: any
  childs?: any
  dataTypeId?: number
  defaultValue?: any
  description?: string
  directionType?: number
  featureAPIPropertiesId?: any
  format?: any
  id?: number
  isDeleted?: boolean
  isRequired?: boolean
  maxLength?: number | string
  modelApiId?: number
  name?: string
  parentId?: number
  path?: string
  specialType?: any
  status?: number
  type?: number
}

export type Response = {
  GET: Feature
}

export type RequestBody = {
  GET: {
    id: number
  }
}
