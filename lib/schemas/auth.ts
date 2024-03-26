import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email().max(50),
  password: z
    .string()
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{8,}$/,
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
    )
    .max(50)
})

export type TLoginSchema = z.infer<typeof loginSchema>
