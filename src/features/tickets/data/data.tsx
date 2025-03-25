import { Department, Ticket, User, Visitor } from './schema'

export const users: User[] = [
  {
    id: 'ADM-102938237182',
    name: 'Super Admin',
    username: 'superadmin',
    password: 'superkases2025',
    departmentId: 'DEPT-002',
    role: 'SUPER ADMIN',
  },
  {
    id: 'ADM-10293d23132',
    name: 'Admin',
    username: 'admin',
    password: 'admin2025pjb',
    departmentId: 'DEPT-001',
    role: 'ADMIN',
  },
]

export const departments: Department[] = [
  {
    id: 'DEPT-001',
    name: 'General Affairs',
  },
  {
    id: 'DEPT-002',
    name: 'IT Department',
  },
  {
    id: 'DEPT-003',
    name: 'Finance Department',
  },
  {
    id: 'DEPT-004',
    name: 'Human Resources',
  },
  {
    id: 'DEPT-005',
    name: 'Marketing Department',
  },
  {
    id: 'DEPT-006',
    name: 'Sales Department',
  },
  {
    id: 'DEPT-007',
    name: 'Operations Department',
  },
  {
    id: 'DEPT-008',
    name: 'Research & Development',
  },
  {
    id: 'DEPT-009',
    name: 'Legal Department',
  },
  {
    id: 'DEPT-010',
    name: 'Customer Service',
  },
]

export const visitors: Visitor[] = [
  // Visitor 1: Status "invitation"
  {
    id: 'VISITOR-001',
    company_id: 'COMP-001',
    leader_id: 'PERSON-001',
    arrival_date: '2025-03-17',
    pic_name: 'Mamah Arek',
    pic_department: 'HR',
    necessary: 'Meeting',
    note: 'Discuss project collaboration',
    status: 'invitation',
  },
  // Visitor 2: Status "on area full"
  {
    id: 'VISITOR-002',
    company_id: 'COMP-002',
    leader_id: 'PERSON-003',
    arrival_date: '2025-03-18',
    pic_name: 'Bapak Joko',
    pic_department: 'IT',
    necessary: 'Technical Support',
    note: null,
    status: 'on area full',
  },
  // Visitor 3: Status "partial out of area"
  {
    id: 'VISITOR-003',
    company_id: 'COMP-003',
    leader_id: 'PERSON-005',
    arrival_date: '2025-03-19',
    pic_name: 'Ibu Sari',
    pic_department: 'Finance',
    necessary: 'Audit',
    note: 'Bring financial reports',
    status: 'partial out of area',
  },
]

export const tickets: Ticket[] = [
  // Ticket untuk Visitor 1 (VISITOR-001)
  {
    id: 'TICKET-001',
    userId: 'ADM-102938237182', // Super Admin
    visitorId: 'VISITOR-001', // Mamah Arek
    status: 'created', // Ticket baru dibuat
    createdAt: '2025-03-15T09:00:00.000Z', // 2 hari sebelum arrival_date
  },
  // Ticket untuk Visitor 2 (VISITOR-002)
  {
    id: 'TICKET-002',
    userId: 'ADM-102938237182', // Super Admin
    visitorId: 'VISITOR-002', // Bapak Joko
    status: 'on going', // Ticket sedang berlangsung
    createdAt: '2025-03-16T10:30:00.000Z', // 2 hari sebelum arrival_date
  },
  // Ticket untuk Visitor 3 (VISITOR-003)
  {
    id: 'TICKET-003',
    userId: 'ADM-102938237182', // Super Admin
    visitorId: 'VISITOR-003', // Ibu Sari
    status: 'end', // Ticket selesai
    createdAt: '2025-03-17T14:00:00.000Z', // 2 hari sebelum arrival_date
  },
]
