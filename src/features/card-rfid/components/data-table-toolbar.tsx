import { Table } from '@tanstack/react-table'
import { Input } from '@/components/ui/input'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  setGlobalFilter: (value: string) => void
}

export function DataTableToolbar<TData>({
  table,
  setGlobalFilter,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 items-center space-x-2'>
        <Input
          placeholder='Search name or data...'
          value={table.getState().globalFilter ?? ''}
          onChange={(event) => {
            const value = event.target.value
            setGlobalFilter(value)
            table.setGlobalFilter(value)
          }}
          className='h-8 w-[150px] lg:w-[250px]'
        />
      </div>
    </div>
  )
}
