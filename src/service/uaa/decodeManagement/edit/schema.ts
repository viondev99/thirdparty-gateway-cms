import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PutInputSchema: ZodSchema<RequestBody['PUT']> = z
  .object({
    id: z.number(),
    thirdPartyTypeId: z.any(),
    thirdPartyId: z.any(),
    code: z.any(),
    status: z.any(),
    description: z.string(),
    decodeConfigDetails: z.object(
      {
        id: z.any(),
        internalValue: z.any(),
        externalValue: z.any(),
        status: z.any(),
        isDeleted: z.boolean()
      }
    ).array(),
    decodeConfigDetailsEdit: z.any(),
  })
  .superRefine((values, ctx) => {
    if (!values.thirdPartyTypeId || values.thirdPartyTypeId == 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please select Type',
        path: ['thirdPartyTypeId'],
      })
    }
    if (!values.thirdPartyId || values.thirdPartyId == 0) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please select Third Party',
        path: ['thirdPartyId'],
      })
    }

    if (!values.code || values.code == '') {
      ctx.addIssue({
        code: 'custom',
        message: 'Please enter Code',
        path: ['code'],
      })
    }
  })

export type PutInput = z.infer<typeof PutInputSchema>
