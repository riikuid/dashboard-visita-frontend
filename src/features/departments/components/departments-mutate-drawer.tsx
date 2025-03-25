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
  address: z.string().min(1, 'Address is required.'),
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
      address: '',
    },
  })

  const onSubmit = (data: DepartmentsForm) => {
    // do something with the form data
    onOpenChange(false)
    form.reset()
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
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
              ? 'Update the epartment by providing necessary info.'
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
