import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  name: z.string(),
  status: z.any(),
  page: z.number(),
  size: z.number(),
  sort: z.string(),
}).superRefine((values, ctx) => {
  if (values.status === null || values.status === '') {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select Status',
      path: ['status']
    })
  }
})

export type GetInput = z.infer<typeof GetInputSchema>
