type ServiceInfo = {
  code: string
  name: string
}

export type RequestBody = {
  POST: {
    services: ServiceInfo[]
  }
}
