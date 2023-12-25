import { z, ZodSchema } from 'zod'
import { PartnerTypeRequestBody } from './type'

export const PartnerTypeGetInputSchema: ZodSchema<PartnerTypeRequestBody['GET']> = z.object({})

export type PartnerTypeGetInput = z.infer<typeof PartnerTypeGetInputSchema>
