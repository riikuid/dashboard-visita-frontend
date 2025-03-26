import { useState } from 'react'
import { z } from 'zod'
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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Department, DepartmentFormData } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Department
  saveDepartment: (
    data: DepartmentFormData,
    departmentId?: string
  ) => Promise<boolean>
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
})
type DepartmentsForm = z.infer<typeof formSchema>

export function DepartmentsMutateDrawer({
  open,
  onOpenChange,
  currentRow,
  saveDepartment,
}: Props) {
  const isUpdate = !!currentRow
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<DepartmentsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      name: '',
    },
  })

  const onSubmit = async (data: DepartmentsForm) => {
    setIsSubmitting(true)
    try {
      const success = await saveDepartment(data, currentRow?.id)
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
      <SheetContent className='flex flex-col'>
        <SheetHeader className='text-left'>
          <SheetTitle>{isUpdate ? 'Update' : 'Create'} Department</SheetTitle>
          <SheetDescription>
            {isUpdate
              ? 'Update the department by providing necessary info.'
              : 'Add a new department by providing necessary info.'}
          </SheetDescription>
        </SheetHeader>
        <Form {...form}>
          <form
            id='departments-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex-1'
          >
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Department Name</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Enter a name'
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline' disabled={isSubmitting}>
              Close
            </Button>
          </SheetClose>
          <Button
            form='departments-form'
            type='submit'
            disabled={isSubmitting}
            className='relative'
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
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
