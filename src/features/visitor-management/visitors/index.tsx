import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { VisitorDialogs } from './components/visitor-dialogs'
import { VisitorPrimaryButtons } from './components/visitor-primary-buttons'
import TasksProvider from './context/visitor-context'
import { visitors } from './data/data'

export default function VisitorManagement() {
  return (
    <TasksProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>
              Visitor Management
            </h2>
            <p className='text-muted-foreground'>
              Track Appointments, Access, and Activity
            </p>
          </div>
          <VisitorPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={visitors} columns={columns} />
        </div>
      </Main>

      <VisitorDialogs />
    </TasksProvider>
  )
}
