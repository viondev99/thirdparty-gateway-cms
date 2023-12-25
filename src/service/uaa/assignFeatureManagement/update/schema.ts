import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PutInputSchema: ZodSchema<RequestBody['PUT']> = z.object({
  modelApiId: z.any(),
  internalServiceId: z.any(),
  systemType: z.any(),
  status: z.any(),
  description: z.string(),
  id: z.number()
}).superRefine((values, ctx) => {
  if (!values.modelApiId) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select API\'s Feature',
      path: ['modelApiId']
    })
  }

  if (!values.internalServiceId) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select Internal System',
      path: ['internalServiceId']
    })
  }

  if (values.description && values.description.length > 500) {
    ctx.addIssue({
      code: 'custom',
      message: 'Description cannot exceed 500 characters',
      path: ['description']
    })
  }
})

export type PutInput = z.infer<typeof PutInputSchema>
