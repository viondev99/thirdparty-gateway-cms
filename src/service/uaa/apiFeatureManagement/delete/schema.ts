import { z, ZodSchema } from 'zod'
import { RequestParams } from './type'

export const DeleteInputSchema: ZodSchema<RequestParams['DELETE']> = z.object({
  id: z.number(),
})

export type DeleteInput = z.infer<typeof DeleteInputSchema>
