type SystemInfo = {
  code: string
  name: string
}

export type RequestBody = {
  POST: {
    systems: SystemInfo[]
  }
}
