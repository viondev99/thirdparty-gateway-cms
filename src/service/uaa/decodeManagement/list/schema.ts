import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z.object({
  thirdPartyTypeId: z.any(),
  thirdPartyId: z.any(),
  code: z.any(),
  status: z.any(),
  page: z.number(),
  size: z.number(),
  sort: z.string(),
}).superRefine((values, ctx) => {
  if (values.thirdPartyId == null) {
    ctx.addIssue({
      code: 'custom',
      message: `Please select Third Party`,
      path: ['thirdPartyId']
    })
  }

  if (values.code == null) {
    ctx.addIssue({
      code: 'custom',
      message: 'Please enter Code',
      path: ['code']
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
