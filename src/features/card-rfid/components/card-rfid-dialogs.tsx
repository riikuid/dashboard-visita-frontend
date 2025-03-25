import { toast } from "@/hooks/use-toast"
import { ConfirmDialog } from "@/components/confirm-dialog"
import { useCardRfid } from "../context/card-rfid-context"
import { CardRfidImportDialog } from "./card-rfid-import-dialog"
import { CardRfidMutateDrawer } from "./card-rfid-mutate-drawer"

export function CardRfidDialogs() {
  const { open, setOpen, currentRow, setCurrentRow, deleteCardRfid } = useCardRfid()

  const handleDelete = () => {
    if (currentRow) {
      deleteCardRfid(currentRow.id)
      setOpen(null)
      setCurrentRow(null)
      toast({
        title: "RFID Card deleted successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(currentRow, null, 2)}</code>
          </pre>
        ),
      })
    }
  }

  return (
    <>
      {/* Drawer untuk Create */}
      <CardRfidMutateDrawer
        key="card-rfid-create"
        open={open === "create"}
        onOpenChange={(v) => setOpen(v ? "create" : null)}
        mode="create"
      />

      {/* Dialog untuk Import */}
      <CardRfidImportDialog
        key="card-rfid-import"
        open={open === "import"}
        onOpenChange={(v) => setOpen(v ? "import" : null)}
      />

      {currentRow && (
        <>
          {/* Drawer untuk Update */}
          <CardRfidMutateDrawer
            key={`card-rfid-update-${currentRow.id}`}
            open={open === "update"}
            onOpenChange={(v) => {
              setOpen(v ? "update" : null)
              if (!v) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            currentRow={currentRow}
            mode="update"
          />

          {/* Dialog untuk Delete */}
          <ConfirmDialog
            key="card-rfid-delete"
            destructive
            open={open === "delete"}
            onOpenChange={(v) => {
              setOpen(v ? "delete" : null)
              if (!v) {
                setTimeout(() => {
                  setCurrentRow(null)
                }, 500)
              }
            }}
            handleConfirm={handleDelete}
            className="max-w-md"
            title={`Delete this RFID card: ${currentRow.cardNumber}?`}
            desc={
              <>
                You are about to delete an RFID card with the ID <strong>{currentRow.id}</strong>. <br />
                This action cannot be undone.
              </>
            }
            confirmText="Delete"
          />
        </>
      )}
    </>
  )
}

