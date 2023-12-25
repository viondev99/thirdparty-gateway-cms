import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  id: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
