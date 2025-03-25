import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { usePersons } from '../context/persons-context'

export function PersonsPrimaryButtons() {
  const { setOpen } = usePersons()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <IconPlus size={18} /> <span>Add Person</span>
      </Button>
    </div>
  )
}
