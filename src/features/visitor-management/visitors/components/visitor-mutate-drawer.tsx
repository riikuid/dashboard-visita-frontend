import { useState } from 'react'
import { z } from 'zod'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from '@/hooks/use-toast'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
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
import {
  Company,
  CompanyFormData,
  Person,
  PersonFormData,
} from '../../companies/data/schema'
import { useVisitor } from '../context/visitor-context'
import { Visitor, VisitorFormData } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Visitor
  companies: Company[]
  persons: Person[]
  saveVisitor: (data: VisitorFormData, visitId?: string) => Promise<boolean>
  saveCompany: (
    data: CompanyFormData,
    companyId?: string
  ) => Promise<boolean | Company | null>
  savePerson: (
    data: PersonFormData,
    personId?: string
  ) => Promise<boolean | Person | null>
}

const formSchema = z.object({
  companyId: z.string().optional(),
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  leaderId: z.string().optional(),
  leaderName: z.string().optional(),
  leaderPhone: z.string().optional(),
  picName: z.string().min(1, 'PIC Name is required.'),
  picDepartment: z.string().min(1, 'Department is required.'),
  arrivalDate: z.date({ required_error: 'Please select a date.' }),
  necessary: z.string().min(1, 'Necessary is required.'),
})

type VisitorForm = z.infer<typeof formSchema>

