import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { CardRfidDialogs } from './components/card-rfid-dialogs'
import { CardRfidPrimaryButtons } from './components/card-rfid-primary-buttons'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import CardRfidProvider from './context/card-rfid-context'
import { useCardsApi } from './hooks/use-cards-api'

export default function CardRfid() {
  const { loading, error, cards, saveCard, deleteCard } = useCardsApi()

  return (
    <CardRfidProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Cards</h2>
            <p className='text-muted-foreground'>
              Manage your cards for access control
            </p>
          </div>
          <CardRfidPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          <DataTable
            loading={loading}
            error={error}
            data={cards}
            columns={columns}
          />
        </div>
      </Main>

      <CardRfidDialogs saveCard={saveCard} deleteCard={deleteCard} />
    </CardRfidProvider>
  )
}
