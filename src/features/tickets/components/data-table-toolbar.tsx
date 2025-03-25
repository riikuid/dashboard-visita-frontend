import { Cross2Icon } from '@radix-ui/react-icons'
import { Table } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTableViewOptions } from '@/features/tasks/components/data-table-view-options'
import { departments } from '../data/data'
import { DataTableFacetedFilter } from './data-table-faceted-filter'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0
  const statuses = [
    {
      value: 'created',
      label: 'Created',
    },
    {
      value: 'on going',
      label: 'On Going',
    },
    {
      value: 'end',
      label: 'End',
    },
  ]

  return (
    <div className='flex items-center justify-between'>
      <div className='flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2'>
        <Input
          placeholder='Search name user...'
          value={
            (table.getColumn('User Name')?.getFilterValue() as string) ?? ''
          }
          onChange={(event) =>
            table.getColumn('User Name')?.setFilterValue(event.target.value)
          }
          className='h-8 w-[150px] lg:w-[250px]'
        />
        {/* Filter untuk status */}
        {table.getColumn('status') && (
          <DataTableFacetedFilter
            column={table.getColumn('status')}
            title='Status'
            options={statuses}
          />
        )}
        {/* Filter untuk status */}
        {table.getColumn('Dept') && (
          <DataTableFacetedFilter
            column={table.getColumn('Dept')}
            title='Department'
            options={departments.map((dept) => ({
              label: dept.name,
              value: dept.name,
            }))}
          />
        )}

        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  )
}
