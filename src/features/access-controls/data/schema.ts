import { z } from 'zod'

// We're keeping a simple non-relational schema here.
export const accessControlSchema = z.object({
  id: z.string(),
  name: z.string(),
  department_id: z.string(),
  location: z.string(),
  ip_address: z.string(),
  username: z.string(),
  password: z.string(),
  is_active: z.boolean(),
  updatedAt: z.string(),
  createdAt: z.string(),
});

export const accessControlFormData = z.object({
  name: z.string(),
  department_id: z.string(),
  location: z.string(),
  ip_address: z.string(),
  username: z.string(),
  password: z.string(),
  is_active: z.boolean(),
});

export type AccessControl = z.infer<typeof accessControlSchema>
export type AccessControlFormData = z.infer<typeof accessControlFormData>
