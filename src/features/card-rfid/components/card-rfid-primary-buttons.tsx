"use client"

import { IconDownload, IconPlus } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { useCardRfid } from "../context/card-rfid-context"

export function CardRfidPrimaryButtons() {
  const { setOpen } = useCardRfid()
  return (
    <div className="flex gap-2">
      <Button className="space-x-1" onClick={() => setOpen("create")}>
        <span>Create</span> <IconPlus size={18} />
      </Button>
      <Button variant="outline" className="space-x-1" onClick={() => setOpen("import")}>
        <span>Import</span> <IconDownload size={18} />
      </Button>
    </div>
  )
}

