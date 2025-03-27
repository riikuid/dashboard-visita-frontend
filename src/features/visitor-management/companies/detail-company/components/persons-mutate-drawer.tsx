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
import { Person, personFormData, PersonFormData } from '../../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  companyId: string
  currentRow?: Person
  savePerson: (data: PersonFormData, personId?: string) => Promise<boolean>
}

export function PersonsMutateDrawer({
  open,
  onOpenChange,
  companyId,
  currentRow,
  savePerson,
}: Props) {
  const isUpdate = !!currentRow
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PersonFormData>({
    resolver: zodResolver(personFormData),
    defaultValues: currentRow ?? {
      name: '',
      phone: '',
      company_id: companyId,
    },
  })

  const onSubmit = async (data: PersonFormData) => {
    setIsSubmitting(true)
    try {
      const success = await savePerson(data, currentRow?.id)
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
        if (!v) {
          form.reset()
        }
      }}
    >
      <SheetContent className='flex flex-col p-0'>
        <SheetHeader className='text-left'>
          <SheetTitle className='p-4'>
            {isUpdate ? 'Edit Person' : 'Add Person'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            id='person-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex-1 px-4'
          >
            {/* Name Field */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter Person Name'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter Person Phone'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NIK Field (Opsional) */}
            {/* <FormField
              control={form.control}
              name='nik'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>NIK (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter Person NIK'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            /> */}

            {/* Company ID Field (Hidden) */}
            <FormField
              control={form.control}
              name='company_id'
              render={({ field }) => (
                <FormItem className='hidden'>
                  <FormControl>
                    <Input {...field} type='hidden' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <div className='flex justify-end gap-2 p-4'>
          <SheetClose asChild>
            <Button variant='outline' disabled={isSubmitting}>
              Cancel
            </Button>
          </SheetClose>
          <Button
            form='person-form'
            type='submit'
            className='relative'
            disabled={isSubmitting}
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
            {isUpdate ? 'Update Person' : 'Add Person'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
