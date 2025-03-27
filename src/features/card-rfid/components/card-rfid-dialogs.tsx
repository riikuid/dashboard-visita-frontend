import { toast } from '@/hooks/use-toast'
import { ConfirmDialog } from '@/components/confirm-dialog'
import { useCards } from '../context/card-rfid-context'
import { Card, CardFormData } from '../data/schema'
import { CardRfidImportDialog } from './card-rfid-import-dialog'
import { CardRfidMutateDrawer } from './card-rfid-mutate-drawer'

interface Props {
  saveCard: (data: CardFormData, cardId?: string) => Promise<boolean>
  deleteCard: (cardId: string, cardData: Card) => Promise<boolean>
}

export function CardRfidDialogs({ saveCard, deleteCard }: Props) {
  const { open, setOpen, currentRow, setCurrentRow } = useCards()

  return (
    <>
      {/* Drawer untuk Create */}
      <CardRfidMutateDrawer
        key='card-rfid-create'
        open={open === 'create'}
        onOpenChange={(v) => setOpen(v ? 'create' : null)}
        saveCard={saveCard}
      />

      {/* Dialog untuk Import */}
      <CardRfidImportDialog
        key='card-rfid-import'
        open={open === 'import'}
        onOpenChange={(v) => setOpen(v ? 'import' : null)}
      />

      {currentRow && (
        <>
          {/* Drawer untuk Update */}
          <CardRfidMutateDrawer
            key={`card-rfid-update-${currentRow.id}`}
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
            saveCard={saveCard}
          />

          {/* Dialog untuk Delete */}
          <ConfirmDialog
            key='card-rfid-delete'
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
              const success = await deleteCard(currentRow.id, currentRow)
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
            title={`Delete this RFID card: ${currentRow.data}?`}
            desc={
              <>
                You are about to delete an Card with the ID{' '}
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
