import { z } from 'zod'

// We're keeping a simple non-relational schema here.

// IRL, you will have a schema for your data models.
export const departmentSchema = z.object({
  id: z.string(),
  name: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  password: z.string(),
  departmentId: z.string(),
  role: z.string(),
});

export const ticketSchema = z.object({
  id: z.string(),
  userId: z.string(),
  visitorId: z.string(),
  status: z.enum(["created", 'on going', 'end']),
  createdAt: z.string(),
});

export const visitorSchema = z.object({
  id: z.string(),
  company_id: z.string(),
  leader_id: z.string(),
  arrival_date: z.string(),
  pic_name: z.string(),
  pic_department: z.string(),
  necessary: z.string(),
  note: z.string().nullable(),
  status: z.enum(["invitation", "registered visitor", "visit application", "on qrcode", "on area partial", "on area full", "on location", "partial overlimit on checkpoint", "full overlimit on checkpoint", "partial out of area", "full out of area"]),
});


export type User = z.infer<typeof userSchema>
export type Department = z.infer<typeof departmentSchema>
export type Visitor = z.infer<typeof visitorSchema>;
export type Ticket = z.infer<typeof ticketSchema>;