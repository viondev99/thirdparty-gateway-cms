import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'
import moment from 'moment'

const regex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\s]/
const regexp = /[a-zA-Z0-9]+$/
const regexp_ = /[a-zA-Z0-9\\_\\]+$/
const regexUTF8 = /[^\x00-\x7F]+/

export const PostInputSchema: ZodSchema<RequestBody['POST']> = z
  .object({
    thirdPartyTypeId: z.number().min(1, 'Please select Type'),
    thirdPartyId: z.number().min(1, 'Please select Third Party'),
    code: z.string(),
    effectAt: z.any(),
    expiredAt: z.any(),
    description: z.string(),
    authenTypeId: z.any(),
    username: z.string(),
    password: z.string(),
    passwordConfirm: z.string(),
    token: z.string(),
    grantType: z.string(),
    clientId: z.string(),
    clientSecret: z.string(),
    loginUrl: z.string(),
    limitTime: z.boolean(),
    valueLimitTime: z.string(),
    protocol: z.number(),
    status: z.any(),
    scope: z.string(),
    authenAttribute: z.any(),
  })
  .superRefine((values, ctx) => {
    if (values.authenTypeId === '1' || values.authenTypeId === 1) {
      if (!values.username) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter Username',
          path: ['username'],
        })
      }
      if (values.username.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter Username',
          path: ['username'],
        })
      } else if (
          regexUTF8.test(values.username) || values.username.includes(' ') || !regexp.test(values.username)
        ) {
        ctx.addIssue({
          code: 'custom',
          message: 'Username is invalid',
          path: ['username'],
        })
      }
      if (!values.password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter Password',
          path: ['password'],
        })
      } else if (regexUTF8.test(values.password) || values.password.includes(' ')) {
        ctx.addIssue({
          code: 'custom',
          message: 'Password is invalid',
          path: ['password'],
        })
      }
      if (!values.passwordConfirm) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter Confirm Password',
          path: ['passwordConfirm'],
        })
      }
      if (values.passwordConfirm !== values.password) {
        ctx.addIssue({
          code: 'custom',
          message: 'Password and Confirm Password do not match',
          path: ['passwordConfirm'],
        })
      }
    }
    if (values.authenTypeId === '2') {
      if (!values.token) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter Token',
          path: ['token'],
        })
      } else if (regexUTF8.test(values.token) || values.token.includes(' ')) {
        ctx.addIssue({
          code: 'custom',
          message: 'Token is invalid',
          path: ['token'],
        })
      }
    }
    if (values.authenTypeId === '3') {
      if (values.scope && values.scope.includes(' ')) {
        ctx.addIssue({
          code: 'custom',
          message: 'Scope is invalid',
          path: ['scope'],
        })
      }
      if (!values.clientId) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter Client ID',
          path: ['clientId'],
        })
      } else if (values.clientId.includes(' ')) {
        ctx.addIssue({
          code: 'custom',
          message: 'Client ID is invalid',
          path: ['clientId'],
        })
      }
      if (!values.clientSecret) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter Client Secret',
          path: ['clientSecret'],
        })
      } else if (values.clientSecret.includes(' ')) {
        ctx.addIssue({
          code: 'custom',
          message: 'Client Secret is invalid',
          path: ['clientSecret'],
        })
      }
      if (!values.loginUrl) {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter Login Url',
          path: ['loginUrl'],
        })
      }  else if (values.loginUrl.trim() === '') {
        ctx.addIssue({
          code: 'custom',
          message: 'Please enter Login Url',
          path: ['loginUrl'],
        })
      }
    }
    if (!values.code) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please enter Authentication Code',
        path: ['code'],
      })
    } else if(!regexp_.test(values.code) || values.code.includes(' ')) {
      ctx.addIssue({
        code: 'custom',
        message: 'Authentication Code is invalid',
        path: ['code'],
      })
    }
    if (!values.effectAt) {
      ctx.addIssue({
        code: 'custom',
        message: 'Please enter Effective Date',
        path: ['effectAt'],
      })
    } else {
      // if (moment && moment(values.effectAt).diff(moment()) <= 0) {
      //   ctx.addIssue({
      //     code: 'custom',
      //     message: 'Effective Date is invalid',
      //     path: ['effectAt'],
      //   })
      // }
      if (values.expiredAt) {
        if (moment(values.effectAt).diff(values.expiredAt, 'days') > 0) {
          ctx.addIssue({
            code: 'custom',
            message: 'Expiration Date is invalid',
            path: ['expiredAt'],
          })
        }
      }
    }
    if (values.description && values.description.length > 500) {
      ctx.addIssue({
        code: 'custom',
        message: 'Description cannot exceed 500 characters',
        path: ['description'],
      })
    }

    // if (!values.protocol) {
    //   ctx.addIssue({
    //     code: 'custom',
    //     message: 'Protocol is required',
    //     path: ['protocol']
    //   })
    // }
    //
    // if (values.limitTime) {
    //   if (!values.valueLimitTime) {
    //     ctx.addIssue({
    //       code: 'custom',
    //       message: 'Limit Time is required',
    //       path: ['valueLimitTime']
    //     })
    //   }
    // }
  })

export type PostInput = z.infer<typeof PostInputSchema>
