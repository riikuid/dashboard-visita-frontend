import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Department } from '@/features/tickets/data/schema'
import { useAccessControls } from '../context/access-controls-context'
import { AccessControl, AccessControlFormData } from '../data/schema'
import { AccessControlsImportDialog } from './access-controls-import-dialog'
import { AccessControlsMutateDrawer } from './access-controls-mutate-drawer'

interface Props {
  saveAccessControl: (
    data: AccessControlFormData,
    accessControlId?: string
  ) => Promise<boolean>
  deleteAccessControl: (
    accessControlId: string,
    accessControlData: AccessControl
  ) => Promise<boolean>
  departments: Department[]
}

export function AccessControlsDialogs({
  saveAccessControl,
  deleteAccessControl,
  departments,
}: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useAccessControls()
  return (
    <>
      {/* Drawer untuk Create */}
      <AccessControlsMutateDrawer
        key='access-controls-create'
        open={open === 'create'}
        onOpenChange={(v) => setOpen(v ? 'create' : null)}
        saveAccessControl={saveAccessControl}
        departments={departments}
      />

      {/* Dialog untuk Import */}
      <AccessControlsImportDialog
        key='access-controls-import'
        open={open === 'import'}
        onOpenChange={(v) => setOpen(v ? 'import' : null)}
      />

      {currentRow && (
        <>
          {/* Drawer untuk Update */}
          <AccessControlsMutateDrawer
            key={`access-control-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={(v) => {
              setOpen(v ? 'update' : null)
              if (!v) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            currentRow={currentRow}
            saveAccessControl={saveAccessControl}
            departments={departments}
          />

          {/* Dialog untuk Delete */}
          <ConfirmDialog
            key='access-control-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={(v) => {
              setOpen(v ? 'delete' : null)
              if (!v) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            handleConfirm={async () => {
              const success = await deleteAccessControl(
                currentRow.id,
                currentRow
              )
              if (success) {
                setOpen(null)
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
                toast({
                  title: 'The following departnebt has been deleted:',
                  description: (
                    <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                      <code className='text-white'>
                        {JSON.stringify(currentRow.name, null, 2)}
                      </code>
                    </pre>
                  ),
                })
              }
            }}
            className='max-w-md'
            title={`Delete this access control device: ${currentRow.id}?`}
            desc={
              <>
                You are about to delete an access control device with the ID{' '}
                <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText='Delete'
          />
        </>
      )}
    </>
  )
}
