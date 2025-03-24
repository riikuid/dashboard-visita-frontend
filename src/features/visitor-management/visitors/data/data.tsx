import '@tabler/icons-react'
import {
  Company,
  Permission,
  PermissionCard,
  Person,
  QR,
  Visitor,
} from './schema'

// export const statuses = [
//   {
//     value: 'invitation',
//     label: 'Invitation',
//     icon: IconExclamationCircle,
//   },
//   {
//     value: 'registered visitor',
//     label: 'Registered Visitor',
//     icon: IconCircle,
//   },
//   {
//     value: 'visit application',
//     label: 'Visit Application',
//     icon: IconStopwatch,
//   },
//   {
//     value: 'on qrcode',
//     label: 'On QRCode',
//     icon: IconCircleCheck,
//   },
//   {
//     value: 'on area partial',
//     label: 'On Area Partial',
//     icon: IconCircleX,
//   },
//   {
//     value: 'on area full',
//     label: 'On Area Full',
//     icon: IconCircleX,
//   },
//   {
//     value: 'on location',
//     label: 'On Location',
//     icon: IconCircleX,
//   },
//   {
//     value: 'partial overlimit on checkpoint',
//     label: 'Partial Overlimit On Checkpoint',
//     icon: IconCircleX,
//   },
//   {
//     value: 'full overlimit on checkpoint',
//     label: 'Full Overlimit On Checkpoint',
//     icon: IconCircleX,
//   },
//   {
//     value: 'partial out of area',
//     label: 'Partial Out Of Area',
//     icon: IconCircleX,
//   },
//   {
//     value: 'full out of area',
//     label: 'Full Out Of Area',
//     icon: IconCircleX,
//   },
// ]

export const statuses = [
  {
    value: 'REGISTERED',
    label: 'Registered',
    icon: null, // Bisa tambahkan ikon jika diperlukan
  },
  {
    value: 'ON_VISIT',
    label: 'On Visit',
    icon: null,
  },
  {
    value: 'EXPIRED',
    label: 'Expired',
    icon: null,
  },
]

export const companies: Company[] = [
  {
    id: 'COMP-001',
    name: 'PT Sejahtera Utama',
    address: 'Jl. Sudirman No. 123, Jakarta',
    visit_count: 5,
  },
]

export const persons: Person[] = [
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
    name: 'Adam',
    nik: '987654321',
    phone: '08198765432',
    visit_count: 1,
  },
  {
    id: 'PERSON-003',
    company_id: 'COMP-001',
    name: 'Danny',
    nik: '456789123',
    phone: '08145678912',
    visit_count: 1,
  },
  {
    id: 'PERSON-004',
    company_id: '',
    name: 'Mamah Arek',
    nik: '111222333',
    phone: '08111122233',
    visit_count: 0,
  },
]

export const visitors: Visitor[] = [
  {
    id: 'VISITOR-001',
    company_id: 'COMP-001',
    leader_id: 'PERSON-001',
    arrival_date: '2025 Feb 17',
    pic_name: 'Mamah Arek',
    pic_department: 'HR',
    necessary: 'Meeting',
    note: 'Discuss project collaboration',
    status: 'REGISTERED',
  },
]

export const permissions: Permission[] = [
  {
    id: 'PERM-001',
    person_id: 'PERSON-001',
    visitor_id: 'VISITOR-001',
    access_control_id: 'ROOM-HR-001',
    start_time: '2025-03-17T14:00:00',
    end_time: '2025-03-17T15:00:00',
    status: 'ACTIVE',
  },
  {
    id: 'PERM-002',
    person_id: 'PERSON-002',
    visitor_id: 'VISITOR-001',
    access_control_id: 'ROOM-HR-001',
    start_time: '2025-03-17T14:00:00',
    end_time: '2025-03-17T15:00:00',
    status: 'ACTIVE',
  },
  {
    id: 'PERM-003',
    person_id: 'PERSON-003',
    visitor_id: 'VISITOR-001',
    access_control_id: 'ROOM-HR-001',
    start_time: '2025-03-17T14:00:00',
    end_time: '2025-03-17T15:00:00',
    status: 'ACTIVE',
  },
]

export const qrs: QR[] = [
  {
    id: 'QR-001',
    permission_id: 'PERM-001',
    is_active: true,
    active_until: '2025-03-17T14:00:00',
    gate_number: 1,
  },
  {
    id: 'QR-002',
    permission_id: 'PERM-002',
    is_active: true,
    active_until: '2025-03-17T14:00:00',
    gate_number: 1,
  },
  {
    id: 'QR-003',
    permission_id: 'PERM-003',
    is_active: true,
    active_until: '2025-03-17T14:00:00',
    gate_number: 1,
  },
]

export const permissionCards: PermissionCard[] = [
  {
    id: 'CARD-001',
    permission_id: 'PERM-001',
    rfid_id: 'RFID-001',
  },
  {
    id: 'CARD-002',
    permission_id: 'PERM-002',
    rfid_id: 'RFID-002',
  },
  {
    id: 'CARD-003',
    permission_id: 'PERM-003',
    rfid_id: 'RFID-003',
  },
]
