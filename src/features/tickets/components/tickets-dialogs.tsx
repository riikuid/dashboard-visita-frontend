import { useTickets } from '../context/tickets-context'
import { TicketsExportDialog } from './tickets-export-dialog'

export function TicketsDialogs() {
  const { open, setOpen } = useTickets()

  return (
    <>
      {/* Drawer untuk Create */}

      {/* Dialog untuk Import */}
      <TicketsExportDialog
        key='access-controls-import'
        open={open === 'export'}
        onOpenChange={(v) => setOpen(v ? 'export' : null)}
      />
    </>
  )
}
