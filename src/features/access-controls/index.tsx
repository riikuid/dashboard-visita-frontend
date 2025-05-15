import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useDepartmentApi } from '../departments/hooks/use-department-api'
import { AccessControlsDialogs } from './components/access-controls-dialogs'
import { AccessControlsPrimaryButtons } from './components/access-controls-primary-buttons'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import AccessControlsProvider from './context/access-controls-context'
import { useAccessControlApi } from './hooks/use-access-control-api'

export default function AccessControls() {
  const {
    loading,
    error,
    accessControls,
    saveAccessControl,
    deleteAccessControl,
    checkConnection,
  } = useAccessControlApi()

  const { departments } = useDepartmentApi()

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
              Access Controls
            </h2>
            <p className='text-muted-foreground'>
              Manage your access control device here
            </p>
          </div>
          <AccessControlsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            loading={loading}
            error={error}
            data={accessControls}
            columns={columns(departments, checkConnection)}
            onCheckConnection={checkConnection}
          />
        </div>
      </Main>

      <AccessControlsDialogs
        saveAccessControl={saveAccessControl}
        deleteAccessControl={deleteAccessControl}
        departments={departments}
      />
    </AccessControlsProvider>
  )
}
