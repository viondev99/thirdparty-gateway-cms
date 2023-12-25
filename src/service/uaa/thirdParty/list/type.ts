type TypeThirdParty = {
  id?: number
  name?: string
  thirdPartyTypeId?: number
  thirdPartyId?: number
  featureApiId?: number
  status?: number
  sort?: string
  page?: number
  size?: number
}

export type Response = {
  GET: {
    httpCode?: number
    traceId?: string
    responseCode?: string
    description?: string
    data?: {
      content?: {
        id: number
        name: string
        protocol: number
        apiCode: string
        methodType: string
        uri: string
        description: string
        status: string
        authenConfigId: number
        isDeleted: number
        CreatedBy: string
        createdDate: string
        updatedBy: string
        updatedDate: string
        featureApiId: string
      }[]
      totalPages?: number
      totalElements?: number
      last?: boolean
      size?: number
      page?: number
      number?: number
      numberOfElements?: number
      first?: boolean
      empty?: boolean
    }
  }
}

export type RequestBody = {
  GET: {
    name?: string
    thirdPartyId?: any
    thirdPartyTypeId?: any
    featureApiId?: any
    thirdPartyServiceId?: any
    status?: any
    page: number
    size: number
    sort?: string
  }
}
