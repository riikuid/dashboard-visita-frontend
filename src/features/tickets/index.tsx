import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { TicketsDialogs } from './components/tickets-dialogs'
import { TicketsPrimaryButtons } from './components/tickets-primary-buttons'
import TicketsProvider from './context/tickets-context'
import { tickets } from './data/data'

export default function AccessControls() {
  return (
    <TicketsProvider>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-2 flex items-center justify-between space-y-2 flex-wrap gap-x-4'>
          <div>
            <h2 className='text-2xl font-bold tracking-tight'>Tickets</h2>
            <p className='text-muted-foreground'>Track your visitor tickets</p>
          </div>
          <TicketsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable data={tickets} columns={columns} />
        </div>
      </Main>
      <TicketsDialogs />
    </TicketsProvider>
  )
}
