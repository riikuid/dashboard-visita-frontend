import { format } from 'date-fns'
import { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { AccessControl } from '@/features/access-controls/data/schema'
// Untuk format tanggal
import { Permission } from '../../data/schema'
import { DataTableColumnHeader } from './data-table-column-header'
import { DataTableRowActions } from './data-table-row-actions'

// Definisikan statuses untuk kolom status
// const statuses = [
//   { value: 'ACTIVE', label: 'Active', icon: IconCircle },
//   { value: 'INACTIVE', label: 'Inactive', icon: IconCircle },
//   { value: 'EXPIRED', label: 'Expired', icon: IconCircle },
// ] as const;

export const columns = (
  accessControls: AccessControl[]
): ColumnDef<Permission>[] => [
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
    cell: ({ row }) => {
      const permission = row.original as Permission // Ambil data permission langsung
      const person = permission.person // Data person sudah ada di permission
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {person ? person.name : 'Unknown'}
        </div>
      )
    },
    filterFn: (row, id, filterValue) => {
      const permission = row.original as Permission
      const personName = permission.person?.name.toLowerCase() || ''
      return personName.includes((filterValue as string).toLowerCase())
    },
  },
  {
    id: 'access_control_id',
    accessorKey: 'permission_access_controls', // Ubah accessorKey ke permission_access_controls
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Room Access' />
    ),
    cell: ({ row }) => {
      const permission = row.original as Permission
      const permissionAccessControls =
        permission.permission_access_controls || []

      // Ambil semua access_control_id dari permission_access_controls
      const accessControlIds = permissionAccessControls.map(
        (pac) => pac.access_control_id
      )

      // Cocokkan setiap access_control_id dengan accessControls untuk mendapatkan nama
      const accessControlNames = accessControlIds
        .map((id) => {
          const accessControl = accessControls.find((ac) => ac.id === id)
          return accessControl ? accessControl.name : null
        })
        .filter((name) => name !== null) // Filter out null values

      // Tampilkan nama-nama access control, dipisahkan oleh koma
      const displayText =
        accessControlNames.length > 0 ? accessControlNames.join(', ') : 'N/A'

      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {displayText}
        </div>
      )
    },
  },
  {
    accessorKey: 'start_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Start Time' />
    ),
    cell: ({ row }) => {
      const startTime = row.getValue('start_time') as string
      const formattedTime = startTime
        ? // ? format(new Date(startTime), 'dd MMM yyyy HH:mm')
          format(new Date(startTime), 'HH:mm')
        : 'N/A'
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {formattedTime}
        </div>
      )
    },
  },
  {
    accessorKey: 'end_time',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='End Time' />
    ),
    cell: ({ row }) => {
      const endTime = row.getValue('end_time') as string
      const formattedTime = endTime
        ? // ? format(new Date(endTime), 'dd MMM yyyy HH:mm')
          format(new Date(endTime), 'HH:mm')
        : 'N/A'
      return (
        <div className='max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]'>
          {formattedTime}
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
        <div className='flex w-[100px] items-center'>
          {row.getValue('status')}
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
