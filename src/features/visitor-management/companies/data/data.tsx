import { Company, Person } from './schema'

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
