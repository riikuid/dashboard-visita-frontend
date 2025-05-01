import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import {
  Company,
  CompanyFormData,
  Person,
  PersonFormData,
} from '../../companies/data/schema'
import { useVisitor } from '../context/visitor-context'
import { Visitor, VisitorFormData } from '../data/schema'
import { VisitorImportDialog } from './visitor-import-dialog'
import { VisitorMutateDrawer } from './visitor-mutate-drawer'

interface Props {
  companies: Company[]
  persons: Person[]
  saveCompany: (
    data: CompanyFormData,
    companyId?: string
  ) => Promise<boolean | Company | null>
  savePerson: (
    data: PersonFormData,
    personId?: string
  ) => Promise<boolean | Person | null>
  saveVisitor: (data: VisitorFormData, visitorId?: string) => Promise<boolean>

  deleteVisitor: (visitorId: string, visitorData: Visitor) => Promise<boolean>
}

export function VisitorDialogs({
  companies,
  persons,
  saveCompany,
  savePerson,
  saveVisitor,
  deleteVisitor,
}: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useVisitor()
  return (
    <>
      <VisitorMutateDrawer
        companies={companies}
        persons={persons}
        onOpenChange={() => setOpen('create')}
        key='visitor-create'
        open={open === 'create'}
        saveCompany={saveCompany}
        savePerson={savePerson}
        saveVisitor={saveVisitor}
      />

      <VisitorImportDialog
        key='tasks-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <VisitorMutateDrawer
            key={`task-update-${currentRow.id}`}
            open={open === 'update'}
            companies={companies}
            persons={persons}
            saveVisitor={saveVisitor}
            saveCompany={saveCompany}
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
              const success = await deleteVisitor(currentRow.id, currentRow)
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
