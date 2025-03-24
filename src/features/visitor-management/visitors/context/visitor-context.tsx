import React, { createContext, useContext, useState } from 'react'
import useDialogState from '@/hooks/use-dialog-state'
import {
  visitors as initialVisitors,
  qrs as initialQRs,
  permissionCards as initialPermissionCards,
  companies as initialCompanies,
  persons as initialPersons,
} from '../data/data'
import { Visitor, QR, PermissionCard, Company, Person } from '../data/schema'

// Definisikan tipe untuk dialog
type VisitorDialogType = 'create' | 'update' | 'delete' | 'import'

// Definisikan tipe untuk context
interface VisitorContextType {
  visitors: Visitor[]
  qrs: QR[]
  permissionCards: PermissionCard[]
  open: VisitorDialogType | null
  setOpen: (str: VisitorDialogType | null) => void
  currentRow: Visitor | null
  setCurrentRow: React.Dispatch<React.SetStateAction<Visitor | null>>
  addVisitor: (visitor: Visitor) => void
  updateVisitor: (id: string, updatedVisitor: Partial<Visitor>) => void
  generateQR: (permissionId: string) => void
  updateQRStatus: (qrId: string, isActive: boolean) => void
  assignRFID: (permissionId: string, rfidId: string) => void
  reactivateQR: (qrId: string) => void
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

  // State untuk data utama
  const [visitors, setVisitors] = useState<Visitor[]>(initialVisitors)
  const [qrs, setQRs] = useState<QR[]>(initialQRs)
  const [permissionCards, setPermissionCards] = useState<PermissionCard[]>(
    initialPermissionCards
  )

  const [companies, setCompanies] = useState<Company[]>(initialCompanies)
  const [persons, setPersons] = useState<Person[]>(initialPersons)

  // Fungsi untuk menambah visitor
  const addVisitor = (visitor: Visitor) => {
    setVisitors([...visitors, visitor])
  }

  // Fungsi untuk memperbarui visitor
  const updateVisitor = (id: string, updatedVisitor: Partial<Visitor>) => {
    setVisitors(
      visitors.map((visitor) =>
        visitor.id === id ? { ...visitor, ...updatedVisitor } : visitor
      )
    )
  }

  // Fungsi untuk generate QR
  const generateQR = (permissionId: string) => {
    const newQR: QR = {
      id: `QR-${permissionId}`,
      permission_id: permissionId,
      is_active: true,
      active_until: '2025-03-17T14:00:00', // Ganti dengan logika waktu yang sesuai
      gate_number: 1,
    }
    setQRs([...qrs, newQR])
  }

  // Fungsi untuk update status QR
  const updateQRStatus = (qrId: string, isActive: boolean) => {
    setQRs(
      qrs.map((qr) => (qr.id === qrId ? { ...qr, is_active: isActive } : qr))
    )
  }

  // Fungsi untuk assign RFID
  const assignRFID = (permissionId: string, rfidId: string) => {
    const newCard: PermissionCard = {
      id: `CARD-${permissionId}`,
      permission_id: permissionId,
      rfid_id: rfidId,
    }
    setPermissionCards([...permissionCards, newCard])
  }

  // Fungsi untuk reactivate QR
  const reactivateQR = (qrId: string) => {
    setQRs(qrs.map((qr) => (qr.id === qrId ? { ...qr, is_active: true } : qr)))
  }

  return (
    <VisitorContext.Provider
      value={{
        visitors,
        companies,
        persons,
        qrs,
        permissionCards,
        open,
        setOpen,
        currentRow,
        setCurrentRow,
        addVisitor,
        updateVisitor,
        generateQR,
        updateQRStatus,
        assignRFID,
        reactivateQR,
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
