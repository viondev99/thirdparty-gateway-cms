export type RequestBody = {
  SAVE: {
    id?: number | null
    partnerId?: number | null
    systemId?: number | null
    code: string
    name?: string | null
    solution?: string | null
    description?: string | null
  }
}
