import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { usePermissions } from '../context/permissions-context'

export function PermissionsPrimaryButtons() {
  const { setOpen } = usePermissions()

  const handleOpenCreate = () => {
    console.log('Opening create drawer')
    setOpen('create')
  }

  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={handleOpenCreate}>
        <IconPlus size={18} /> <span>Add Permission</span>
      </Button>
    </div>
  )
}
