import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { AccessControl } from '../data/schema'

type AccessControlsDialogType = 'create' | 'update' | 'delete' | 'import'

interface AccessControlsContextType {
  open: AccessControlsDialogType | null
  setOpen: (str: AccessControlsDialogType | null) => void
  currentRow: AccessControl | null
  setCurrentRow: React.Dispatch<React.SetStateAction<AccessControl | null>>
}

const AccessControlsContext =
  React.createContext<AccessControlsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function AccessControlsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<AccessControlsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<AccessControl | null>(null)
  return (
    <AccessControlsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </AccessControlsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAccessControls = () => {
  const cardsContext = React.useContext(AccessControlsContext)

  if (!cardsContext) {
    throw new Error(
      'useAccessControls has to be used within <AccessControlsContext>'
    )
  }

  return cardsContext
}
