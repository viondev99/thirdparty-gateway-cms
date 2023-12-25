export type ClientErrorInternalErrorMap = {
  internalErrorId: number | null
  partnerErrorIds: number[]
}

export type RequestBody = {
  SAVE: {
    partnerId: number | null
    partnerErrorInternalErrorMaps: ClientErrorInternalErrorMap[]
  }
}
