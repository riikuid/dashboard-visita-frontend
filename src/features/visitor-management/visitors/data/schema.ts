import { z } from "zod";

// Update companySchema
export const companySchema = z.object({
  id: z.string(),
  name: z.string(),
  address: z.string(),
  visit_count: z.number(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

// Update personSchema
export const personSchema = z.object({
  id: z.string(),
  company_id: z.string(),
  name: z.string(),
  nik: z.string().nullable(), // Izinkan null
  phone: z.string(),
  visit_count: z.number(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const permissionAccessControlSchema = z.object({
  id: z.string(),
  permission_id: z.string(),
  access_control_id: z.string(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const permissionAccessControlFormData = z.object({
  permission_id: z.string().nullable(),
  access_control_id: z.string(),
});

export const permissionQrSchema = z.object({
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
  permission_id: z.string(),
  rfid_id: z.string(),
});

export const permissionSchema = z.object({
  id: z.string(),
  person_id: z.string(),
  visitor_id: z.string(),
  // access_control_id: z.string().optional(), // Jadikan opsional
  start_time: z.string(),
  end_time: z.string(),
  status: z.string(),
  person: personSchema,
  permission_access_controls: z.array(permissionAccessControlSchema).optional(),
  permission_qr: permissionQrSchema.nullable().optional(),
  permission_card: permissionCardSchema.nullable().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const visitorSchema = z.object({
  id: z.string(),
  company_id: z.string(),
  leader_id: z.string(),
  arrival_date: z.string(),
  pic_name: z.string(),
  pic_department: z.string(),
  necessary: z.string(),
  note: z.string().nullable(), // Tambahkan note
  status: z.string(),
  company: companySchema.optional(),
  permissions: z.array(permissionSchema).optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
});

export const visitorFormData = z.object({
  company_id: z.string(),
  leader_id: z.string(),
  arrival_date: z.date(),
  pic_name: z.string(),
  pic_department: z.string(),
  necessary: z.string(),
  status: z.string(),
});

export const permissionFormData = z.object({
  person_id: z.string(),
  visitor_id: z.string(),
  start_time: z.string(),
  end_time: z.string(),
  status: z.string(),
});

export type Visitor = z.infer<typeof visitorSchema>;
export type VisitorFormData = z.infer<typeof visitorFormData>;

export type Permission = z.infer<typeof permissionSchema>;
export type PermissionFormData = z.infer<typeof permissionFormData>;

export type PermissionAccessControl = z.infer<typeof permissionAccessControlSchema>;
export type PermissionAccessControlFormData = z.infer<typeof permissionAccessControlFormData>;

export type PermissionQR = z.infer<typeof permissionQrSchema>;

export type PermissionCard = z.infer<typeof permissionCardSchema>;
export type permissionCardFormData = z.infer<typeof permissionCardFormData>;