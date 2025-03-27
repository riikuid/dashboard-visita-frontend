import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useCompanies } from '../context/companies-context'
import { Company, CompanyFormData } from '../data/schema'
import { CompaniesMutateDrawer } from './companies-mutate-drawer'

interface Props {
  saveCompany: (data: CompanyFormData, companyId?: string) => Promise<boolean>

  deleteCompany: (companyId: string, companyData: Company) => Promise<boolean>
}

export function CompaniesDialogs({ saveCompany, deleteCompany }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useCompanies()
  return (
    <>
      <CompaniesMutateDrawer
        saveCompany={saveCompany}
        key='company-create'
        open={open === 'create'}
        onOpenChange={() => setOpen('create')}
      />

      {currentRow && (
        <>
          <CompaniesMutateDrawer
            saveCompany={saveCompany}
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
            handleConfirm={async () => {
              const success = await deleteCompany(currentRow.id, currentRow)
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
