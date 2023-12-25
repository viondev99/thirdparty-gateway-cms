import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const SaveInputSchema: ZodSchema<RequestBody['SAVE']> = z.object({
  id: z.number().nullable(),
  partnerId: z.number(),
  systemId: z.number(),
  partnerErrorInternalErrorMaps: z.array(
    z.object({
      internalErrorId: z.number(),
      partnerErrorIds: z.array(z.number()).min(1),
    })
  ),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
