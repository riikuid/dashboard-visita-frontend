"use client"

import type React from "react"
import { useState, createContext, useContext, type ReactNode } from "react"
import useDialogState from "@/hooks/use-dialog-state"
import { cardRfids as initialCardRfids } from "../data/data"
import type { CardRfid } from "../data/schema"

type CardRfidDialogType = "create" | "update" | "delete" | "import"

interface CardRfidContextType {
  cardRfids: CardRfid[]
  addCardRfid: (cardRfid: CardRfid) => void
  updateCardRfid: (cardRfid: CardRfid) => void
  deleteCardRfid: (id: string) => void
  open: CardRfidDialogType | null
  setOpen: (str: CardRfidDialogType | null) => void
  currentRow: CardRfid | null
  setCurrentRow: React.Dispatch<React.SetStateAction<CardRfid | null>>
}

const CardRfidContext = createContext<CardRfidContextType | undefined>(undefined)

interface Props {
  children: ReactNode
}

export default function CardRfidProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<CardRfidDialogType>(null)
  const [currentRow, setCurrentRow] = useState<CardRfid | null>(null)
  const [cardRfids, setCardRfids] = useState<CardRfid[]>(initialCardRfids)

  const addCardRfid = (cardRfid: CardRfid) => {
    setCardRfids((prev) => [...prev, cardRfid])
  }

  const updateCardRfid = (updatedCardRfid: CardRfid) => {
    setCardRfids((prev) => prev.map((card) => (card.id === updatedCardRfid.id ? updatedCardRfid : card)))
  }

  const deleteCardRfid = (id: string) => {
    setCardRfids((prev) => prev.filter((card) => card.id !== id))
  }

  return (
    <CardRfidContext.Provider
      value={{
        cardRfids,
        addCardRfid,
        updateCardRfid,
        deleteCardRfid,
        open,
        setOpen,
        currentRow,
        setCurrentRow,
      }}
    >
      {children}
    </CardRfidContext.Provider>
  )
}

export const useCardRfid = () => {
  const cardRfidContext = useContext(CardRfidContext)

  if (!cardRfidContext) {
    throw new Error("useCardRfid has to be used within <CardRfidProvider>")
  }

  return cardRfidContext
}

