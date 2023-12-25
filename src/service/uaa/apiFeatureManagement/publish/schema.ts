import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PutInputSchema: ZodSchema<RequestBody['PUT']> = z.object({
  id: z.number()
})

export type PutInput = z.infer<typeof PutInputSchema>
