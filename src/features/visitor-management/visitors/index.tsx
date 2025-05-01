import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { usePersonsApi } from '../companies/detail-company/hooks/use-persons-api'
import { useCompaniesApi } from '../companies/hooks/use-companies-api'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { VisitorDialogs } from './components/visitor-dialogs'
import { VisitorPrimaryButtons } from './components/visitor-primary-buttons'
import VisitorProvider from './context/visitor-context'
import { useVisitorsApi } from './hooks/use-visitors-api'

export default function Visitors() {
  const { visitors, saveVisitor, deleteVisitor, error, loading } =
    useVisitorsApi()
  const { companies, saveVisitorCompany } = useCompaniesApi()
  const { persons, saveVisitorPerson } = usePersonsApi()

  return (
    <VisitorProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Visitors</h2>
            <p className='text-muted-foreground'>Here a List Visitors!</p>
          </div>
          <VisitorPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            columns={columns(companies, persons)}
            data={visitors}
            error={error}
            loading={loading}
          />
        </div>
      </Main>

      <VisitorDialogs
        companies={companies}
        persons={persons}
        saveVisitor={saveVisitor}
        saveCompany={saveVisitorCompany}
        savePerson={saveVisitorPerson}
        deleteVisitor={deleteVisitor}
      />
    </VisitorProvider>
  )
}
