import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  thirdPartyTypeId: z.any(),
  thirdPartyId: z.any(),
})
export type GetInput = z.infer<typeof GetInputSchema>
