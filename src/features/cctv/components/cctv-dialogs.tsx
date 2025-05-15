import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useDepartments } from '../context/cctv-context'
import { Department, DepartmentFormData } from '../data/schema'
import { DepartmentsMutateDrawer } from './cctv-mutate-drawer'

interface Props {
  saveDepartment: (
    data: DepartmentFormData,
    departmentId?: string
  ) => Promise<boolean>

  deleteDepartment: (
    departmentId: string,
    departmentData: Department
  ) => Promise<boolean>
}

export function DepartmentsDialogs({
  saveDepartment,
  deleteDepartment,
}: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useDepartments()
  return (
    <>
      <DepartmentsMutateDrawer
        saveDepartment={saveDepartment}
        key='department-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <DepartmentsMutateDrawer
            saveDepartment={saveDepartment}
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
              const success = await deleteDepartment(currentRow.id, currentRow)
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
