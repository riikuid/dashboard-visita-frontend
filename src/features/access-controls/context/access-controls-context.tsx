import React, { useState, createContext, useContext, ReactNode } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { accessControls as initialAccessControls } from '../data/data'
import { AccessControl } from '../data/schema'

type AccessControlsDialogType = 'create' | 'update' | 'delete' | 'import'

interface AccessControlsContextType {
  accessControls: AccessControl[]
  addAccessControl: (accessControl: AccessControl) => void
  updateAccessControl: (accessControl: AccessControl) => void
  deleteAccessControl: (id: string) => void
  open: AccessControlsDialogType | null
  setOpen: (str: AccessControlsDialogType | null) => void
  currentRow: AccessControl | null
  setCurrentRow: React.Dispatch<React.SetStateAction<AccessControl | null>>
}

const AccessControlsContext = createContext<
  AccessControlsContextType | undefined
>(undefined)

interface Props {
  children: ReactNode
}

export default function AccessControlsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<AccessControlsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<AccessControl | null>(null)
  const [accessControls, setAccessControls] = useState<AccessControl[]>(
    initialAccessControls
  )

  const addAccessControl = (accessControl: AccessControl) => {
    setAccessControls((prev) => [...prev, accessControl])
  }

  const updateAccessControl = (updatedAccessControl: AccessControl) => {
    setAccessControls((prev) =>
      prev.map((ac) =>
        ac.id === updatedAccessControl.id ? updatedAccessControl : ac
      )
    )
  }

  const deleteAccessControl = (id: string) => {
    setAccessControls((prev) => prev.filter((ac) => ac.id !== id))
  }

  return (
    <AccessControlsContext.Provider
      value={{
        accessControls,
        addAccessControl,
        updateAccessControl,
        deleteAccessControl,
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </AccessControlsContext.Provider>
  )
}

export const useAccessControls = () => {
  const accessControlsContext = useContext(AccessControlsContext)

  if (!accessControlsContext) {
    throw new Error(
      'useAccessControls has to be used within <AccessControlsProvider>'
    )
  }

  return accessControlsContext
}
