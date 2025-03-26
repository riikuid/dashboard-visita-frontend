import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDepartments } from '../context/departments-context'
import { DepartmentsImportDialog } from './departments-import-dialog'
import { DepartmentsMutateDrawer } from './departments-mutate-drawer'

export function DepartmentsDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useDepartments()
  return (
    <>
      <DepartmentsMutateDrawer
        key='department-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <DepartmentsImportDialog
        key='departments-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <DepartmentsMutateDrawer
            key={`department-update-${currentRow.id}`}
            open={open === 'update'}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='department-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={async () => {
              try {
                const res = await fetch(
                  `${import.meta.env.VITE_BACKEND_SERVER}/department/${currentRow.id}`,
                  {
                    method: 'DELETE',
                  }
                )

                if (!res.ok) {
                  throw new Error(
                    `Failed to delete department. Status: ${res.status}`
                  )
                }

                toast({
                  title: 'The following department has been deleted:',
                  description: (
                    <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                      <code className='text-white'>
                        {JSON.stringify(currentRow, null, 2)}
                      </code>
                    </pre>
                  ),
                })
                setTimeout(() => {
                  window.location.reload()
                }, 1000) // kasih delay dikit agar toast sempat terlihat
              } catch (error) {
                toast({
                  title: 'Error deleting department!',
                  description:
                    'An error occurred while deleting the department.',
                })
                // eslint-disable-next-line no-console
                console.error(error)
              } finally {
                setOpen(null)
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            className='max-w-md'
            title={`Delete this department: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a department with the ID{' '}
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
