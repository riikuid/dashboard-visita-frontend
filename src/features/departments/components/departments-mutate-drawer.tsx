import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
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
  Department,
  departmentFormData,
  DepartmentFormData,
} from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Department
  saveDepartment: (
    data: DepartmentFormData,
    departmentId?: string
  ) => Promise<boolean>
}

export function DepartmentsMutateDrawer({
  open,
  onOpenChange,
  currentRow,
  saveDepartment,
}: Props) {
  const isUpdate = !!currentRow
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<DepartmentFormData>({
    resolver: zodResolver(departmentFormData),
    defaultValues: currentRow ?? {
      name: '',
    },
  })

  const onSubmit = async (data: DepartmentFormData) => {
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
    <Dialog
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) form.reset()
      }}
    >
      <DialogContent className='sm:max-w-md'>
        <DialogHeader className='text-left'>
          <DialogTitle>{isUpdate ? 'Update' : 'Create'} Department</DialogTitle>
          <DialogDescription>
            {isUpdate
              ? 'Update the department by providing necessary info.'
              : 'Add a new department by providing necessary info.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            id='departments-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5'
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

        <DialogFooter className='gap-2'>
          <DialogClose asChild>
            <Button variant='outline' disabled={isSubmitting}>
              Close
            </Button>
          </DialogClose>
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
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
