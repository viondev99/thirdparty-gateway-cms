import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  modelApiId: z.any(),
  internalServiceId: z.any(),
  systemType: z.any(),
  status: z.any(),
  page: z.number(),
  size: z.number(),
  sort: z.string(),
}).superRefine((values, ctx) => {
  if (values.modelApiId == null) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select API\'s Feature',
      path: ['modelApiId']
    })
  }

  if (values.internalServiceId == null) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select Internal Service',
      path: ['internalServiceId']
    })
  }
  if (values.status == null) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select Status',
      path: ['status']
    })
  }
})

export type GetInput = z.infer<typeof GetInputSchema>
