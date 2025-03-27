import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { CompaniesDialogs } from './components/companies-dialogs'
import { CompaniesPrimaryButtons } from './components/companies-primary-buttons'
import { DataTable } from './components/data-table'
import CompaniesProvider from './context/companies-context'
import { useCompaniesApi } from './hooks/use-companies-api'

export default function Companies() {
  const { loading, error, companies, saveCompany, deleteCompany } =
    useCompaniesApi()

  return (
    <CompaniesProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Companies</h2>
            <p className='text-muted-foreground'>
              Here a List Company Visitor!
            </p>
          </div>
          <CompaniesPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            data={companies}
            columns={columns}
            loading={loading}
            error={error}
          />
        </div>
      </Main>

      <CompaniesDialogs
        saveCompany={saveCompany}
        deleteCompany={deleteCompany}
      />
    </CompaniesProvider>
  )
}
