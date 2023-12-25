import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'
import moment from 'moment'
import { TIME_LIMITED } from '@/constants/time'

export const PostInputSchema: ZodSchema<RequestBody['POST']> = z
  .object({
    fromDate: z.any(),
    toDate: z.any(),
    featureApi: z.any(),
    thirdPartyType: z.any(),
    thirdParty: z.any(),
    thirdPartyService: z.any(),
    requestId: z.any(),
    page: z.any(),
    size: z.any(),
    sort: z.any(),
  })
  .superRefine((values, ctx) => {
    if (
      values.fromDate &&
      moment(values.fromDate).format(
        `YYYY-MM-DDT${TIME_LIMITED.EFFECTIVE_TIME}+07:00`
      ) >
        moment(new Date()).format(
          `YYYY-MM-DDT${TIME_LIMITED.EFFECTIVE_TIME}+07:00`
        )
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'From is invalid',
        path: ['fromDate'],
      })
    }
    if (
      (values.toDate && values.toDate < values.fromDate) ||
      (values.toDate &&
        moment(values.toDate).format(
          `YYYY-MM-DDT${TIME_LIMITED.EXPIRED_TIME}+07:00`
        ) >
          moment(new Date()).format(
            `YYYY-MM-DDT${TIME_LIMITED.EXPIRED_TIME}+07:00`
          ))
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'To is invalid',
        path: ['toDate'],
      })
    }
  })

export type PostInput = z.infer<typeof PostInputSchema>
