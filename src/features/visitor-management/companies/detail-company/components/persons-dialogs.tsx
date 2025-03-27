import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { Person, PersonFormData } from '../../data/schema'
import { usePersons } from '../context/persons-context'
import { PersonsMutateDrawer } from './persons-mutate-drawer'

interface Props {
  companyId: string
  savePerson: (data: PersonFormData, personId?: string) => Promise<boolean>

  deletePerson: (personId: string, personData: Person) => Promise<boolean>
}

export function PersonsDialogs({ companyId, savePerson, deletePerson }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = usePersons()

  return (
    <>
      {/* Drawer untuk Create */}
      <PersonsMutateDrawer
        key='person-create'
        open={open === 'create'}
        onOpenChange={(v) => setOpen(v ? 'create' : null)}
        companyId={companyId}
        savePerson={savePerson}
      />

      {/* Dialog untuk Import */}
      {/* <PersonsImportDialog
        key='persons-import'
        open={open === 'import'}
        onOpenChange={(v) => setOpen(v ? 'import' : null)}
      /> */}

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
            savePerson={savePerson}
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
            handleConfirm={async () => {
              const success = await deletePerson(currentRow.id, currentRow)
              if (success) {
                setOpen(null)
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
                toast({
                  title: 'The following company has been deleted:',
                  description: (
                    <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
                      <code className='text-white'>
                        {JSON.stringify(currentRow, null, 2)}
                      </code>
                    </pre>
                  ),
                })
              }
            }}
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
