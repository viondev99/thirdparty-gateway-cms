import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PostInputSchema: ZodSchema<RequestBody['PUT']> = z.object({
  type: z.string(),
  thirdParty: z.string(),
  apiCode: z.string(),
  apiName: z.string(),
  endpoint: z.string(),
  method: z.any(),
  protocol: z.number(),
  modelApiId: z.number(),
  description: z.string(),
}).superRefine((values, ctx) => {
  if (!values.method) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select Method',
      path: ['method']
    })
  }
})

export type PostInput = z.infer<typeof PostInputSchema>
