import { useState } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { IconPlugConnectedX, IconWorld } from '@tabler/icons-react'
import { IconPlugConnected } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Department } from '@/features/departments/data/schema'
import { AccessControl } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns = (
  departments: Department[],
  onCheckConnection?: (id: string) => void
): ColumnDef<AccessControl>[] => [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && 'indeterminate')
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
        className='translate-y-[2px]'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
        className='translate-y-[2px]'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='ID' />
    ),
    cell: ({ row }) => <div className='max-w-[80px]'>{row.getValue('id')}</div>,
  },
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row }) => (
      <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('name')}
      </div>
    ),
  },
  {
    accessorKey: 'location',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Location' />
    ),
    cell: ({ row }) => (
      <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('location')}
      </div>
    ),
  },
  {
    accessorKey: 'department_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Department' />
    ),
    cell: ({ row, column }) => {
      const dept = departments.find((d) => d.id === row.getValue(column.id))
      if (!dept) {
        return '-'
      }
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {dept.name}
        </div>
      )
    },
  },
  {
    accessorKey: 'is_active',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant='outline'>
          <div className='flex font-medium items-center'>
            {row.getValue('is_active') === false ? (
              <IconPlugConnectedX className='mr-2 h-3 w-3 text-red-500 dark:text-red-400' />
            ) : (
              <IconWorld className='mr-2 h-3 w-3 text-green-500 dark:text-green-400' />
            )}
            <span>
              {row.getValue('is_active') === false ? 'Disconnect' : 'Connect'}
            </span>
          </div>
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const [isChecking, setIsChecking] = useState(false)

      return (
        <div className='flex items-center gap-2'>
          <Button
            variant='outline'
            size='sm'
            disabled={isChecking}
            onClick={async () => {
              console.log('COK Connection clicked for ID:', row.original.id)
              setIsChecking(true)
              try {
                await onCheckConnection?.(row.original.id)
              } finally {
                setIsChecking(false)
              }
            }}
            aria-label='Check connection'
          >
            {isChecking ? (
              <svg
                className='animate-spin h-4 w-4 mr-2'
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
              >
                <circle
                  className='opacity-25'
                  cx='12'
                  cy='12'
                  r='10'
                  stroke='currentColor'
                  strokeWidth='4'
                />
                <path
                  className='opacity-75'
                  fill='currentColor'
                  d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                />
              </svg>
            ) : (
              <IconPlugConnected className='mr-2 h-4 w-4' />
            )}
            Check
          </Button>
          <DataTableRowActions row={row} />
        </div>
      )
    },
  },
]
