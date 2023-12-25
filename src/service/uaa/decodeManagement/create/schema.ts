import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PostInputSchema: ZodSchema<RequestBody['POST']> = z
  .object({
    thirdPartyTypeId: z.any(),
    thirdPartyId: z.any(),
    code: z.any(),
    status: z.any(),
    description: z.string(),
    decodeConfigDetails: z
      .object({
        internalValue: z.any(),
        externalValue: z.any(),
        status: z.any(),
      })
      .array(),
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
    } else if (values.code.includes(' ')) {
      ctx.addIssue({
        code: 'custom',
        message: 'Code is not valid',
        path: ['code'],
      })
    }
  })

export type PostInput = z.infer<typeof PostInputSchema>
