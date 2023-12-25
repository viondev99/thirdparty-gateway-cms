import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const SaveInputSchema: ZodSchema<RequestBody['POST']> = z.object({
  services: z
    .array(
      z.object({
        code: z.string(),
        name: z.string(),
      })
    )
    .min(1, 'Đây là trường bắt buộc'),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
