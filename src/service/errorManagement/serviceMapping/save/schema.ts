import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const SaveInputSchema: ZodSchema<RequestBody['SAVE']> = z.object({
  id: z.number().nullable().optional(),
  serviceId: z.number(),
  systemId: z.number().nullable().optional(),
  errorCodeIds: z.array(z.number()).min(1, 'This field is required'),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
