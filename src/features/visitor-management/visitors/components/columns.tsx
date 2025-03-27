import { ColumnDef } from '@tanstack/react-table'
import { IconComponents } from '@tabler/icons-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Company, Person } from '../../companies/data/schema'
import { visitorStatuses } from '../data/data'
import { Visitor } from '../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

const statuses = visitorStatuses

export const columns = (
  companies: Company[],
  persons: Person[]
): ColumnDef<Visitor>[] => [
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
    id: 'Company',
    accessorKey: 'company_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Company' />
    ),
    cell: ({ row, column }) => {
      const company = companies.find((c) => c.id === row.getValue(column.id))
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {company ? company.name : 'Unknown'}
        </div>
      )
    },
    filterFn: (row, id, filterValue) => {
      const company = companies.find((c) => c.id === row.getValue(id))
      const companyName = company ? company.name.toLowerCase() : ''
      return companyName.includes((filterValue as string).toLowerCase())
    },
  },
  {
    id: 'Leader',
    accessorKey: 'leader_id',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Leader' />
    ),
    cell: ({ row, column }) => {
      const leader = persons.find((p) => p.id === row.getValue(column.id))
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {leader ? leader.name : 'Unknown'}
        </div>
      )
    },
  },
  {
    id: 'PIC Name',
    accessorKey: 'pic_name',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='PIC' />
    ),
    cell: ({ row, column }) => (
      <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue(column.id)}
      </div>
    ),
  },
  {
    id: 'Department',
    accessorKey: 'pic_department',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Dept' />
    ),
    cell: ({ row, column }) => (
      <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue(column.id)}
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
          {IconComponent && (
            <IconComponents className='mr-2 h-4 w-4 text-muted-foreground' />
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
    id: 'Arrival Date',
    accessorKey: 'arrival_date',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title={column.id} />
    ),
    cell: ({ row, column }) => (
      <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
        {row.getValue(column.id)}
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
