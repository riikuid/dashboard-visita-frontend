import { z } from 'zod'

// We're keeping a simple non-relational schema here.

// IRL, you will have a schema for your data models.
export const departmentSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const accessControlSchema = z.object({
  id: z.string(),
  roomName: z.string(),
  department_id: z.string(),
  ipAddress: z.string(),
  username: z.string(),
  password: z.string(),
  status: z.enum(["ACTIVE", "INACTIVE"]),
  checked_at: z.date(),
});

export type Department = z.infer<typeof departmentSchema>
export type AccessControl = z.infer<typeof accessControlSchema>
