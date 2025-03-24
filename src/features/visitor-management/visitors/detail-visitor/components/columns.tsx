import { ComponentType } from 'react'
import { ColumnDef } from '@tanstack/react-table'
import { IconCircle } from '@tabler/icons-react'
import { Checkbox } from '@/components/ui/checkbox'
import { permissionStatuses } from '../../data/data'
import { persons, accessControls } from '../../data/data'
import { Permission, Person, AccessControl } from '../../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

const statuses = permissionStatuses

export const columns: ColumnDef<Permission>[] = [
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
    id: 'Name',
    accessorKey: 'person_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Name' />
    ),
    cell: ({ row, column }) => {
      const person = persons.find(
        (person: Person) => person.id === row.getValue(column.id)
      )
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {person ? person.name : 'Unknown'}
        </div>
      )
    },
    filterFn: (row, id, filterValue) => {
      const person = persons.find(
        (person: Person) => person.id === row.getValue(id)
      )
      const personName = person ? person.name.toLowerCase() : ''
      return personName.includes((filterValue as string).toLowerCase())
    },
  },
  {
    id: 'access_control_id',
    accessorKey: 'access_control_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Room Access' />
    ),
    cell: ({ row, column }) => {
      const room = accessControls.find(
        (ac: AccessControl) => ac.id === row.getValue(column.id)
      )
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {room ? room.roomName : 'Unknown'}
        </div>
      )
    },
    filterFn: (row, id, filterValue) => {
      const room = accessControls.find(
        (ac: AccessControl) => ac.id === row.getValue(id)
      )
      const roomName = room ? room.roomName.toLowerCase() : ''
      return roomName.includes((filterValue as string).toLowerCase())
    },
  },
  {
    accessorKey: 'start_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start Time' />
    ),
    cell: ({ row }) => (
      <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('start_time')}
      </div>
    ),
  },
  {
    accessorKey: 'end_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='End Time' />
    ),
    cell: ({ row }) => (
      <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue('end_time')}
      </div>
    ),
  },
  {
    accessorKey: 'status',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Status' />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue('status')
      )
      if (!status) {
        return null
      }
      const IconComponent = status.icon
      return (
        <div className='flex w-[100px] items-center'>
          {IconComponent ? (
            <IconComponent className='mr-2 h-4 w-4 text-muted-foreground' />
          ) : (
            <IconCircle className='mr-2 h-4 w-4 text-muted-foreground' />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return (value as string[]).includes(row.getValue(id))
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
