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
import { useVisitor } from '../context/visitor-context'
import { Visitor, Company, Person } from '../data/schema'

interface Props {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentRow?: Visitor
}

const formSchema = z.object({
  companyId: z.string().min(1, 'Please select a company or add a new one.'),
  companyName: z.string().optional(),
  companyAddress: z.string().optional(),
  leaderId: z.string().min(1, 'Please select a leader or add a new one.'),
  leaderName: z.string().optional(),
  leaderPhone: z.string().optional(),
  picName: z.string().min(1, 'PIC Name is required.'),
  picDepartment: z.string().min(1, 'Department is required.'),
  arrivalDate: z.date({ required_error: 'Please select a date.' }),
  necessary: z.string().min(1, 'Necessary is required.'),
})

type VisitorForm = z.infer<typeof formSchema>

export function VisitorMutateDrawer({ open, onOpenChange, currentRow }: Props) {
  const isUpdate = !!currentRow
  const { companies, persons, addVisitor } = useVisitor()

  // State untuk mengontrol apakah menampilkan form tambah perusahaan/person baru
  const [isAddingNewCompany, setIsAddingNewCompany] = useState(false)
  const [isAddingNewLeader, setIsAddingNewLeader] = useState(false)

  const [isCompanyPopoverOpen, setIsCompanyPopoverOpen] = useState(false)
  const [isLeaderPopoverOpen, setIsLeaderPopoverOpen] = useState(false)

  const form = useForm<VisitorForm>({
    resolver: zodResolver(formSchema),
    defaultValues: currentRow ?? {
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

  const onSubmit = (data: VisitorForm) => {
    // Buat visitor baru
    const newVisitor: Visitor = {
      id: `VISITOR-${Date.now()}`, // Ganti dengan logika ID yang sesuai
      company_id: isAddingNewCompany ? `COMP-${Date.now()}` : data.companyId,
      leader_id: isAddingNewLeader ? `PERSON-${Date.now()}` : data.leaderId,
      arrival_date: format(data.arrivalDate, 'yyyy-MM-dd'),
      pic_name: data.picName,
      pic_department: data.picDepartment,
      necessary: data.necessary,
      note: null, // Bisa ditambahkan field note jika diperlukan
      status: 'REGISTERED',
    }

    // Tambahkan visitor ke context
    addVisitor(newVisitor)

    // Jika menambahkan perusahaan baru, tambahkan ke daftar companies (opsional)
    if (isAddingNewCompany && data.companyName && data.companyAddress) {
      const newCompany: Company = {
        id: newVisitor.company_id,
        name: data.companyName,
        address: data.companyAddress,
        visit_count: 0,
      }
      // Tambahkan logika untuk menyimpan perusahaan baru (misalnya ke context atau API)
    }

    // Jika menambahkan person baru, tambahkan ke daftar persons (opsional)
    if (isAddingNewLeader && data.leaderName && data.leaderPhone) {
      const newPerson: Person = {
        id: newVisitor.leader_id,
        company_id: newVisitor.company_id,
        name: data.leaderName,
        nik: '', // Bisa ditambahkan field NIK jika diperlukan
        phone: data.leaderPhone,
        visit_count: 0,
      }
      // Tambahkan logika untuk menyimpan person baru (misalnya ke context atau API)
    }

    onOpenChange(false)
    form.reset()
    setIsAddingNewCompany(false)
    setIsAddingNewLeader(false)
    toast({
      title: 'Visitor added successfully!',
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
        setIsAddingNewCompany(false)
        setIsAddingNewLeader(false)
      }}
    >
      <SheetContent className='flex flex-col p-0'>
        <SheetHeader className='text-left'>
          <SheetTitle className='p-4'>Add New Visitor</SheetTitle>
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
                    setIsAddingNewLeader(!isAddingNewCompany)
                    form.setValue('companyId', '')
                    form.setValue('companyName', '')
                    form.setValue('companyAddress', '')
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
                                        setIsCompanyPopoverOpen(false) // Tutup Popover setelah memilih
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
                                          setIsLeaderPopoverOpen(false) // Tutup Popover setelah memilih
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
          <Button
            form='visitor-form'
            type='submit'
            className='bg-purple-600 hover:bg-purple-700'
          >
            Add Visitor
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
