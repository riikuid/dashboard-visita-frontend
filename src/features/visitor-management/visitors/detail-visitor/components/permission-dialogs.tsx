import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { AccessControl } from '@/features/access-controls/data/schema'
import {
  Person,
  PersonFormData,
} from '@/features/visitor-management/companies/data/schema'
import {
  Permission,
  PermissionAccessControlFormData,
  PermissionFormData,
  Visitor,
} from '../../data/schema'
import { usePermissions } from '../context/permissions-context'
import { PermissionMutateDrawer } from './permission-mutate-drawer'

interface Props {
  persons: Person[]
  visitor: Visitor
  accessControls: AccessControl[]
  savePerson: (
    data: PersonFormData,
    personId?: string
  ) => Promise<Person | boolean>
  savePermission: (
    permissionData: PermissionFormData,
    permissionAccessControlData: PermissionAccessControlFormData,
    permissionId?: string
  ) => Promise<boolean>

  deletePermission: (
    permissionId: string,
    permissionData: Permission
  ) => Promise<boolean>
}

export function PermissionDialogs({
  visitor,
  accessControls,
  persons,
  savePerson,
  savePermission,
  deletePermission,
}: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = usePermissions()
  return (
    <>
      <PermissionMutateDrawer
        accessControls={accessControls}
        visitor={visitor}
        persons={persons}
        onOpenChange={() => setOpen('create')}
        key='permission-create'
        open={open === 'create'}
        savePerson={savePerson}
        savePermission={savePermission}
      />

      {currentRow && (
        <>
          <PermissionMutateDrawer
            key={`task-update-${currentRow.id}`}
            open={open === 'update'}
            accessControls={accessControls}
            visitor={visitor}
            persons={persons}
            savePermission={savePermission}
            savePerson={savePerson}
            onOpenChange={() => {
              setOpen('update')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            currentRow={currentRow}
          />

          <ConfirmDialog
            key='task-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={async () => {
              const success = await deletePermission(currentRow.id, currentRow)
              if (success) {
                setOpen(null)
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
                // toast({
                //   title: 'The following visitor has been deleted:',
                //   description: (
                //     <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                //       <code className='text-white'>
                //         {JSON.stringify(currentRow, null, 2)}
                //       </code>
                //     </pre>
                //   ),
                // })
              }
            }}
            className='max-w-md'
            title={`Delete this task: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a task with the ID{' '}
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
