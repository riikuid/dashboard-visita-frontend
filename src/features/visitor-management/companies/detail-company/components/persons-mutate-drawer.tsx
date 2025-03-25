import { useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@/hooks/use-toast'
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
import { Person } from '../../data/schema'
import { usePersons } from '../context/persons-context'

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  phone: z.string().min(1, 'Phone is required.'),
  nik: z.string().optional(),
})

type PersonForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  companyId: string
  mode?: 'create' | 'update'
  currentRow?: Person
}

export function PersonsMutateDrawer({
  open,
  onOpenChange,
  companyId,
  mode = 'create',
  currentRow,
}: Props) {
  const isUpdate = mode === 'update'
  const { addPerson, updatePerson, setOpen: setContextOpen } = usePersons()

  const form = useForm<PersonForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          name: currentRow.name,
          phone: currentRow.phone,
          nik: currentRow.nik || '',
        }
      : {
          name: '',
          phone: '',
          nik: '',
        },
  })

  useEffect(() => {
    if (isUpdate && currentRow) {
      form.reset({
        name: currentRow.name,
        phone: currentRow.phone,
        nik: currentRow.nik || '',
      })
    } else {
      form.reset({
        name: '',
        phone: '',
        nik: '',
      })
    }
  }, [currentRow, isUpdate, form])

  const onSubmit = (data: PersonForm) => {
    if (mode === 'create') {
      const newPerson: Person = {
        id: `PERSON-${Date.now()}`,
        company_id: companyId,
        name: data.name,
        phone: data.phone,
        nik: data.nik || '',
        visit_count: 0,
      }
      addPerson(newPerson)
      toast({
        title: 'Person added successfully!',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    } else if (mode === 'update' && currentRow) {
      const updatedPerson: Person = {
        ...currentRow,
        name: data.name,
        phone: data.phone,
        nik: data.nik || '',
      }
      updatePerson(updatedPerson)
      toast({
        title: 'Person updated successfully!',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
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
                    <Input {...field} placeholder='Enter Person Name' />
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
                    <Input {...field} placeholder='Enter Person Phone' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* NIK Field (Opsional) */}
            <FormField
              control={form.control}
              name='nik'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>NIK (Optional)</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter Person NIK' />
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
            form='person-form'
            type='submit'
            className='bg-purple-600 hover:bg-purple-700'
          >
            {isUpdate ? 'Update Person' : 'Add Person'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
