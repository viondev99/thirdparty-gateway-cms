import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const SaveInputSchema: ZodSchema<RequestBody['SAVE']> = z.object({
  languages: z
    .object({
      languageId: z.number(),
      displayName: z.string(),
    })
    .optional(),
  errorCodeId: z.number().nullable(),
  languageId: z.number(),
  errorCodeName: z.string(),
  groupContents: z.any(),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
