import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'
import moment from 'moment'
import { TIME_LIMITED } from '@/constants/time'

export const GetInputSchema: ZodSchema<RequestBody['GET']> = z
  .object({
    actionType: z.any(),
    fromActionDate: z.any(),
    toActionDate: z.any(),
    rowId: z.number(),
    tableName: z.any(),
  })
  .superRefine((values, ctx) => {
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

export type GetInput = z.infer<typeof GetInputSchema>
