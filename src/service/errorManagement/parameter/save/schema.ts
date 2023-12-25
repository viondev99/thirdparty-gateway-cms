import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const SaveInputSchema: ZodSchema<RequestBody['SAVE']> = z.object({
  name: z.string(),
  typeParam: z.string(),
  dataType: z.string(),
  description: z.string().optional(),
  templateType: z.string().optional(),
  template: z.string().optional(),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
