import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const SaveInputSchema: ZodSchema<RequestBody['SAVE']> = z.object({
  id: z.number().nullable(),
  code: z.string(),
  name: z.string(),
  priority: z.number(),
  description: z.string(),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
