import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PostInputSchema: ZodSchema<RequestBody['POST']> = z.object({
  modelApiId: z.any(),
  internalServiceId: z.any(),
  systemType: z.any(),
  status: z.any(),
  description: z.string()
}).superRefine((values, ctx) => {
  if (!values.modelApiId || values.modelApiId == 0) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select API\'s Feature',
      path: ['modelApiId']
    })
  }

  if (!values.internalServiceId || values.internalServiceId == 0) {
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

export type PostInput = z.infer<typeof PostInputSchema>
