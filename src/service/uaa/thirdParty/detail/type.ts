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
  GET: any
}

export type RequestBody = {
  GET: {
    id: number,
  }
}
