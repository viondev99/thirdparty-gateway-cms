type InternalSystem = {
  id: number,
  name: string,
  systemType: string
}

export type Response = {
  GET: InternalSystem
}

export type RequestBody = {
  GET: {}
}
