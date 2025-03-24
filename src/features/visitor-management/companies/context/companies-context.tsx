import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Company } from '../data/schema'

type CompaniesDialogType = 'create' | 'update' | 'delete' | 'import'

interface CompaniesContextType {
  open: CompaniesDialogType | null
  setOpen: (str: CompaniesDialogType | null) => void
  currentRow: Company | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Company | null>>
}

const CompaniesContext = React.createContext<CompaniesContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function CompaniesProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CompaniesDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Company | null>(null)
  return (
    <CompaniesContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CompaniesContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCompanies = () => {
  const companiesContext = React.useContext(CompaniesContext)

  if (!companiesContext) {
    throw new Error('useCompanies has to be used within <CompaniesContext>')
  }

  return companiesContext
}
