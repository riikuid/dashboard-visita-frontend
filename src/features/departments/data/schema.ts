//schema.ts
import { z } from 'zod'

// We're keeping a simple non-relational schema here.

// IRL, you will have a schema for your data models.
export const departmentSchema = z.object({
  id: z.string(),
  name: z.string(),
})

const departmentFormData = z.object({
  name: z.string().min(1, 'Name is required.'),
})

export type Department = z.infer<typeof departmentSchema>
export type DepartmentFormData = z.infer<typeof departmentFormData>
