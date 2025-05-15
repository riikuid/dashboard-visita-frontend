import { useState } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { Department } from '@/features/departments/data/schema'

// Define the form schema
export const accessControlSchema = z.object({
  department_id: z.string().min(1, 'Department is required'),
  name: z.string().min(1, 'Name is required'),
  ip_address: z
    .string()
    .min(1, 'IP Address is required')
    .regex(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/, 'Invalid IP Address format'),
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
  location: z.string().min(1, 'Location is required'),
  is_active: z.boolean(),
})

export type AccessControlFormData = z.infer<typeof accessControlSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: AccessControlFormData & { id?: string }
  departments: Department[]
  saveAccessControl: (
    data: AccessControlFormData,
    accessControlId?: string
  ) => Promise<boolean>
}

export function AccessControlsMutateDrawer({
  open,
  onOpenChange,
  currentRow,
  departments,
  saveAccessControl,
}: Props) {
  const isUpdate = !!currentRow
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDepartmentPopoverOpen, setIsDepartmentPopoverOpen] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<AccessControlFormData>({
    resolver: zodResolver(accessControlSchema),
    defaultValues: currentRow ?? {
      department_id: '',
      name: '',
      ip_address: '',
      username: '',
      password: '',
      location: '',
      is_active: false,
    },
  })

  const onSubmit = async (data: AccessControlFormData) => {
    console.log('Submitting form with data:', data)
    setIsSubmitting(true)
    try {
      const success = await saveAccessControl(data, currentRow?.id)
      if (success) {
        onOpenChange(false)
        form.reset()
      }
    } catch (error) {
      console.error('Error saving access control:', error)
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
          setIsDepartmentPopoverOpen(false)
          setShowPassword(false)
        }
      }}
    >
      <SheetContent className='flex flex-col p-0'>
        <SheetHeader className='text-left'>
          <SheetTitle className='p-4'>
            {isUpdate
              ? 'Edit Access Control Device'
              : 'Add Access Control Device'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            id='access-control-form'
            onSubmit={form.handleSubmit(
              (data) => onSubmit(data),
              (errors) => {
                console.log('Validation errors:', errors)
              }
            )}
            className='space-y-5 flex-1 px-4'
          >
            {/* Department Field */}
            <FormField
              control={form.control}
              name='department_id'
              render={({ field }) => (
                <FormItem className='flex flex-col'>
                  <FormLabel>Department</FormLabel>
                  <Popover
                    open={isDepartmentPopoverOpen}
                    onOpenChange={setIsDepartmentPopoverOpen}
                  >
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant='outline'
                          role='combobox'
                          className={cn(
                            'justify-between',
                            !field.value && 'text-muted-foreground'
                          )}
                        >
                          {field.value
                            ? departments.find(
                                (dept) => dept.id === field.value
                              )?.name
                            : 'Select Department'}
                          <span className='ml-2'>▼</span>
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='p-0'>
                      <Command>
                        <CommandInput placeholder='Search department...' />
                        <CommandList>
                          <CommandEmpty>No department found.</CommandEmpty>
                          <CommandGroup>
                            {departments.map((dept: Department) => (
                              <CommandItem
                                key={dept.id}
                                value={dept.id}
                                onSelect={() => {
                                  form.setValue('department_id', dept.id)
                                  setIsDepartmentPopoverOpen(false)
                                }}
                              >
                                {dept.name}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Room Name Field */}
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter Room Name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location Field */}
            <FormField
              control={form.control}
              name='location'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter Location' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Device IP Address Field */}
            <FormField
              control={form.control}
              name='ip_address'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Device IP Address</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter Device IP Address' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Username Field */}
            <FormField
              control={form.control}
              name='username'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter Device Username' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password Field */}
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        {...field}
                        placeholder='Enter Device Password'
                        className='pr-10'
                      />
                      <Button
                        type='button'
                        variant='ghost'
                        size='sm'
                        className='absolute right-0 top-0 h-full px-3'
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <IconEyeOff className='h-4 w-4' />
                        ) : (
                          <IconEye className='h-4 w-4' />
                        )}
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Hidden is_active Field */}
            <FormField
              control={form.control}
              name='is_active'
              render={({ field }) => (
                <FormItem className='hidden'>
                  <FormControl>
                    <Input
                      type='hidden'
                      {...field}
                      value={field.value.toString()}
                    />
                  </FormControl>
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
            form='access-control-form'
            type='submit'
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
            {isUpdate ? 'Update Access Control' : 'Add Access Control'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
