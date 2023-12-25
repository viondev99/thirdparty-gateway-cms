import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  id: z.number(),
  thirdPartyTypeId: z.number(),
  effectAt: z.any(),
  expiredAt: z.any()
})

export type GetInput = z.infer<typeof GetInputSchema>
