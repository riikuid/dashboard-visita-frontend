import '@tabler/icons-react'
import {
  AccessControl,
  Company,
  Permission,
  PermissionCard,
  Person,
  QR,
  RFID,
  Visitor,
} from './schema'

export const visitorStatuses = [
  {
    value: 'invitation',
    label: 'Invitation',
    icon: null,
  },
  {
    value: 'registered visitor',
    label: 'Registered Visitor',
    icon: null,
  },
  {
    value: 'visit application',
    label: 'Visit Application',
    icon: null,
  },
  {
    value: 'on qrcode',
    label: 'On QRCode',
    icon: null,
  },
  {
    value: 'on area partial',
    label: 'On Area Partial',
    icon: null,
  },
  {
    value: 'on area full',
    label: 'On Area Full',
    icon: null,
  },
  {
    value: 'on location',
    label: 'On Location',
    icon: null,
  },
  {
    value: 'partial overlimit on checkpoint',
    label: 'Partial Overlimit On Checkpoint',
    icon: null,
  },
  {
    value: 'full overlimit on checkpoint',
    label: 'Full Overlimit On Checkpoint',
    icon: null,
  },
  {
    value: 'partial out of area',
    label: 'Partial Out Of Area',
    icon: null,
  },
  {
    value: 'full out of area',
    label: 'Full Out Of Area',
    icon: null,
  },
]

// export const visitorStatuses = [
//   {
//     value: 'REGISTERED',
//     label: 'Registered',
//     icon: null,
//   },
//   {
//     value: 'ON_VISIT',
//     label: 'On Visit',
//     icon: null,
//   },
//   {
//     value: 'EXPIRED',
//     label: 'Expired',
//     icon: null,
//   },
// ]

export const permissionStatuses = [
  {
    value: 'registered',
    label: 'Registered',
    icon: null,
  },
  {
    value: 'qr ready',
    label: 'QR Ready',
    icon: null,
  },
  {
    value: 'on area',
    label: 'On Area',
    icon: null,
  },
  {
    value: 'checkpoint',
    label: 'Checkpoint',
    icon: null,
  },
  {
    value: 'checkpoint overlimit',
    label: 'Checkpoint overlimit',
    icon: null,
  },
  {
    value: 'ready to go',
    label: 'Ready to Go',
    icon: null,
  },
  {
    value: 'Canceled',
    label: 'Canceled',
    icon: null,
  },
  {
    value: 'Expired',
    label: 'Expired',
    icon: null,
  },
]

// Mock Data untuk Companies
export const companies: Company[] = [
  {
    id: 'COMP-001',
    name: 'PT Sejahtera Utama',
    address: 'Jl. Sudirman No. 123, Jakarta',
    visit_count: 5,
  },
  {
    id: 'COMP-002',
    name: 'CV Maju Jaya',
    address: 'Jl. Thamrin No. 45, Surabaya',
    visit_count: 3,
  },
  {
    id: 'COMP-003',
    name: 'PT Teknologi Inovasi',
    address: 'Jl. Gatot Subroto No. 78, Bandung',
    visit_count: 2,
  },
]

// Mock Data untuk Persons
export const persons: Person[] = [
  // Persons dari PT Sejahtera Utama (COMP-001)
  {
    id: 'PERSON-001',
    company_id: 'COMP-001',
    name: 'Pak Akbar',
    nik: '123456789',
    phone: '08123456789',
    visit_count: 3,
  },
  {
    id: 'PERSON-002',
    company_id: 'COMP-001',
    name: 'Bu Rina',
    nik: '987654321',
    phone: '08198765432',
    visit_count: 1,
  },
  // Persons dari CV Maju Jaya (COMP-002)
  {
    id: 'PERSON-003',
    company_id: 'COMP-002',
    name: 'Pak Budi',
    nik: '456789123',
    phone: '08145678912',
    visit_count: 2,
  },
  {
    id: 'PERSON-004',
    company_id: 'COMP-002',
    name: 'Bu Siti',
    nik: '321654987',
    phone: '08132165498',
    visit_count: 1,
  },
  // Persons dari PT Teknologi Inovasi (COMP-003)
  {
    id: 'PERSON-005',
    company_id: 'COMP-003',
    name: 'Pak Dedi',
    nik: '654321987',
    phone: '08165432198',
    visit_count: 1,
  },
  {
    id: 'PERSON-006',
    company_id: 'COMP-003',
    name: 'Bu Ani',
    nik: '789123456',
    phone: '08178912345',
    visit_count: 0,
  },
]

// Mock Data untuk Visitors (dengan variasi status)
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

