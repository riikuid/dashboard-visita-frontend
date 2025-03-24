import { useParams } from '@tanstack/react-router'
import { toast } from '@/hooks/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { visitors } from '../data/data'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { PermissionMutateDrawer } from './components/permission-mutate-drawer'
import { PermissionsPrimaryButtons } from './components/permission-primary-buttons'
import { VisitorDetailContent } from './components/visitor-detail-content'
import PermissionsProvider, {
  usePermissions,
} from './context/permissions-context'

// Komponen baru untuk menangani logika usePermissions
function VisitorDetailContentWithPermissions({
  visitorId,
}: {
  visitorId: string
}) {
  const { permissions, open, setOpen, currentRow, deletePermission } =
    usePermissions()

  const visitorPermissions = permissions.filter(
    (perm) => perm.visitor_id === visitorId
  )

  const visitor = visitors.find((v) => v.id === visitorId)
  if (!visitor) {
    return <div>Visitor not found</div>
  }

  const handleDelete = () => {
    if (currentRow) {
      deletePermission(currentRow.id)
      setOpen(null)
      toast({
        title: 'Permission deleted successfully!',
        description: `Permission for ${currentRow.id} has been deleted.`,
      })
    }
  }

  return (
    <>
      <div className='mb-2'>
        <h2 className='text-2xl font-bold tracking-tight'>Visitor Details</h2>
        <p className='text-muted-foreground'>
          Detailed information about the visitor
        </p>
      </div>

      <div className='-mx-4 flex-1 overflow-auto px-4 py-1'>
        <VisitorDetailContent visitorId={visitorId} />
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
        <DataTable data={visitorPermissions} columns={columns} />
      </div>

      {/* Drawer untuk Create */}
      <PermissionMutateDrawer
        open={open === 'create'}
        onOpenChange={(v) => setOpen(v ? 'create' : null)}
        visitor={visitor}
        mode='create'
      />

      {/* Drawer untuk Update */}
      <PermissionMutateDrawer
        open={open === 'update'}
        onOpenChange={(v) => setOpen(v ? 'update' : null)}
        visitor={visitor}
        mode='update'
      />

      {/* Dialog Konfirmasi untuk Delete */}
      <AlertDialog
        open={open === 'delete'}
        onOpenChange={(v) => setOpen(v ? 'delete' : null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              permission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default function VisitorDetail() {
  const { visitorId } = useParams({
    from: '/_authenticated/visitor-management/visitors/$visitorId',
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
        <VisitorDetailContentWithPermissions visitorId={visitorId} />
      </Main>
    </PermissionsProvider>
  )
}
