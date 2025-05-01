import { useParams } from '@tanstack/react-router'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { useAccessControlApi } from '@/features/access-controls/hooks/use-access-control-api'
import { usePersonsApi } from '../../companies/detail-company/hooks/use-persons-api'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { PermissionDialogs } from './components/permission-dialogs'
import { PermissionsPrimaryButtons } from './components/permission-primary-buttons'
import PermissionsProvider from './context/permissions-context'
import { usePermissionsApi } from './hooks/use-permissions-api'

export default function VisitorDetail() {
  const { visitorId } = useParams({
    from: '/_authenticated/visitor-management/visitors/$visitorId',
  })

  const {
    savePermission,
    deletePermission,
    permissions,
    loading,
    error,
    visitor,
  } = usePermissionsApi(visitorId)
  const { accessControls } = useAccessControlApi()
  const { persons, savePerson } = usePersonsApi()

  const leader = persons.find((per) => per.id == visitor?.leader_id)
  const visitorPersons = persons.filter(
    (per) => per.company_id === visitor?.company_id
  )

  return (
    <PermissionsProvider>
      <Header fixed>
        ,
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='space-y-6'>
          <div className='mb-2'>
            <h2 className='text-2xl font-bold tracking-tight'>
              Visitor Details
            </h2>
            <p className='text-muted-foreground'>
              Detailed information about the visitor
            </p>
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
            <Card>
              <CardHeader>
                <CardTitle>Visitor Information</CardTitle>
              </CardHeader>
              <CardContent className='grid gap-4'>
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <p className='text-sm font-medium'>Company</p>
                    <p className='text-sm text-muted-foreground'>
                      {visitor?.company?.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Leader</p>
                    <p className='text-sm text-muted-foreground'>
                      {leader?.name || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>PIC Name</p>
                    <p className='text-sm text-muted-foreground'>
                      {visitor?.pic_name}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Department</p>
                    <p className='text-sm text-muted-foreground'>
                      {visitor?.pic_department}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Arrival Date</p>
                    <p className='text-sm text-muted-foreground'>
                      {visitor?.arrival_date}
                    </p>
                  </div>
                  <div>
                    <p className='text-sm font-medium'>Status</p>
                    <Badge variant={'outline'}>{visitor?.status}</Badge>
                  </div>
                </div>
                <div>
                  <p className='text-sm font-medium'>Purpose</p>
                  <p className='text-sm text-muted-foreground'>
                    {visitor?.necessary}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className='mb-2 mt-10 flex items-center justify-between'>
            <div>
              <h2 className='text-2xl font-bold tracking-tight'>
                Access Permissions
              </h2>
              <p className='text-muted-foreground'>
                Detailed information about the visitor
              </p>
            </div>
            <PermissionsPrimaryButtons />
          </div>
          <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
            {visitor && (
              <DataTable
                data={permissions}
                columns={columns(accessControls)}
                loading={loading}
                error={error}
              />
            )}
          </div>
        </div>
      </Main>

      <PermissionDialogs
        savePerson={savePerson}
        deletePermission={deletePermission}
        visitor={visitor!}
        persons={visitorPersons}
        savePermission={savePermission}
        accessControls={accessControls}
      />
    </PermissionsProvider>
  )
}
