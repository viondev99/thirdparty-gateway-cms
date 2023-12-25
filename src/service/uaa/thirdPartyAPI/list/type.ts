type ThirdPartyAPI = {
  id: number
  name: string
}

export type Response = {
  GET: ThirdPartyAPI
}

export type RequestBody = {
  GET: {
    thirdPartyTypeId: number;
    thirdPartyId: number;
  }
}
