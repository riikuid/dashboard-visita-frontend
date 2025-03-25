"use client"

import { useEffect } from "react"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetClose, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { useCardRfid } from "../context/card-rfid-context"
import type { CardRfid } from "../data/schema"

const formSchema = z.object({
  id: z.string().optional(),
  cardData: z.string().min(1, "Card data is required"),
  status: z.enum(["ACTIVE", "INACTIVE"]),
})

type CardRfidForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: CardRfid
  mode?: "create" | "update"
}

export function CardRfidMutateDrawer({ open, onOpenChange, currentRow, mode = "create" }: Props) {
  const isUpdate = mode === "update"
  const { addCardRfid, updateCardRfid, setOpen: setContextOpen } = useCardRfid()

  const form = useForm<CardRfidForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          id: currentRow.id,
          cardData: currentRow.cardData,
          status: currentRow.status,
        }
      : {
          cardData: "",
          status: "ACTIVE",
        },
  })

  useEffect(() => {
    if (isUpdate && currentRow) {
      form.reset({
        id: currentRow.id,
        cardData: currentRow.cardData,
        status: currentRow.status,
      })
    } else {
      form.reset({
        cardData: "",
        status: "ACTIVE",
      })
    }
  }, [currentRow, isUpdate, form])

  const onSubmit = (data: CardRfidForm) => {
    if (mode === "create") {
      const newCardRfid: CardRfid = {
        id: `CARD-${Date.now().toString().slice(-6)}`,
        cardData: data.cardData,
        status: data.status,
      }
      addCardRfid(newCardRfid)
      toast({
        title: "RFID Card added successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    } else if (mode === "update" && currentRow) {
      const updatedCardRfid: CardRfid = {
        ...currentRow,
        cardData: data.cardData,
        status: data.status,
      }
      updateCardRfid(updatedCardRfid)
      toast({
        title: "RFID Card updated successfully!",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    }
    onOpenChange(false)
    setContextOpen(null)
    form.reset()
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) {
          form.reset()
        }
      }}
    >
      <SheetContent className="flex flex-col p-0">
        <SheetHeader className="text-left">
          <SheetTitle className="p-4">{isUpdate ? "Edit RFID Card" : "Add RFID Card"}</SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            id="card-rfid-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 flex-1 px-4 overflow-y-auto"
          >
            {/* Card ID Field - Read Only for Update */}
            {isUpdate && (
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="space-y-1">
                    <FormLabel>Card ID</FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {/* Card Data Field */}
            <FormField
              control={form.control}
              name="cardData"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Card Data</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Card Data (Hex)" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status Field */}
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormLabel>Status</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className="flex justify-end gap-2 p-4">
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button form="card-rfid-form" type="submit" className="bg-purple-600 hover:bg-purple-700">
            {isUpdate ? "Update RFID Card" : "Add RFID Card"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

