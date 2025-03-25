import { useState, useEffect } from 'react'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
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
import { useAccessControls } from '../context/access-controls-context'
import { departments } from '../data/data'
import { AccessControl, Department } from '../data/schema'

const formSchema = z.object({
  department_id: z.string().min(1, 'Please select a department.'),
  roomName: z.string().min(1, 'Room name is required.'),
  ipAddress: z.string().ip({ version: 'v4', message: 'Invalid IP address.' }),
  username: z.string().min(1, 'Username is required.'),
  password: z.string().min(1, 'Password is required.'),
})

type AccessControlForm = z.infer<typeof formSchema>

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: AccessControl
  mode?: 'create' | 'update'
}

export function AccessControlsMutateDrawer({
  open,
  onOpenChange,
  currentRow,
  mode = 'create',
}: Props) {
  const isUpdate = mode === 'update'
  const {
    addAccessControl,
    updateAccessControl,
    setOpen: setContextOpen,
  } = useAccessControls()

  const [isDepartmentPopoverOpen, setIsDepartmentPopoverOpen] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<
    'ACTIVE' | 'INACTIVE' | null
  >(null)
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<AccessControlForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          department_id: currentRow.department_id,
          roomName: currentRow.roomName,
          ipAddress: currentRow.ipAddress,
          username: currentRow.username,
          password: currentRow.password,
        }
      : {
          department_id: '',
          roomName: '',
          ipAddress: '',
          username: '',
          password: '',
        },
  })

  useEffect(() => {
    if (isUpdate && currentRow) {
      form.reset({
        department_id: currentRow.department_id,
        roomName: currentRow.roomName,
        ipAddress: currentRow.ipAddress,
        username: currentRow.username,
        password: currentRow.password,
      })
      setConnectionStatus(currentRow.status)
      setLastChecked(currentRow.checked_at)
    } else {
      form.reset({
        department_id: '',
        roomName: '',
        ipAddress: '',
        username: '',
        password: '',
      })
      setConnectionStatus(null)
      setLastChecked(null)
    }
  }, [currentRow, isUpdate, form])

  const onSubmit = (data: AccessControlForm) => {
    if (mode === 'create') {
      const newAccessControl: AccessControl = {
        id: `AC-${Date.now()}`,
        department_id: data.department_id,
        roomName: data.roomName,
        ipAddress: data.ipAddress,
        username: data.username,
        password: data.password,
        status: connectionStatus || 'INACTIVE',
        checked_at: lastChecked || new Date(),
      }
      addAccessControl(newAccessControl)
      toast({
        title: 'Access Control added successfully!',
        description: (
          <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
            <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
    } else if (mode === 'update' && currentRow) {
      const updatedAccessControl: AccessControl = {
        ...currentRow,
        department_id: data.department_id,
        roomName: data.roomName,
        ipAddress: data.ipAddress,
        username: data.username,
        password: data.password,
        status: connectionStatus || currentRow.status,
        checked_at: lastChecked || currentRow.checked_at,
      }
      updateAccessControl(updatedAccessControl)
      toast({
        title: 'Access Control updated successfully!',
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
    setConnectionStatus(null)
    setLastChecked(null)
  }

  const handleCheckConnection = () => {
    // Simulasi pemeriksaan koneksi (di dunia nyata, ini akan menjadi API call)
    const isConnected = Math.random() > 0.3 // 70% kemungkinan berhasil
    setConnectionStatus(isConnected ? 'ACTIVE' : 'INACTIVE')
    setLastChecked(new Date())
  }

  return (
    <Sheet
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v)
        if (!v) {
          form.reset()
          setConnectionStatus(null)
          setLastChecked(null)
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
            onSubmit={form.handleSubmit(onSubmit)}
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
              name='roomName'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Room Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter Room Name' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Device IP Address Field */}
            <FormField
              control={form.control}
              name='ipAddress'
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
                        className='pr-10' // Memberikan ruang untuk ikon
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

            {/* Check Device Connection */}
            <div className='flex-col space-y-3'>
              <Button
                type='button'
                variant='outline'
                className='  font-normal'
                onClick={handleCheckConnection}
              >
                Check Device Connection
              </Button>
              {connectionStatus && lastChecked && (
                <div className='flex-col space-y-1'>
                  <span className='text-sm'>Status:</span>
                  <span
                    className={cn(
                      'text-sm',
                      connectionStatus === 'ACTIVE'
                        ? 'text-green-500'
                        : 'text-red-500'
                    )}
                  >
                    &ensp;{connectionStatus}
                  </span>
                  <p className='text-sm text-muted-foreground'>
                    Checked at: {lastChecked.toLocaleString()}
                  </p>
                </div>
              )}
            </div>
          </form>
        </Form>
        <div className='flex justify-end gap-2 p-4'>
          <SheetClose asChild>
            <Button variant='outline'>Cancel</Button>
          </SheetClose>
          <Button
            form='access-control-form'
            type='submit'
            className='bg-purple-600 hover:bg-purple-700'
          >
            {isUpdate ? 'Update Access Control' : 'Add Access Control'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
