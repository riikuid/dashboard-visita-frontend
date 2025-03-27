import React, { useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { Card } from '../data/schema'

type CardsDialogType = 'create' | 'update' | 'delete' | 'import'

interface CardsContextType {
  open: CardsDialogType | null
  setOpen: (str: CardsDialogType | null) => void
  currentRow: Card | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Card | null>>
}

const CardsContext = React.createContext<CardsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function CardsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CardsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Card | null>(null)
  return (
    <CardsContext value={{ open, setOpen, currentRow, setCurrentRow }}>
      {children}
    </CardsContext>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useCards = () => {
  const cardsContext = React.useContext(CardsContext)

  if (!cardsContext) {
    throw new Error('useCards has to be used within <CardsContext>')
  }

  return cardsContext
}
