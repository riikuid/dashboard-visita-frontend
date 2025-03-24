import { ColumnDef } from '@tanstack/react-table'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// Impor ColumnDef untuk mendefinisikan kolom
import { Checkbox } from '@/components/ui/checkbox'
// Impor Checkbox
import {
  companies,
  persons,
  visitors,
  permissions,
  qrs,
  permissionCards,
} from '../../data/data'
import {
  Person,
  Company,
  Visitor,
  Permission,
  QR,
  PermissionCard,
} from '../../data/schema'
import { DataTable } from './data-table'

interface VisitorDetailContentProps {
  visitorId: string
}

// Definisikan kolom untuk DataTable
const columns: ColumnDef<Permission>[] = [
  {
    id: 'select',
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const person = persons.find((p) => p.id === row.original.person_id)
      return <div>{person?.name || 'N/A'}</div>
    },
  },
  {
    accessorKey: 'access_control_id',
    header: 'Room',
  },
  {
    accessorKey: 'start_time',
    header: 'Start Time',
  },
  {
    accessorKey: 'end_time',
    header: 'End Time',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge
      // variant={row.original.status === 'ACTIVE' ? 'default' : 'secondary'}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    id: 'actions',
    header: '',
    cell: () => <div></div>, // Placeholder untuk kolom aksi (bisa ditambahkan tombol nanti)
  },
]

export function VisitorDetailContent({ visitorId }: VisitorDetailContentProps) {
  const visitor = visitors.find((v) => v.id === visitorId)
  if (!visitor) {
    return <div>Visitor not found</div>
  }

  const company = companies.find((c) => c.id === visitor.company_id)
  const leader = persons.find((p) => p.id === visitor.leader_id)
  const visitorPermissions = permissions.filter(
    (p) => p.visitor_id === visitorId
  )
  const visitorQRs = qrs.filter((qr) =>
    visitorPermissions.some((p) => p.id === qr.permission_id)
  )
  const visitorCards = permissionCards.filter((card) =>
    visitorPermissions.some((p) => p.id === card.permission_id)
  )

  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Visitor Information</CardTitle>
        </CardHeader>
        <CardContent className='grid gap-4'>
          <div className='grid grid-cols-2 gap-4'>
            <div>
              <p className='text-sm font-medium'>Company</p>
              <p className='text-sm text-muted-foreground'>
                {company?.name || 'N/A'}
              </p>
            </div>
            <div>
              <p className='text-sm font-medium'>Leader</p>
              <p className='text-sm text-muted-foreground'>
                {leader?.name || 'N/A'}
              </p>
            </div>
            <div>
              <p className='text-sm font-medium'>PIC Name</p>
              <p className='text-sm text-muted-foreground'>
                {visitor.pic_name}
              </p>
            </div>
            <div>
              <p className='text-sm font-medium'>Department</p>
              <p className='text-sm text-muted-foreground'>
                {visitor.pic_department}
              </p>
            </div>
            <div>
              <p className='text-sm font-medium'>Arrival Date</p>
              <p className='text-sm text-muted-foreground'>
                {visitor.arrival_date}
              </p>
            </div>
            <div>
              <p className='text-sm font-medium'>Status</p>
              <Badge
                variant={
                  visitor.status === 'ON_VISIT' ? 'default' : 'secondary'
                }
              >
                {visitor.status}
              </Badge>
            </div>
          </div>
          <div>
            <p className='text-sm font-medium'>Purpose</p>
            <p className='text-sm text-muted-foreground'>{visitor.necessary}</p>
          </div>
          {visitor.note && (
            <div>
              <p className='text-sm font-medium'>Notes</p>
              <p className='text-sm text-muted-foreground'>{visitor.note}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
