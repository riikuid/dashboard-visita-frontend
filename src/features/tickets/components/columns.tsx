import { format } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { IconPlayerRecordFilled } from '@tabler/icons-react'
import { id } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { departments, users } from '../data/data'
import { Ticket } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'

// Impor locale Indonesia

export const columns: ColumnDef<Ticket>[] = [
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
    id: 'Ticket ID',
    accessorKey: 'id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Ticket ID' />
    ),
    cell: ({ row, column }) => (
      <div className='max-w-[80px]'>{row.getValue(column.id)}</div>
    ),
  },
  {
    id: 'User Name',
    accessorKey: 'userId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='User' />
    ),
    cell: ({ row, column }) => {
      const user = users.find((user) => user.id === row.getValue(column.id))
      if (!user) {
        return (
          <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            -
          </div>
        )
      }
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {user.name}
        </div>
      )
    },
    filterFn: (row, id, filterValue) => {
      const user = users.find((user) => user.id === row.getValue(id))
      const userName = user ? user.name.toLowerCase() : ''
      return userName.includes((filterValue as string).toLowerCase())
    },
  },
  {
    id: 'Dept',
    accessorKey: 'userId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dept' />
    ),
    cell: ({ row, column }) => {
      const user = users.find((user) => user.id === row.getValue(column.id))
      if (!user) {
        return (
          <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            -
          </div>
        )
      }
      const dept = departments.find((dept) => dept.id === user.departmentId)
      if (!dept) {
        return (
          <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            -
          </div>
        )
      }
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {dept.name}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const user = users.find((user) => user.id === row.getValue(id))
      if (!user) return false
      const dept = departments.find((dept) => dept.id === user.departmentId)
      const deptName = dept ? dept.name : ''
      return (value as string[]).includes(deptName) // Sesuaikan dengan array nilai
    },
  },
  {
    id: 'Visitor ID',
    accessorKey: 'visitorId',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Visitor ID' />
    ),
    cell: ({ row, column }) => {
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {row.getValue(column.id)}
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
            {row.getValue('status') === 'created' ? (
              <IconPlayerRecordFilled className='mr-2 h-3 w-3 text-yellow-500 dark:text-yellow-400' />
            ) : row.getValue('status') === 'on going' ? (
              <IconPlayerRecordFilled className='mr-2 h-3 w-3 text-green-500 dark:text-green-400' />
            ) : (
              <IconPlayerRecordFilled className='mr-2 h-3 w-3 text-red-500 dark:text-red-400' />
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
    accessorKey: 'createdAt',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Created At' />
    ),
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt') as string
      if (!createdAt) {
        return (
          <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
            -
          </div>
        )
      }
      const date = new Date(createdAt)
      const formattedDate = format(date, 'dd MMMM yyyy, HH:mm', { locale: id })
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {formattedDate}
        </div>
      )
    },
    enableSorting: true, // Aktifkan sorting untuk kolom ini
  },
]
