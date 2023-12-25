import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  errorCodeInternal: z.string().trim().optional(),
  errorCodePartner: z.string().trim().optional(),
  systemId: z.number().nullable().optional(),
  page: z.number(),
  size: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
