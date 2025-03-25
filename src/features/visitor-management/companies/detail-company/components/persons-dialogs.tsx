import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { usePersons } from '../context/persons-context'
import { PersonsImportDialog } from './persons-import-dialog'
import { PersonsMutateDrawer } from './persons-mutate-drawer'

interface Props {
  companyId: string
}

export function PersonsDialogs({ companyId }: Props) {
  const { open, setOpen, currentRow, setCurrentRow, deletePerson } =
    usePersons()

  const handleDelete = () => {
    if (currentRow) {
      deletePerson(currentRow.id)
      setOpen(null)
      setCurrentRow(null)
      toast({
        title: 'Person deleted successfully!',
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
      <PersonsMutateDrawer
        key='person-create'
        open={open === 'create'}
        onOpenChange={(v) => setOpen(v ? 'create' : null)}
        companyId={companyId}
        mode='create'
      />

      {/* Dialog untuk Import */}
      <PersonsImportDialog
        key='persons-import'
        open={open === 'import'}
        onOpenChange={(v) => setOpen(v ? 'import' : null)}
      />

      {currentRow && (
        <>
          {/* Drawer untuk Update */}
          <PersonsMutateDrawer
            key={`person-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={(v) => {
              setOpen(v ? 'update' : null)
              if (!v) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            companyId={companyId}
            currentRow={currentRow}
            mode='update'
          />

          {/* Dialog untuk Delete */}
          <ConfirmDialog
            key='person-delete'
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
            title={`Delete this person: ${currentRow.id}?`}
            desc={
              <>
                You are about to delete a person with the ID{' '}
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