export function VisitorMutateDrawer({
  open,
  onOpenChange,
  currentRow,
  companies,
  persons,
  saveVisitor,
  saveCompany,
  savePerson,
}: Props) {
  const isUpdate = !!currentRow
  const { setOpen } = useVisitor()

  // State untuk mengontrol apakah menampilkan form tambah perusahaan/person baru
  const [isAddingNewCompany, setIsAddingNewCompany] = useState(false)
  const [isAddingNewLeader, setIsAddingNewLeader] = useState(false)
  const [isCompanyPopoverOpen, setIsCompanyPopoverOpen] = useState(false)
  const [isLeaderPopoverOpen, setIsLeaderPopoverOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<VisitorForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow
      ? {
          companyId: currentRow.company_id,
          companyName: '',
          companyAddress: '',
          leaderId: currentRow.leader_id,
          leaderName: '',
          leaderPhone: '',
          picName: currentRow.pic_name,
          picDepartment: currentRow.pic_department,
          arrivalDate: new Date(currentRow.arrival_date),
          necessary: currentRow.necessary,
        }
      : {
          companyId: '',
          companyName: '',
          companyAddress: '',
          leaderId: '',
          leaderName: '',
          leaderPhone: '',
          picName: '',
          picDepartment: '',
          arrivalDate: undefined,
          necessary: '',
        },
  })

  const selectedCompanyId = form.watch('companyId')

  const onSubmit = async (data: VisitorForm) => {
    setIsSubmitting(true)
    try {
      let companyId = data.companyId
      let leaderId = data.leaderId

      // Jika menambahkan company baru
      if (isAddingNewCompany && data.companyName && data.companyAddress) {
        const newCompany: CompanyFormData = {
          name: data.companyName,
          address: data.companyAddress,
        }
        const result = await saveCompany(newCompany)
        if (!result || typeof result === 'boolean') {
          toast({
            title: 'Error!',
            description: 'Failed to create new company.',
            variant: 'destructive',
          })
          return
        }
        companyId = result.id
      }

      // Jika menambahkan leader baru
      if (isAddingNewLeader && data.leaderName && data.leaderPhone) {
        const newPerson: PersonFormData = {
          company_id: companyId!,
          name: data.leaderName,
          // nik: '', // Bisa ditambahkan field NIK jika diperlukan
          phone: data.leaderPhone,
        }
        const result = await savePerson(newPerson)
        if (!result || typeof result === 'boolean') {
          toast({
            title: 'Error!',
            description: 'Failed to create new person.',
            variant: 'destructive',
          })
          return
        }
        leaderId = result.id // Pastikan result bukan null
      }

      // Buat data visitor untuk disimpan
      const visitorData: VisitorFormData = {
        company_id: companyId!,
        leader_id: leaderId!,
        arrival_date: data.arrivalDate,
        pic_name: data.picName,
        pic_department: data.picDepartment,
        necessary: data.necessary,
        status: 'REGISTERED_VISITOR',
      }

      // Simpan visitor ke API
      const success = await saveVisitor(visitorData, currentRow?.id)
      if (success) {
        onOpenChange(false)
        form.reset()
        setIsAddingNewCompany(false)
        setIsAddingNewLeader(false)
        setOpen(null)
      }
    } catch (error) {
      toast({
        title: 'Error!',
        description: `Failed to ${isUpdate ? 'update' : 'create'} visitor: ${error}`,
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
        form.reset()
        setIsAddingNewCompany(false)
        setIsAddingNewLeader(false)
        setIsCompanyPopoverOpen(false)
        setIsLeaderPopoverOpen(false)
      }}
    >
      <SheetContent className='flex flex-col p-0'>
        <SheetHeader className='text-left'>
          <SheetTitle className='p-4'>
            {isUpdate ? 'Edit Visitor' : 'Add New Visitor'}
          </SheetTitle>
        </SheetHeader>
        <Form {...form}>
          <form
            id='visitor-form'
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-5 flex-1'
          >
            {/* Company Field */}
            <div className='space-y-2'>
              <div className='flex justify-between'>
                <FormLabel className='my-2 px-4'>Company</FormLabel>
                <Button
                  className='text-gray-400 pr-4'
                  type='button'
                  variant='link'
                  size='sm'
                  onClick={() => {
                    setIsAddingNewCompany(!isAddingNewCompany)
                    setIsAddingNewLeader(!isAddingNewCompany) // Reset leader form jika beralih
                    form.setValue('companyId', '')
                    form.setValue('companyName', '')
                    form.setValue('companyAddress', '')
                    form.setValue('leaderId', '')
                  }}
                >
                  {isAddingNewCompany ? 'Select Existing' : 'Add New'}
                </Button>
              </div>
              {isAddingNewCompany ? (
                <div className='grid grid-cols-2 gap-4 p-4 bg-gray-50'>
                  <FormField
                    control={form.control}
                    name='companyName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Enter Company Name' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='companyAddress'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Enter Address' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name='companyId'
                  render={({ field }) => (
                    <FormItem className='flex flex-col px-4'>
                      <Popover
                        open={isCompanyPopoverOpen}
                        onOpenChange={setIsCompanyPopoverOpen}
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
                                ? companies.find(
                                    (company: Company) =>
                                      company.id === field.value
                                  )?.name
                                : 'Select Company'}
                              <span className='ml-2'>▼</span>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className='p-0'>
                          <Command>
                            <CommandInput placeholder='Search company...' />
                            <CommandList>
                              <CommandEmpty>No company found.</CommandEmpty>
                              <CommandGroup>
                                {companies?.length > 0 ? (
                                  companies.map((company: Company) => (
                                    <CommandItem
                                      key={company.id}
                                      value={company.id}
                                      onSelect={() => {
                                        form.setValue('companyId', company.id)
                                        form.setValue('leaderId', '') // Reset leader ketika company berubah
                                        setIsCompanyPopoverOpen(false)
                                      }}
                                    >
                                      {company.name}
                                    </CommandItem>
                                  ))
                                ) : (
                                  <CommandEmpty>
                                    No company available.
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

            {/* Leader Field */}
            <div className='space-y-2'>
              <div className='flex justify-between px-4'>
                <FormLabel className='my-2'>Leader</FormLabel>
                <Button
                  className='text-gray-400'
                  type='button'
                  variant='link'
                  size='sm'
                  onClick={() => {
                    setIsAddingNewLeader(!isAddingNewLeader)
                    form.setValue('leaderId', '')
                    form.setValue('leaderName', '')
                    form.setValue('leaderPhone', '')
                  }}
                  disabled={!selectedCompanyId}
                >
                  {isAddingNewLeader ? 'Select Existing' : 'Add New'}
                </Button>
              </div>
              {isAddingNewLeader ? (
                <div className='grid grid-cols-2 gap-4 p-4 bg-gray-50'>
                  <FormField
                    control={form.control}
                    name='leaderName'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Enter Leader Name' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='leaderPhone'
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='Enter Leader Phone' />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ) : (
                <FormField
                  control={form.control}
                  name='leaderId'
                  render={({ field }) => (
                    <FormItem className='flex flex-col px-4'>
                      <Popover
                        open={isLeaderPopoverOpen}
                        onOpenChange={setIsLeaderPopoverOpen}
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
                              disabled={!selectedCompanyId}
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
                                {persons?.length > 0 && selectedCompanyId ? (
                                  persons
                                    .filter(
                                      (person: Person) =>
                                        person.company_id === selectedCompanyId
                                    )
                                    .map((person: Person) => (
                                      <CommandItem
                                        key={person.id}
                                        value={person.id}
                                        onSelect={() => {
                                          form.setValue('leaderId', person.id)
                                          setIsLeaderPopoverOpen(false)
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

            {/* PIC Name and Department */}
            <div className='grid grid-cols-2 gap-4 px-4'>
              <FormField
                control={form.control}
                name='picName'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PIC Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter PIC Name' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='picDepartment'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Department</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Enter PIC Department' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Date */}
            <FormField
              control={form.control}
              name='arrivalDate'
              render={({ field }) => (
                <FormItem className='flex flex-col px-4'>
                  <FormLabel>Date</FormLabel>
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
                          <CalendarIcon className='mr-2 h-4 w-4' />
                          {field.value
                            ? format(field.value, 'PPP')
                            : 'Select Date'}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className='w-auto p-0'>
                      <Calendar
                        mode='single'
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Necessary */}
            <FormField
              control={form.control}
              name='necessary'
              render={({ field }) => (
                <FormItem className='px-4'>
                  <FormLabel>Necessary</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Enter Visitor Necessary' />
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
          <Button form='visitor-form' type='submit' disabled={isSubmitting}>
            {isSubmitting
              ? 'Saving...'
              : isUpdate
                ? 'Update Visitor'
                : 'Add Visitor'}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
