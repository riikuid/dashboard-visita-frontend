import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IconEye, IconEyeOff } from '@tabler/icons-react'
import md5 from 'md5'
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
import {
  AccessControl,
  AccessControlFormData,
  accessControlSchema,
} from '../data/schema'

// Fungsi Digest Authentication
interface DigestAuthParams {
  username: string
  password: string
  method: string
  uri: string
  realm: string
  nonce: string
  qop?: string
  nc?: string
  cnonce?: string
  opaque?: string
}

function parseDigestHeader(header: string): Record<string, string> {
  const parts: Record<string, string> = {}
  const regex = /([a-z0-9_-]+)="?([^",]+)"?/gi
  let match: RegExpExecArray | null
  while ((match = regex.exec(header)) !== null) {
    parts[match[1]] = match[2]
  }
  return parts
}

function generateDigestHeader(params: DigestAuthParams): string {
  const {
    username,
    password,
    method,
    uri,
    realm,
    nonce,
    qop,
    nc = '00000001',
    cnonce = Math.random().toString(36).substring(2, 10),
    opaque,
  } = params

  const ha1 = md5(`${username}:${realm}:${password}`)
  const ha2 = md5(`${method}:${uri}`)
  let response: string
  if (qop === 'auth') {
    response = md5(`${ha1}:${nonce}:${nc}:${cnonce}:${qop}:${ha2}`)
  } else {
    response = md5(`${ha1}:${nonce}:${ha2}`)
  }

  const parts = [
    `Digest username="${username}"`,
    `realm="${realm}"`,
    `nonce="${nonce}"`,
    `uri="${uri}"`,
    `response="${response}"`,
  ]
  if (qop) parts.push(`qop=${qop}`)
  if (nc) parts.push(`nc=${nc}`)
  if (cnonce) parts.push(`cnonce="${cnonce}"`)
  if (opaque) parts.push(`opaque="${opaque}"`)

  return parts.join(', ')
}

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: AccessControl
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
  const [lastChecked, setLastChecked] = useState<Date | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [connectionError, setConnectionError] = useState<string | null>(null)
  const [isChecking, setIsChecking] = useState(false) // Tambahkan state untuk loading

  const form = useForm<AccessControlFormData>({
    resolver: zodResolver(accessControlSchema),
    defaultValues: currentRow ?? {
      name: '',
      department_id: '',
      location: '',
      ip_address: '',
      username: '',
      password: '',
      is_active: false,
    },
  })

  const handleCheckConnection = async () => {
    setIsChecking(true)
    setConnectionError(null)
    setLastChecked(new Date())

    const { ip_address, username, password } = form.getValues()

    // Validasi input
    if (!ip_address || !username || !password) {
      setConnectionError('IP Address, Username, and Password are required.')
      form.setValue('is_active', false)
      setIsChecking(false)
      return
    }

    // Validasi format IP Address
    const ipRegex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
    if (!ipRegex.test(ip_address)) {
      setConnectionError('Invalid IP Address format.')
      form.setValue('is_active', false)
      setIsChecking(false)
      return
    }

    const url = `http://${ip_address}/ISAPI/status`
    const method = 'GET'
    const uri = '/ISAPI/status'

    try {
      // Langkah 1: Kirim permintaan awal untuk mendapatkan challenge
      const initialResponse = await fetch(url, {
        method,
      })

      if (initialResponse.status !== 401) {
        // Jika tidak mendapatkan 401, periksa apakah langsung berhasil
        if (initialResponse.status === 200) {
          form.setValue('is_active', true)
        } else {
          form.setValue('is_active', false)
          setConnectionError(
            `Unexpected response: ${initialResponse.statusText}`
          )
        }
        setIsChecking(false)
        return
      }

      // Langkah 2: Parse header WWW-Authenticate
      const wwwAuthenticate = initialResponse.headers.get('WWW-Authenticate')
      if (!wwwAuthenticate) {
        throw new Error('No WWW-Authenticate header received.')
      }

      const challenge = parseDigestHeader(wwwAuthenticate)

      // Langkah 3: Buat header Authorization menggunakan generateDigestHeader
      const digestHeader = generateDigestHeader({
        username,
        password,
        method,
        uri,
        realm: challenge.realm,
        nonce: challenge.nonce,
        qop: challenge.qop,
        opaque: challenge.opaque,
      })

      // Langkah 4: Kirim permintaan kedua dengan header Authorization
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: digestHeader,
        },
      })

      if (response.status === 200) {
        form.setValue('is_active', true)
      } else {
        form.setValue('is_active', false)
        setConnectionError(`Failed to connect: ${response.statusText}`)
      }
    } catch (error) {
      form.setValue('is_active', false)
      setConnectionError(
        error instanceof Error ? error.message : 'Failed to connect to device.'
      )
    } finally {
      setIsChecking(false)
    }
  }

  const onSubmit = async (data: AccessControlFormData) => {
    setIsSubmitting(true)
    try {
      const success = await saveAccessControl(data, currentRow?.id)
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
          setLastChecked(null)
          setIsDepartmentPopoverOpen(false)
          setShowPassword(false)
          setConnectionError(null)
          setIsChecking(false)
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

            {/* Check Device Connection */}
            <div className='flex-col space-y-3'>
              <Button
                type='button'
                variant='outline'
                className='font-normal'
                onClick={handleCheckConnection}
                disabled={isChecking}
              >
                {isChecking ? 'Checking...' : 'Check Device Connection'}
              </Button>
              {lastChecked && (
                <div className='flex-col space-y-1'>
                  <span className='text-sm'>Connection:</span>
                  <span
                    className={cn(
                      'text-sm',
                      form.getValues('is_active')
                        ? 'text-green-500'
                        : 'text-red-500'
                    )}
                  >
                    {form.getValues('is_active') ? 'Active' : 'Inactive'}
                  </span>
                  <p className='text-sm text-muted-foreground'>
                    Checked at: {lastChecked.toLocaleString()}
                  </p>
                  {connectionError && (
                    <p className='text-sm text-red-500'>{connectionError}</p>
                  )}
                </div>
              )}
            </div>

            {/* Hidden Field for is_active */}
            <FormField
              control={form.control}
              name='is_active'
              render={({ field }) => (
                <FormItem className='hidden'>
                  <FormControl>
                    <Input
                      type='hidden'
                      {...field}
                      value={field.value ? 'true' : 'false'}
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
          <Button form='access-control-form' type='submit'>
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
