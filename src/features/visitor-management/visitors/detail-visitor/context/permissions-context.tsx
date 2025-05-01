import React, { createContext, useContext, useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Permission } from '../../data/schema'

// Definisikan tipe untuk dialog
type PermissionsDialogType = 'create' | 'update' | 'delete' | 'import'

// Definisikan tipe untuk context
interface PermissionsContextType {
  open: PermissionsDialogType | null
  setOpen: (str: PermissionsDialogType | null) => void
  currentRow: Permission | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Permission | null>>
}

// Buat context
const PermissionsContext = createContext<PermissionsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function PermissionsProvider({ children }: Props) {
  // State untuk dialog
  const [open, setOpen] = useDialogState<PermissionsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Permission | null>(null)

  return (
    <PermissionsContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  )
}

export const usePermissions = () => {
  const permissionsContext = useContext(PermissionsContext)

  if (!permissionsContext) {
    throw new Error(
      'usePermissions has to be used within <PermissionsProvider>'
    )
  }

  return permissionsContext
}
