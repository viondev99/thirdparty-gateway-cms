export type RequestBody = {
  SAVE: {
    id?: number | null
    code: string
    name?: string | null
    systemId: number | null
    solution?: string | null
    description?: string | null
  }
}
