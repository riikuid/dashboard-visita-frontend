import { z } from "zod";

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

export const visitorSchema = z.object({
  id: z.string(),
  company_id: z.string(),
  leader_id: z.string(),
  arrival_date: z.string(),
  pic_name: z.string(),
  pic_department: z.string(),
  necessary: z.string(),
  note: z.string().nullable(),
  status: z.enum(["REGISTERED", "ON_VISIT", "EXPIRED"]),
  // status: z.enum(["invitation", "registered visitor", "visit application", "on qrcode", "on area partial", "on area full", "on location", "partial overlimit on checkpoint", "full overlimit on checkpoint", "partial out of area", "full out of area"]),
});

export const permissionSchema = z.object({
  id: z.string(),
  person_id: z.string(),
  visitor_id: z.string(),
  access_control_id: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  status: z.enum(["ACTIVE", "EXPIRED"]),
});

export const qrSchema = z.object({
  id: z.string(),
  permission_id: z.string(),
  is_active: z.boolean(),
  active_until: z.string(),
  gate_number: z.number(),
});

export const permissionCardSchema = z.object({
  id: z.string(),
  permission_id: z.string(),
  rfid_id: z.string(),
});

export type Company = z.infer<typeof companySchema>;
export type Person = z.infer<typeof personSchema>;
export type Visitor = z.infer<typeof visitorSchema>;
export type Permission = z.infer<typeof permissionSchema>;
export type QR = z.infer<typeof qrSchema>;
export type PermissionCard = z.infer<typeof permissionCardSchema>;