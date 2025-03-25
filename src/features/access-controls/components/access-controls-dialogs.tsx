import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useAccessControls } from '../context/access-controls-context'
import { AccessControlsImportDialog } from './access-controls-import-dialog'
import { AccessControlsMutateDrawer } from './access-controls-mutate-drawer'

export function AccessControlsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, deleteAccessControl } =
    useAccessControls()

  const handleDelete = () => {
    if (currentRow) {
      deleteAccessControl(currentRow.id)
      setOpen(null)
      setCurrentRow(null)
      toast({
        title: 'Access Control deleted successfully!',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>
              {JSON.stringify(currentRow, null, 2)}
            </code>
          </pre>
        ),
      })
    }
  }

  return (
    <>
      {/* Drawer untuk Create */}
      <AccessControlsMutateDrawer
        key='access-controls-create'
        open={open === 'create'}
        onOpenChange={(v) => setOpen(v ? 'create' : null)}
        mode='create'
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
            mode='update'
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
            handleConfirm={handleDelete}
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
