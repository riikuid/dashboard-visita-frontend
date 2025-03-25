import { IconUpload } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useTickets } from '../context/tickets-context'

export function TicketsPrimaryButtons() {
  const { setOpen } = useTickets()
  return (
    <div className='flex gap-2'>
      <Button
        variant={'outline'}
        className='space-x-1'
        onClick={() => setOpen('export')}
      >
        <span>Export</span> <IconUpload size={18} />
      </Button>
    </div>
  )
}
