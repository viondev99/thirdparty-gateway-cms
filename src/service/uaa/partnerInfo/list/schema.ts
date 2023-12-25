import { z, ZodSchema } from 'zod'
import { PartnerRequestBody } from './type'

export const PartnerGetInputSchema: ZodSchema<PartnerRequestBody['GET']> = z.object({
  thirdPartyTypeId: z.any(),
  thirdPartyId: z.any(),
  roleTypeCode: z.string(),
  action: z.number(),
  status: z.any(),
  partnerId: z.number(),
})

export type PartnerGetInput = z.infer<typeof PartnerGetInputSchema>
