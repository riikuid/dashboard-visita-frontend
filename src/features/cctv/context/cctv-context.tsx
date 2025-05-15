import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Department } from '../data/schema'

type DepartmentsDialogType = 'create' | 'update' | 'delete' | 'import'

interface DepartmentsContextType {
  open: DepartmentsDialogType | null
  setOpen: (str: DepartmentsDialogType | null) => void
  currentRow: Department | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Department | null>>
}

const DepartmentsContext = React.createContext<DepartmentsContextType | null>(
  null
)

interface Props {
  children: React.ReactNode
}

export default function DepartmentsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<DepartmentsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Department | null>(null)
  return (
    <DepartmentsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </DepartmentsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useDepartments = () => {
  const departmentsContext = React.useContext(DepartmentsContext)

  if (!departmentsContext) {
    throw new Error('useDepartments has to be used within <DepartmentsContext>')
  }

  return departmentsContext
}
