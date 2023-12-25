import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'
import moment from 'moment'
import { TIME_LIMITED } from '@/constants/time'

const regexActionUser = /^[a-zA-Z0-9_.-]*$/

export const PostInputSchema: ZodSchema<RequestBody['POST']> = z
  .object({
    module: z.any(),
    actionType: z.any(),
    actionUser: z.any(),
    fromActionDate: z.any(),
    toActionDate: z.any(),
    code: z.any(),
    page: z.any(),
    size: z.any(),
    sort: z.any(),
  })
  .superRefine((values, ctx) => {
    // if (regexActionUser.test(values.actionUser)) {
    //   ctx.addIssue({
    //     code: 'custom',
    //     message: 'Action User is Invalid',
    //     path: ['actionUser']
    //   })
    // }
    if (
      values.fromActionDate &&
      moment(values.fromActionDate).format(
        `YYYY-MM-DDT${TIME_LIMITED.EFFECTIVE_TIME}+07:00`
      ) >
        moment(new Date()).format(
          `YYYY-MM-DDT${TIME_LIMITED.EFFECTIVE_TIME}+07:00`
        )
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Action Date From is invalid',
        path: ['fromActionDate'],
      })
    }
    if (
      (values.toActionDate && values.toActionDate < values.fromActionDate) ||
      (values.toActionDate &&
        moment(values.toActionDate).format(
          `YYYY-MM-DDT${TIME_LIMITED.EXPIRED_TIME}+07:00`
        ) >
          moment(new Date()).format(
            `YYYY-MM-DDT${TIME_LIMITED.EXPIRED_TIME}+07:00`
          ))
    ) {
      ctx.addIssue({
        code: 'custom',
        message: 'Action Date To is invalid',
        path: ['toActionDate'],
      })
    }
  })

export type PostInput = z.infer<typeof PostInputSchema>
