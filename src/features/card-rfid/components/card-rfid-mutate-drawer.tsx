'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  cardFormDataSchema,
  type Card,
  type CardFormData,
} from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Card

  saveCard: (data: CardFormData, cardtId?: string) => Promise<boolean>
}

export function CardRfidMutateDrawer({
  open,
  onOpenChange,
  currentRow,
  saveCard,
}: Props) {
  const isUpdate = !!currentRow
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<CardFormData>({
    resolver: zodResolver(cardFormDataSchema),
    defaultValues: currentRow ?? {
      name: '',
      data: '',
    },
  })

  const onSubmit = async (data: CardFormData) => {
    setIsSubmitting(true)
    try {
      const success = await saveCard(data, currentRow?.id)
      if (success) {
        onOpenChange(false)
        form.reset()
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        form.reset()
      }}
    >
      <SheetContent className='flex flex-col p-0'>
        <SheetHeader className='text-left'>
          <SheetTitle className='p-4'>
            {isUpdate ? 'Edit RFID Card' : 'Add RFID Card'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            id='card-rfid-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex-1 px-4 overflow-y-auto'
          >
            {/* Card ID Field - Read Only for Update */}

            {/* Card Data Field */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Card Data</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter Card Data (Hex)' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Card Data Field */}
            <FormField
              control={form.control}
              name='data'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Card Data</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter Card Data (Hex)' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className='flex justify-end gap-2 p-4'>
          <SheetClose asChild>
            <Button variant='outline'>Cancel</Button>
          </SheetClose>
          <Button
            form='card-rfid-form'
            type='submit'
            // className='bg-purple-600 hover:bg-purple-700'
          >
            {isSubmitting && (
              <span className='absolute left-3'>
                <svg
                  className='animate-spin h-5 w-5 text-white'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
              </span>
            )}
            {isUpdate ? 'Update Card' : 'Add Card'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
