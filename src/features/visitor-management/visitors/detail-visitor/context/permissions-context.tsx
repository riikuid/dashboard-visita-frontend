import React, { useState, useContext, createContext } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import {
  permissions as initialPermissions,
  persons as initialPersons,
} from '../../data/data'
import { Permission, Person } from '../../data/schema'

type PermissionsDialogType = 'create' | 'update' | 'delete' | 'import'

interface PermissionsContextType {
  open: PermissionsDialogType | null
  setOpen: (str: PermissionsDialogType | null) => void
  currentRow: Permission | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Permission | null>>
  permissions: Permission[]
  persons: Person[]
  addPermission: (permission: Permission) => void
  updatePermission: (permission: Permission) => void
  deletePermission: (id: string) => void
  addPerson: (person: Person) => void
}

const PermissionsContext = createContext<PermissionsContextType | null>(null)

interface Props {
  children: React.ReactNode
}

export default function PermissionsProvider({ children }: Props) {
  const [open, setOpen] = useDialogState<PermissionsDialogType>(null)
  const [currentRow, setCurrentRow] = useState<Permission | null>(null)
  const [permissions, setPermissions] =
    useState<Permission[]>(initialPermissions)
  const [persons, setPersons] = useState<Person[]>(initialPersons)

  const addPermission = (permission: Permission) => {
    setPermissions((prev) => [...prev, permission])
  }

  const updatePermission = (updatedPermission: Permission) => {
    setPermissions((prev) =>
      prev.map((perm) =>
        perm.id === updatedPermission.id ? updatedPermission : perm
      )
    )
  }

  const deletePermission = (id: string) => {
    setPermissions((prev) => prev.filter((perm) => perm.id !== id))
  }

  const addPerson = (person: Person) => {
    setPersons((prev) => [...prev, person])
  }

  return (
    <PermissionsContext.Provider
      value={{
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        permissions,
        persons,
        addPermission,
        updatePermission,
        deletePermission,
        addPerson,
      }}
    >
      {children}
    </PermissionsContext.Provider>
  )
}

export const usePermissions = () => {
  const permissionContext = useContext(PermissionsContext)

  if (!permissionContext) {
    throw new Error(
      'usePermissions has to be used within <PermissionsProvider>'
    )
  }

  return permissionContext
}
