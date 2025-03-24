import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useCompanies } from '../context/companies-context'
import { CompaniesImportDialog } from './companies-import-dialog'
import { CompaniesMutateDrawer } from './companies-mutate-drawer'

export function CompaniesDialogs() {
  const { open, setOpen, currentRow, setCurrentRow } = useCompanies()
  return (
    <>
      <CompaniesMutateDrawer
        key='company-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      <CompaniesImportDialog
        key='companies-import'
        open={open === 'import'}
        onOpenChange={() => setOpen('import')}
      />

      {currentRow && (
        <>
          <CompaniesMutateDrawer
            key={`company-update-${currentRow.id}`}
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
            key='company-delete'
            destructive
            open={open === 'delete'}
            onOpenChange={() => {
              setOpen('delete')
              setTimeout(() => {
                setCurrentRow(null)
              }, 500)
            }}
            handleConfirm={() => {
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
            }}
            className='max-w-md'
            title={`Delete this company: ${currentRow.id} ?`}
            desc={
              <>
                You are about to delete a company with the ID{' '}
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
