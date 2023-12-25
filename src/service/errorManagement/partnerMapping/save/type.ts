export type PartnerErrorInternalErrorMap = {
  internalErrorId: number | null
  partnerErrorIds: number[]
}

export type RequestBody = {
  SAVE: {
    id: number | null
    partnerId: number | null
    systemId: number | null
    partnerErrorInternalErrorMaps: PartnerErrorInternalErrorMap[]
  }
}
