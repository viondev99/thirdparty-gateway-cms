
type Feature = {
  message?: string
  traceId?: string
  data?: object
}

export type Response = {
  POST: Feature
}

export type RequestBody = {
  POST: any
}
