import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  thirdPartyTypeId: z.number(),
  thirdPartyId: z.number(),
})

export type GetInput = z.infer<typeof GetInputSchema>
