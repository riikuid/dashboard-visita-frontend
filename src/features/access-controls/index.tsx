import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { AccessControlsDialogs } from './components/access-controls-dialogs'
import { AccessControlsPrimaryButtons } from './components/access-controls-primary-buttons'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import AccessControlsProvider from './context/access-controls-context'
import { accessControls } from './data/data'

export default function AccessControls() {
  return (
    <AccessControlsProvider>
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
              AccessControls
            </h2>
            <p className='text-muted-foreground'>Here a List Department!</p>
          </div>
          <AccessControlsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={accessControls} columns={columns} />
        </div>
      </Main>

      <AccessControlsDialogs />
    </AccessControlsProvider>
  )
}
