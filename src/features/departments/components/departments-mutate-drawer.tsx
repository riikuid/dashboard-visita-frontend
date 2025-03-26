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
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Department } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Department
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required.'),
  // address: z.string().min(1, 'Address is required.'),
})
type DepartmentsForm = z.infer<typeof formSchema>

export function DepartmentsMutateDrawer({
  open,
  onOpenChange,
  currentRow,
}: Props) {
  const isUpdate = !!currentRow

  const form = useForm<DepartmentsForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
      name: '',
      // address: '',
    },
  })

  const onSubmit = async (data: DepartmentsForm) => {
    try {
      const res = await fetch(
        isUpdate && currentRow
          ? `${import.meta.env.VITE_BACKEND_SERVER}/department/${currentRow.id}`
          : `${import.meta.env.VITE_BACKEND_SERVER}/department`,
        {
          method: isUpdate ? 'PUT' : 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        }
      )

      if (!res.ok) throw new Error('Failed request')

      toast({
        title: 'Success!',
        description: `Department ${isUpdate ? 'updated' : 'created'} successfully.`,
      })

      onOpenChange(false)
      form.reset()
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    } catch (error) {
      toast({
        title: 'Error!',
        description: 'Something went wrong while saving the department.',
      })
      // eslint-disable-next-line no-console
      console.error(error)
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
                    <Input {...field} placeholder='Enter a name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <SheetFooter className='gap-2'>
          <SheetClose asChild>
            <Button variant='outline'>Close</Button>
          </SheetClose>
          <Button form='departments-form' type='submit'>
            Save changes
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
