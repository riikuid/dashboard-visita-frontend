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
import { accessControls } from '../../data/data'
import { Permission, Person, AccessControl, Visitor } from '../../data/schema'
import { usePermissions } from '../context/permissions-context'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  visitor: Visitor
  mode?: 'create' | 'update'
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
})

type PermissionForm = z.infer<typeof formSchema>

export function PermissionMutateDrawer({
  open,
  onOpenChange,
  visitor,
  mode = 'create',
}: Props) {
  const {
    addPermission,
    updatePermission,
    addPerson,
    persons,
    setOpen: setContextOpen,
    currentRow,
  } = usePermissions()

  const [isAddingNewPerson, setIsAddingNewPerson] = useState(false)
  const [isPersonPopoverOpen, setIsPersonPopoverOpen] = useState(false)
  const [isAccessControlPopoverOpen, setIsAccessControlPopoverOpen] =
    useState(false)

  const form = useForm<PermissionForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      personId: '',
      personName: '',
      personPhone: '',
      accessControlId: '',
      startTime: '',
      endTime: '',
    },
  })

  useEffect(() => {
    if (mode === 'update' && currentRow) {
      form.reset({
        personId: currentRow.person_id,
        personName: '',
        personPhone: '',
        accessControlId: currentRow.access_control_id,
        startTime: currentRow.start_time,
        endTime: currentRow.end_time,
      })
    } else {
      form.reset({
        personId: '',
        personName: '',
        personPhone: '',
        accessControlId: '',
        startTime: '',
        endTime: '',
      })
    }
  }, [currentRow, mode, form])

  const onSubmit = (data: PermissionForm) => {
    if (mode === 'create') {
      const newPermission: Permission = {
        id: `PERM-${Date.now()}`,
        person_id: isAddingNewPerson ? `PERSON-${Date.now()}` : data.personId,
        visitor_id: visitor.id,
        access_control_id: data.accessControlId,
        start_time: data.startTime,
        end_time: data.endTime,
        status: 'registered',
      }

      addPermission(newPermission)

      if (isAddingNewPerson && data.personName && data.personPhone) {
        const newPerson: Person = {
          id: newPermission.person_id,
          company_id: visitor.company_id,
          name: data.personName,
          nik: '',
          phone: data.personPhone,
          visit_count: 0,
        }
        addPerson(newPerson)
      }

      toast({
        title: 'Permission added successfully!',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    } else if (mode === 'update' && currentRow) {
      const updatedPermission: Permission = {
        ...currentRow,
        person_id: data.personId,
        access_control_id: data.accessControlId,
        start_time: data.startTime,
        end_time: data.endTime,
      }

      updatePermission(updatedPermission)

      if (isAddingNewPerson && data.personName && data.personPhone) {
        const newPerson: Person = {
          id: updatedPermission.person_id,
          company_id: visitor.company_id,
          name: data.personName,
          nik: '',
          phone: data.personPhone,
          visit_count: 0,
        }
        addPerson(newPerson)
      }

      toast({
        title: 'Permission updated successfully!',
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
    setIsAddingNewPerson(false)
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
            {mode === 'create' ? 'Add Permission' : 'Edit Permission'}
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
                    setIsPersonPopoverOpen(false)
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
                                    (person: Person) =>
                                      person.id === field.value
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
                                {persons?.length > 0 ? (
                                  persons
                                    .filter(
                                      (person: Person) =>
                                        person.company_id === visitor.company_id
                                    )
                                    .map((person: Person) => (
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
                                  (ac: AccessControl) => ac.id === field.value
                                )?.roomName
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
                              {accessControls?.length > 0 ? (
                                accessControls.map((ac: AccessControl) => (
                                  <CommandItem
                                    key={ac.id}
                                    value={ac.id}
                                    onSelect={() => {
                                      form.setValue('accessControlId', ac.id)
                                      setIsAccessControlPopoverOpen(false)
                                    }}
                                  >
                                    {ac.roomName}
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
          </form>
        </Form>
        <div className='flex justify-end gap-2 p-4'>
          <SheetClose asChild>
            <Button variant='outline'>Cancel</Button>
          </SheetClose>
          <Button
            form='permission-form'
            type='submit'
            className='bg-purple-600 hover:bg-purple-700'
          >
            {mode === 'create' ? 'Add Permission' : 'Update Permission'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
