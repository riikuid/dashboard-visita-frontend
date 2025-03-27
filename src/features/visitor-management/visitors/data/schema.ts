import { z } from "zod";

export const visitorSchema = z.object({
  id: z.string(),
  company_id: z.string(),
  leader_id: z.string(),
  arrival_date: z.string(),
  pic_name: z.string(),
  pic_department: z.string(),
  necessary: z.string(),
  // note: z.string().nullable(),
  // status: z.string(),
  status: z.string(),
});

export const visitorFormData = z.object({
  company_id: z.string(),
  leader_id: z.string(),
  arrival_date: z.date(),
  pic_name: z.string(),
  pic_department: z.string(),
  necessary: z.string(),
  status: z.string(),
  // note: z.string().nullable(),
})

export const permissionSchema = z.object({
  id: z.string(),
  person_id: z.string(),
  visitor_id: z.string(),
  access_control_id: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  status: z.string(),
  // status: z.enum([ 'registered'
  //   , 'qr ready'
  //   , 'on area'
  //   , 'checkpoint'
  //   , 'checkpoint overlimit'
  //   , 'ready to go'
  //   , 'canceled'
  //   , 'expired']),
});

export const permissionFormData = z.object({
  id: z.string(),
  person_id: z.string(),
  visitor_id: z.string(),
  access_control_id: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  status: z.string(),
  // status: z.enum([ 'registered'
  //   , 'qr ready'
  //   , 'on area'
  //   , 'checkpoint'
  //   , 'checkpoint overlimit'
  //   , 'ready to go'
  //   , 'canceled'
  //   , 'expired']),
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

export const permissionCardFormData = z.object({
  id: z.string(),
  permission_id: z.string(),
  rfid_id: z.string(),
});

export type Visitor = z.infer<typeof visitorSchema>;
export type VisitorFormData = z.infer<typeof visitorFormData>;
export type Permission = z.infer<typeof permissionSchema>;
export type PermissionFormData = z.infer<typeof permissionFormData>;
export type QR = z.infer<typeof qrSchema>;
export type PermissionCard = z.infer<typeof permissionCardSchema>;
export type permissionCardFormData = z.infer<typeof permissionCardFormData>;