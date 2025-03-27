import React, { createContext, useContext, useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Visitor } from '../data/schema'

// Definisikan tipe untuk dialog
type VisitorDialogType = 'create' | 'update' | 'delete' | 'import'

// Definisikan tipe untuk context
interface VisitorContextType {
  open: VisitorDialogType | null
  setOpen: (str: VisitorDialogType | null) => void
  currentRow: Visitor | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Visitor | null>>
}

// Buat context
const VisitorContext = createContext<VisitorContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function VisitorProvider({ children }: Props) {
  // State untuk dialog
  const [open, setOpen] = useDialogState<VisitorDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Visitor | null>(null)

  return (
    <VisitorContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </VisitorContext.Provider>
  )
}

export const useVisitor = () => {
  const visitorContext = useContext(VisitorContext)

  if (!visitorContext) {
    throw new Error('useVisitor has to be used within <VisitorProvider>')
  }

  return visitorContext
}
