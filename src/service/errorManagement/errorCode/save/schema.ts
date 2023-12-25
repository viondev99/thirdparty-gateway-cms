import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'
import { REGEX } from '@/helper/regex'

export const SaveInputSchema: ZodSchema<RequestBody['SAVE']> = z.object({
  id: z.number().nullable().optional(),
  code: z
    .string()
    .max(25)
    .trim()
    .regex(REGEX.CODE, 'Code includes alphanumeric characters and -/_'),
  name: z.string().nullable().optional(),
  systemId: z.number().nullable(),
  solution: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
