import { z, ZodSchema } from 'zod'
import { RequestBody } from './type'

export const PostInputSchema: ZodSchema<any> = z.object({
}).array()

export type PostInput = z.infer<typeof PostInputSchema>
