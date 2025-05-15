'use client'

export default function CCTVStaticTable() {
  return (
    <div className='p-6'>
      <div className='mb-4 flex items-center justify-between'>
        <div>
          <h2 className='text-2xl font-bold'>CCTV</h2>
          <p className='text-muted-foreground'>
            Manage your CCTV devices and status.
          </p>
        </div>

        <div className='flex gap-2'>
          <button className='bg-white border rounded-md px-4 py-2 text-sm font-medium shadow-sm hover:bg-gray-100'>
            Import ⬇
          </button>
          <button className='bg-black text-white rounded-md px-4 py-2 text-sm font-medium hover:bg-gray-800'>
            Create +
          </button>
        </div>
      </div>

      {/* Search Input */}
      <div className='mb-4'>
        <input
          type='text'
          placeholder='Search location or IP...'
          className='w-full md:w-1/3 border px-3 py-2 rounded-md text-sm shadow-sm'
        />
      </div>

      {/* Table */}
      <div className='overflow-auto border rounded-lg'>
        <table className='min-w-full text-sm'>
          <thead className='bg-muted text-left'>
            <tr>
              <th className='px-4 py-3'>
                <input type='checkbox' />
              </th>
              <th className='px-4 py-3'>Location</th>
              <th className='px-4 py-3'>IP Address</th>
              <th className='px-4 py-3'>Status</th>
              <th className='px-4 py-3'>Actions</th>
            </tr>
          </thead>
          <tbody className='text-sm text-gray-700'>
            {/* Empty State */}
            <tr>
              <td
                colSpan={5}
                className='px-4 py-6 text-center text-muted-foreground'
              >
                No results.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className='mt-3 flex items-center justify-between text-sm text-muted-foreground'>
        <p>0 of 0 row(s) selected.</p>
        <div className='flex items-center gap-2'>
          <span>Rows per page</span>
          <select className='border rounded px-2 py-1 text-sm'>
            <option>10</option>
            <option>25</option>
            <option>50</option>
          </select>
          <span>Page 1 of 0</span>
          <div className='flex gap-1'>
            <button className='px-2'>&laquo;</button>
            <button className='px-2'>&lsaquo;</button>
            <button className='px-2'>&rsaquo;</button>
            <button className='px-2'>&raquo;</button>
          </div>
        </div>
      </div>
    </div>
  )
}
