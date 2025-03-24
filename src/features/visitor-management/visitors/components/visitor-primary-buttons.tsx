import { IconDownload, IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useVisitor } from '../context/visitor-context'

export function VisitorPrimaryButtons() {
  const { setOpen } = useVisitor()
  return (
    <div className='flex gap-2'>
      <Button
        variant='outline'
        className='space-x-1'
        onClick={() => setOpen('import')}
      >
        <span>Scan Visitor QR</span> <IconDownload size={18} />
      </Button>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <IconPlus size={18} /> <span>Add Visitor</span>
      </Button>
    </div>
  )
}
