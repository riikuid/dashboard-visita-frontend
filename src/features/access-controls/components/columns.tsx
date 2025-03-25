import { ColumnDef } from '@tanstack/react-table'
import { IconPlugConnectedX, IconWorld } from '@tabler/icons-react'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { departments } from '../data/data'
import { AccessControl } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

export const columns: ColumnDef<AccessControl>[] = [
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
    accessorKey: 'roomName',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Room Name' />
    ),
    cell: ({ row }) => (
      <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('roomName')}
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
          {dept ? dept.name : 'Unknown'}
        </div>
      )
    },
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      return (
        <Badge variant='outline'>
          <div className='flex font-medium items-center'>
            {row.getValue('status') === 'INACTIVE' ? (
              <IconPlugConnectedX className='mr-2 h-3 w-3 text-red-500 dark:text-red-400' />
            ) : (
              <IconWorld className='mr-2 h-3 w-3 text-green-500 dark:text-green-400' />
            )}
            <span>{row.getValue('status')}</span>
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
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
