import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const SaveInputSchema: ZodSchema<RequestBody['SAVE']> = z.object({
  id: z.number().nullable().optional(),
  code: z.string(),
  name: z.string(),
  groupId: z.number(),
  type: z.string(),
  attributeType: z.string(),
  isDisplay: z.boolean(),
  attributeValue: z.object({
    keyAtb: z.string(),
    value: z.string(),
  }),
  attributeValues: z.array(
    z.object({
      id: z.number().optional(),
      keyAtb: z.string(),
      value: z.string(),
    })
  ),
  deleteAttributeValueIds: z.any(),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
