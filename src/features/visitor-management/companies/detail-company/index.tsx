import { useParams } from '@tanstack/react-router'
import { Button } from 'react-day-picker'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { companies, persons } from '../data/data'
import { Person } from '../data/schema'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { PersonsDialogs } from './components/persons-dialogs'
import { PersonsPrimaryButtons } from './components/persons-primary-buttons'
import PermissionsProvider from './context/persons-context'

// Komponen baru untuk menangani logika usePermissions
function CompanyDetailContentWithPersons({ companyId }: { companyId: string }) {
  const company = companies.find((v) => v.id === companyId)
  if (!company) {
    return <div>Company not found</div>
  }
  const member = persons.filter((p: Person) => p.company_id === companyId)

  return (
    <>
      <div className='mb-2 space-y-2'>
        <div className='flex space-x-4'>
          <h2 className='text-2xl font-bold tracking-tight'>{company.name}</h2>
          <Badge variant='outline' className='mt-2'>
            Total Visit: {company.visit_count} times
          </Badge>
        </div>
        <p className='text-muted-foreground'>{company.address}</p>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1'></div>
      <div className='mb-2 mt-10 flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold tracking-tight'>Persons</h2>
          <p className='text-muted-foreground'>
            Information about persons in the company
          </p>
        </div>
        <PersonsPrimaryButtons />
      </div>
      <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
        <DataTable data={member} columns={columns} />
      </div>

      {/* Gunakan PersonsDialogs untuk semua dialog/drawer */}
      <PersonsDialogs companyId={companyId} />
    </>
  )
}

export default function VisitorDetail() {
  const { companyId } = useParams({
    from: '/_authenticated/visitor-management/companies/$companyId',
  })

  return (
    <PermissionsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <CompanyDetailContentWithPersons companyId={companyId} />
      </Main>
    </PermissionsProvider>
  )
}
