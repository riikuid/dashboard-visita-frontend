import { z } from 'zod'

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  visit_count: z.number(),
});

export const personSchema = z.object({
  id: z.string(),
  company_id: z.string(),
  name: z.string(),
  nik: z.string().nullable(),
  phone: z.string(),
  visit_count: z.number(),
});
export type Company = z.infer<typeof companySchema>
export type Person = z.infer<typeof personSchema>
