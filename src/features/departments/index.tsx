import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { DepartmentsDialogs } from './components/departments-dialogs'
import { DepartmentsPrimaryButtons } from './components/departments-primary-buttons'
import DepartmentsProvider from './context/departments-context'
import { fetchDepartments } from './data/data'
// 🔄 Ubah dari 'departments' ke 'fetchDepartments'
import { Department } from './data/schema'

export default function Departments() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDepartments()
      .then((data) => {
        setDepartments(data)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <DepartmentsProvider>
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
            <h2 className='text-2xl font-bold tracking-tight'>Departments</h2>
            <p className='text-muted-foreground'>Here a List Department!</p>
          </div>
          <DepartmentsPrimaryButtons />
        </div>
        <div className='-mx-4 flex-1 overflow-auto px-4 py-1 lg:flex-row lg:space-x-12 lg:space-y-0'>
          {loading ? (
            <p>Loading departments...</p>
          ) : (
            <DataTable data={departments} columns={columns} />
          )}
        </div>
      </Main>

      <DepartmentsDialogs />
    </DepartmentsProvider>
  )
}
