import { ZodSchema, z } from 'zod'
import { RequestBody } from './type'

export const SaveInputSchema: ZodSchema<RequestBody['SAVE']> = z.object({
  id: z.number().nullable().optional(),
  partnerId: z.number().nullable().optional(),
  systemId: z.number().nullable().optional(),
  code: z
    .string()
    .min(1, 'Đây là trường bắt buộc')
    .max(25, 'Trường này không được vượt quá 25 kí tự')
    .regex(/^[a-zA-Z0-9\-\/_]*$/, 'Mã bao gồm kí tự chữ, số và -/_'),
  name: z.string().nullable().optional(),
  solution: z.string().nullable().optional(),
  description: z.string().nullable().optional(),
})

export type SaveInput = z.infer<typeof SaveInputSchema>
