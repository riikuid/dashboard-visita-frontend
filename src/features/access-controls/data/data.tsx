import { AccessControl, Department } from './schema'

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

export const accessControls: AccessControl[] = [
  {
    id: 'AC-001',
    roomName: 'Meeting Room A',
    department_id: 'DEPT-001',
    ipAddress: '192.168.1.101',
    username: 'admin',
    password: 'password123',
    status: 'ACTIVE',
    checked_at: new Date('2025-03-24T23:25:00'), // 35 menit yang lalu
  },
  {
    id: 'AC-002',
    roomName: 'Meeting Room B',
    department_id: 'DEPT-001',
    ipAddress: '192.168.1.102',
    username: 'admin',
    password: 'password123',
    status: 'ACTIVE',
    checked_at: new Date('2025-03-24T22:00:00'), // 2 jam yang lalu
  },
  {
    id: 'AC-003',
    roomName: 'Server Room',
    department_id: 'DEPT-002',
    ipAddress: '192.168.1.103',
    username: 'admin',
    password: 'password123',
    status: 'INACTIVE',
    checked_at: new Date('2025-03-24T19:00:00'), // 5 jam yang lalu
  },
  {
    id: 'AC-004',
    roomName: 'IT Lab',
    department_id: 'DEPT-002',
    ipAddress: '192.168.1.104',
    username: 'admin',
    password: 'password123',
    status: 'ACTIVE',
    checked_at: new Date('2025-03-23T23:00:00'), // 1 hari yang lalu
  },
  {
    id: 'AC-005',
    roomName: 'Finance Office',
    department_id: 'DEPT-003',
    ipAddress: '192.168.1.105',
    username: 'admin',
    password: 'password123',
    status: 'ACTIVE',
    checked_at: new Date('2025-03-22T15:30:00'), // 2 hari yang lalu
  },
  {
    id: 'AC-006',
    roomName: 'Archive Room',
    department_id: 'DEPT-003',
    ipAddress: '192.168.1.106',
    username: 'admin',
    password: 'password123',
    status: 'INACTIVE',
    checked_at: new Date('2025-03-21T10:00:00'), // 3 hari yang lalu
  },
]
