import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ClockIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
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
import { AccessControl } from '@/features/access-controls/data/schema'
import {
  Person,
  PersonFormData,
} from '@/features/visitor-management/companies/data/schema'
import {
  Permission,
  PermissionAccessControlFormData,
  PermissionFormData,
  Visitor,
} from '../../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Permission
  persons: Person[]
  visitor: Visitor
  savePerson: (
    data: PersonFormData,
    personId?: string
  ) => Promise<Person | boolean>
  savePermission: (
    permissionData: PermissionFormData,
    permissionAccessControlData: PermissionAccessControlFormData,
    permissionId?: string
  ) => Promise<boolean>
  accessControls: AccessControl[]
}

const formSchema = z.object({
  personId: z.string().min(1, 'Please select a person or add a new one.'),
  personName: z.string().optional(),
  personPhone: z.string().optional(),
  accessControlId: z.string().min(1, 'Please select a room.'),
  startTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'Start time must be in HH:mm format.'),
  endTime: z
    .string()
    .regex(/^\d{2}:\d{2}$/, 'End time must be in HH:mm format.'),
  status: z.string().optional(),
})

type PermissionForm = z.infer<typeof formSchema>

export function PermissionMutateDrawer({
  open,
  onOpenChange,
  currentRow,
  persons,
  visitor,
  savePerson,
  savePermission,
  accessControls,
}: Props) {
  const isUpdate = !!currentRow

  const [isAddingNewPerson, setIsAddingNewPerson] = useState(false)
  const [isPersonPopoverOpen, setIsPersonPopoverOpen] = useState(false)
  const [isAccessControlPopoverOpen, setIsAccessControlPopoverOpen] =
    useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<PermissionForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personId: '',
      personName: '',
      personPhone: '',
      accessControlId: '',
      startTime: '',
      endTime: '',
      status: 'REGISTERED',
    },
  })

  useEffect(() => {
    if (isUpdate && currentRow) {
      const startTime = currentRow.start_time
        ? new Date(currentRow.start_time).toTimeString().slice(0, 5)
        : ''
      const endTime = currentRow.end_time
        ? new Date(currentRow.end_time).toTimeString().slice(0, 5)
        : ''
      form.reset({
        personId: currentRow.person_id,
        personName: '',
        personPhone: '',
        accessControlId:
          currentRow.permission_access_controls?.[0]?.access_control_id || '',
        startTime,
        endTime,
        status: currentRow.status,
      })
    } else {
      form.reset({
        personId: '',
        personName: '',
        personPhone: '',
        accessControlId: '',
        startTime: '',
        endTime: '',
        status: 'REGISTERED',
      })
    }
  }, [currentRow, isUpdate, form])

  const onSubmit = async (data: PermissionForm) => {
    setIsSubmitting(true)
    console.log(visitor.company_id)
    try {
      const arrivalDate = new Date(visitor.arrival_date)
      const arrivalDateString = arrivalDate.toISOString().split('T')[0]
      const startTime = `${arrivalDateString}T${data.startTime}:00.000Z`
      const endTime = `${arrivalDateString}T${data.endTime}:00.000Z`

      let personId = data.personId

      // Jika menambahkan person baru
      if (isAddingNewPerson && data.personName && data.personPhone) {
        const newPersonData: PersonFormData = {
          company_id: visitor.company_id,
          name: data.personName,
          nik: '',
          phone: data.personPhone,
        }
        const result = await savePerson(newPersonData)
        if (!result || typeof result === 'boolean') {
          toast({
            title: 'Error!',
            description: 'Failed to create new person.',
            variant: 'destructive',
          })
          return
        }
        personId = result.id
      }

      // Buat data permission
      const permissionData = {
        person_id: personId,
        visitor_id: visitor.id,
        start_time: startTime,
        end_time: endTime,
        status: data.status || 'REGISTERED',
      }

      // Buat data permission access control
      const permissionAccessControlData: PermissionAccessControlFormData = {
        permission_id: null,
        access_control_id: data.accessControlId,
      }

      // Simpan permission
      const success = await savePermission(
        permissionData,
        permissionAccessControlData,
        isUpdate ? currentRow.id : undefined
      )

      if (success) {
        onOpenChange(false)
        form.reset()
        setIsAddingNewPerson(false)
      }
    } catch (error) {
      toast({
        title: 'Error!',
        description: `Failed to ${isUpdate ? 'update' : 'create'} permission: ${error}`,
        variant: 'destructive',
      })
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
          setIsAddingNewPerson(false)
          setIsPersonPopoverOpen(false)
          setIsAccessControlPopoverOpen(false)
        }
      }}
    >
      <SheetContent className='flex flex-col p-0'>
        <SheetHeader className='text-left'>
          <SheetTitle className='p-4'>
            {isUpdate ? 'Edit Permission' : 'Add Permission'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            id='permission-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex-1'
          >
            {/* Person Field */}
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <FormLabel className='my-2 px-4'>Person</FormLabel>
                <Button
                  className='text-gray-400 pr-4'
                  type='button'
                  variant='link'
                  size='sm'
                  onClick={() => {
                    setIsAddingNewPerson(!isAddingNewPerson)
                    form.setValue('personId', '')
                    form.setValue('personName', '')
                    form.setValue('personPhone', '')
                  }}
                >
                  {isAddingNewPerson ? 'Select Existing' : 'Add New'}
                </Button>
              </div>
              {isAddingNewPerson ? (
                <div className='grid grid-cols-2 gap-4 p-4 bg-gray-50'>
                  <FormField
                    control={form.control}
                    name='personName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Enter Person Name' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='personPhone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Enter Person Phone' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name='personId'
                  render={({ field }) => (
                    <FormItem className='flex flex-col px-4'>
                      <Popover
                        open={isPersonPopoverOpen}
                        onOpenChange={setIsPersonPopoverOpen}
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
                                ? persons.find(
                                    (person) => person.id === field.value
                                  )?.name
                                : 'Select Person'}
                              <span className='ml-2'>▼</span>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='p-0'>
                          <Command>
                            <CommandInput placeholder='Search person...' />
                            <CommandList>
                              <CommandEmpty>No person found.</CommandEmpty>
                              <CommandGroup>
                                {persons.length > 0 ? (
                                  persons.map((person) => (
                                    <CommandItem
                                      key={person.id}
                                      value={person.id}
                                      onSelect={() => {
                                        form.setValue('personId', person.id)
                                        setIsPersonPopoverOpen(false)
                                      }}
                                    >
                                      {person.name}
                                    </CommandItem>
                                  ))
                                ) : (
                                  <CommandEmpty>
                                    No person available.
                                  </CommandEmpty>
                                )}
                              </CommandGroup>
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>

            {/* Room Access Field */}
            <div className='space-y-2'>
              <FormLabel className='my-2 px-4'>Room Access</FormLabel>
              <FormField
                control={form.control}
                name='accessControlId'
                render={({ field }) => (
                  <FormItem className='flex flex-col px-4'>
                    <Popover
                      open={isAccessControlPopoverOpen}
                      onOpenChange={setIsAccessControlPopoverOpen}
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
                              ? accessControls.find(
                                  (ac) => ac.id === field.value
                                )?.name
                              : 'Select Room'}
                            <span className='ml-2'>▼</span>
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='p-0'>
                        <Command>
                          <CommandInput placeholder='Search room...' />
                          <CommandList>
                            <CommandEmpty>No room found.</CommandEmpty>
                            <CommandGroup>
                              {accessControls.length > 0 ? (
                                accessControls.map((ac) => (
                                  <CommandItem
                                    key={ac.id}
                                    value={ac.id}
                                    onSelect={() => {
                                      form.setValue('accessControlId', ac.id)
                                      setIsAccessControlPopoverOpen(false)
                                    }}
                                  >
                                    {ac.name}
                                  </CommandItem>
                                ))
                              ) : (
                                <CommandEmpty>No room available.</CommandEmpty>
                              )}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Start Time and End Time */}
            <div className='grid grid-cols-2 gap-4 px-4'>
              <FormField
                control={form.control}
                name='startTime'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>Start Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <ClockIcon className='mr-2 h-4 w-4' />
                            {field.value || 'Select Time'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Input
                          type='time'
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className='border-none'
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='endTime'
                render={({ field }) => (
                  <FormItem className='flex flex-col'>
                    <FormLabel>End Time</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant='outline'
                            className={cn(
                              'justify-start text-left font-normal',
                              !field.value && 'text-muted-foreground'
                            )}
                          >
                            <ClockIcon className='mr-2 h-4 w-4' />
                            {field.value || 'Select Time'}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className='w-auto p-0'>
                        <Input
                          type='time'
                          value={field.value}
                          onChange={(e) => field.onChange(e.target.value)}
                          className='border-none'
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status Field (hanya untuk update) */}
            {isUpdate && (
              <div className='space-y-2 px-4'>
                <FormField
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder='Enter status' />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </form>
        </Form>
        <div className='flex justify-end gap-2 p-4'>
          <SheetClose asChild>
            <Button variant='outline'>Cancel</Button>
          </SheetClose>
          <Button form='permission-form' type='submit' disabled={isSubmitting}>
            {isSubmitting
              ? 'Saving...'
              : isUpdate
                ? 'Update Permission'
                : 'Add Permission'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
