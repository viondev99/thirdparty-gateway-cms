export type RequestBody = {
  SAVE: {
    id?: number | null
    search?: string
    serviceId: number | null
    systemId?: number | null
    errorCodeIds: Number[]
  }
}
