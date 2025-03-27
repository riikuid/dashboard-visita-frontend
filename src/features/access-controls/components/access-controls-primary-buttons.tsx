import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useAccessControls } from '../context/access-controls-context'

export function AccessControlsPrimaryButtons() {
  const { setOpen } = useAccessControls()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}
