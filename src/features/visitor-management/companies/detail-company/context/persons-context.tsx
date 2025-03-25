import React, { useState, useContext, createContext } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import { persons as initialPersons } from '../../data/data'
import { Person } from '../../data/schema'

type PersonsDialogType = 'create' | 'update' | 'delete' | 'import'

interface PersonsContextType {
  open: PersonsDialogType | null
  setOpen: (str: PersonsDialogType | null) => void
  currentRow: Person | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Person | null>>
  persons: Person[]
  addPerson: (person: Person) => void
  updatePerson: (person: Person) => void
  deletePerson: (id: string) => void
}

const PersonsContext = createContext<PersonsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function PersonsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<PersonsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Person | null>(null)
  const [persons, setPersons] = useState<Person[]>(initialPersons)

  const addPerson = (person: Person) => {
    setPersons((prev) => [...prev, person])
  }

  const updatePerson = (updatedPerson: Person) => {
    setPersons((prev) =>
      prev.map((perm) => (perm.id === updatedPerson.id ? updatedPerson : perm))
    )
  }

  const deletePerson = (id: string) => {
    setPersons((prev) => prev.filter((perm) => perm.id !== id))
  }

  return (
    <PersonsContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        persons,
        addPerson,
        updatePerson,
        deletePerson,
      }}
    >
      {children}
    </PersonsContext.Provider>
  )
}

export const usePersons = () => {
  const personContext = useContext(PersonsContext)

  if (!personContext) {
    throw new Error('usePersons has to be used within <PersonsProvider>')
  }

  return personContext
}
