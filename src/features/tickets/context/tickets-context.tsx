import React, { useState, createContext, useContext, ReactNode } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { tickets as initialTickets } from '../data/data'
import { Ticket } from '../data/schema'

type TicketsDialogType = 'export'

interface TicketsContextType {
  tickets: Ticket[]
  open: TicketsDialogType | null
  setOpen: (str: TicketsDialogType | null) => void
  currentRow: Ticket | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Ticket | null>>
}

const TicketsContext = createContext<TicketsContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export default function TicketsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<TicketsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Ticket | null>(null)
  const [tickets, setTickets] = useState<Ticket[]>(initialTickets)

  return (
    <TicketsContext.Provider
      value={{
        tickets,
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </TicketsContext.Provider>
  )
}

export const useTickets = () => {
  const ticketsContext = useContext(TicketsContext)

  if (!ticketsContext) {
    throw new Error('useTickets has to be used within <TicketsProvider>')
  }

  return ticketsContext
}
