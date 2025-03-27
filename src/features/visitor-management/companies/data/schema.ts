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
  // nik: z.string().nullable(),
  phone: z.string(),
  visit_count: z.number(),
});

export const companyFormData = z.object({
  name: z.string().min(5, 'Company Name is required.'),
  address: z.string().min(5, 'Address is required.'),
})

export const personFormData = z.object({
  name: z.string().min(5, 'Name is required.'),
  phone: z.string().min(5, 'Phone number is required.'),
  // nik: z.string().nullable().optional(),
  company_id: z.string().min(1, 'Company must selected'),
});

export type Company = z.infer<typeof companySchema>
export type CompanyFormData = z.infer<typeof companyFormData>
export type Person = z.infer<typeof personSchema>
export type PersonFormData = z.infer<typeof personFormData>