// Mock Data untuk Permissions
export const permissions: Permission[] = [
  // Permissions untuk VISITOR-001
  {
    id: 'PERM-001',
    person_id: 'PERSON-001',
    visitor_id: 'VISITOR-001',
    access_control_id: 'AC-001',
    start_time: '2025-03-17T09:00:00',
    end_time: '2025-03-17T12:00:00',
    status: 'registered',
  },
  {
    id: 'PERM-002',
    person_id: 'PERSON-002',
    visitor_id: 'VISITOR-001',
    access_control_id: 'AC-002',
    start_time: '2025-03-17T09:00:00',
    end_time: '2025-03-17T12:00:00',
    status: 'qr ready',
  },
  // Permissions untuk VISITOR-002
  {
    id: 'PERM-003',
    person_id: 'PERSON-003',
    visitor_id: 'VISITOR-002',
    access_control_id: 'AC-003',
    start_time: '2025-03-18T10:00:00',
    end_time: '2025-03-18T14:00:00',
    status: 'on area',
  },
  {
    id: 'PERM-004',
    person_id: 'PERSON-004',
    visitor_id: 'VISITOR-002',
    access_control_id: 'AC-004',
    start_time: '2025-03-18T10:00:00',
    end_time: '2025-03-18T14:00:00',
    status: 'checkpoint',
  },
  // Permissions untuk VISITOR-003
  {
    id: 'PERM-005',
    person_id: 'PERSON-005',
    visitor_id: 'VISITOR-003',
    access_control_id: 'AC-005',
    start_time: '2025-03-19T08:00:00',
    end_time: '2025-03-19T11:00:00',
    status: 'checkpoint overlimit',
  },
  {
    id: 'PERM-006',
    person_id: 'PERSON-006',
    visitor_id: 'VISITOR-003',
    access_control_id: 'AC-006',
    start_time: '2025-03-19T08:00:00',
    end_time: '2025-03-19T11:00:00',
    status: 'expired',
  },
]

// Mock Data untuk QRs
export const qrs: QR[] = [
  {
    id: 'QR-001',
    permission_id: 'PERM-001',
    is_active: true,
    active_until: '2025-03-17T12:00:00',
    gate_number: 1,
  },
  {
    id: 'QR-002',
    permission_id: 'PERM-002',
    is_active: true,
    active_until: '2025-03-17T12:00:00',
    gate_number: 2,
  },
  {
    id: 'QR-003',
    permission_id: 'PERM-003',
    is_active: false,
    active_until: '2025-03-18T14:00:00',
    gate_number: 1,
  },
  {
    id: 'QR-004',
    permission_id: 'PERM-005',
    is_active: true,
    active_until: '2025-03-19T11:00:00',
    gate_number: 3,
  },
]

// Mock Data untuk Permission Cards
export const permissionCards: PermissionCard[] = [
  {
    id: 'CARD-001',
    permission_id: 'PERM-001',
    rfid_id: 'RFID-001',
  },
  {
    id: 'CARD-002',
    permission_id: 'PERM-003',
    rfid_id: 'RFID-002',
  },
  {
    id: 'CARD-003',
    permission_id: 'PERM-005',
    rfid_id: 'RFID-003',
  },
]

// Mock Data untuk Access Controls
export const accessControls: AccessControl[] = [
  {
    id: 'AC-001',
    roomName: 'Meeting Room A',
    department_id: 'DEPT-001',
    ipAddress: '192.168.1.101',
    username: 'admin',
    password: 'password123',
    status: 'ACTIVE',
  },
  {
    id: 'AC-002',
    roomName: 'Meeting Room B',
    department_id: 'DEPT-001',
    ipAddress: '192.168.1.102',
    username: 'admin',
    password: 'password123',
    status: 'ACTIVE',
  },
  {
    id: 'AC-003',
    roomName: 'Server Room',
    department_id: 'DEPT-002',
    ipAddress: '192.168.1.103',
    username: 'admin',
    password: 'password123',
    status: 'INACTIVE',
  },
  {
    id: 'AC-004',
    roomName: 'IT Lab',
    department_id: 'DEPT-002',
    ipAddress: '192.168.1.104',
    username: 'admin',
    password: 'password123',
    status: 'ACTIVE',
  },
  {
    id: 'AC-005',
    roomName: 'Finance Office',
    department_id: 'DEPT-003',
    ipAddress: '192.168.1.105',
    username: 'admin',
    password: 'password123',
    status: 'ACTIVE',
  },
  {
    id: 'AC-006',
    roomName: 'Archive Room',
    department_id: 'DEPT-003',
    ipAddress: '192.168.1.106',
    username: 'admin',
    password: 'password123',
    status: 'INACTIVE',
  },
]

// Mock Data untuk RFIDs
export const rfids: RFID[] = [
  {
    id: 'RFID-001',
    label: 'Card A',
    data: 'RFID-DATA-001',
    status: 'ACTIVE',
  },
  {
    id: 'RFID-002',
    label: 'Card B',
    data: 'RFID-DATA-002',
    status: 'ACTIVE',
  },
  {
    id: 'RFID-003',
    label: 'Card C',
    data: 'RFID-DATA-003',
    status: 'INACTIVE',
  },
]
