import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  thirdPartyTypeId: z.any(),
  thirdPartyId: z.any(),
  status: z.any(),
  code: z.string(),
  page: z.number(),
  size: z.number(),
  sort: z.string(),
}).superRefine((values, ctx) => {
  if (values.thirdPartyTypeId == null) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select Type',
      path: ['thirdPartyTypeId']
    })
  }

  if (values.thirdPartyId == null) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please select Third Party',
      path: ['thirdPartyId']
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
