import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  search: z.string().trim().optional(),
  status: z.string().trim().optional(),
  dataType: z.string().trim().nullable().optional(),
  typeParam: z.string().trim().nullable().optional(),
  page: z.number(),
  size: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
