import { IconPlus } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { useCompanies } from '../context/companies-context'

export function CompaniesPrimaryButtons() {
  const { setOpen } = useCompanies()
  return (
    <div className='flex gap-2'>
      <Button className='space-x-1' onClick={() => setOpen('create')}>
        <span>Create</span> <IconPlus size={18} />
      </Button>
    </div>
  )
}
