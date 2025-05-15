import { useState, useEffect, useCallback } from 'react'
// import { log } from 'console'
import { toast } from '@/hooks/use-toast'
import { Visitor, VisitorFormData } from '../data/schema'

export function useVisitorsApi() {
  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorSnack, setErrorSnack] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch visitors
  const fetchVisitors = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/visitor`)
      // const res = await fetch(
      //   `${import.meta.env.VITE_BACKEND_SERVER}/visitor`,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'ngrok-skip-browser-warning': 'true',
      //     },
      //   }
      // )
      if (!res.ok) {
        throw new Error(`Failed to fetch Visitors: ${res.status}`)
      }
      const data = await res.json()
      console.log(data)

      setVisitors(data)
    } catch (err) {
      setError('Error: ' + err)
      setVisitors([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Create or update visit
  const saveVisitor = useCallback(
    async (data: VisitorFormData, visitId?: string) => {
      try {
        const isUpdate = !!visitId

        const url = isUpdate
          ? `${import.meta.env.VITE_BACKEND_SERVER}/visitor/${visitId}`
          : `${import.meta.env.VITE_BACKEND_SERVER}/visitor`
        const method = isUpdate ? 'PUT' : 'POST'
        // 🧼 Salin data & hapus `status` jika create
        const sendData: Partial<VisitorFormData> = { ...data }
        if (!isUpdate) {
          delete sendData.status
        }

        console.log('📦 Data yang dikirim ke server:', sendData)

        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(sendData),
        })

        if (!res.ok) {
          const errBody = await res.json().catch(() => ({}))
          throw new Error(
            `Failed to ${isUpdate ? 'update' : 'create'} visit: ${res.status} - ${errBody?.message || 'Unknown error'}`
          )
        }

        // Refresh data setelah create/update
        await fetchVisitors()

        toast({
          title: 'Success!',
          description: `Visitor ${isUpdate ? 'updated' : 'created'} successfully.`,
        })

        return true // Berhasil
      } catch (err) {
        setErrorSnack(`Failed to ${visitId ? 'update' : 'create'} visit`)
        toast({
          title: 'Error!',
          description: `Something went wrong while ${visitId ? 'updating' : 'creating'} the visit.\n ${err}`,
        })
        // eslint-disable-next-line no-console
        console.error(err)
        return false // Gagal
      }
    },
    [fetchVisitors]
  )

  const deleteVisitor = useCallback(
    async (visitId: string, visitData: Visitor) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/visitor/${visitId}`,
          {
            method: 'DELETE',
          }
        )

        if (!res.ok) {
          throw new Error(`Failed to delete visit: ${res.status}`)
        }

        // Refresh data setelah delete
        await fetchVisitors()

        toast({
          title: 'Success!',
          description: `The following visitor has ben deleted: ${visitData.id} - ${visitData.company?.name}`,
        })

        return true // Berhasil
      } catch (err) {
        setErrorSnack(`Failed to delete visitor: ${visitId}`)
        toast({
          title: 'Error!',
          description: 'Something went wrong while deleting the visitor.',
        })
        // eslint-disable-next-line no-console
        console.error(err)
        return false // Gagal
      }
    },
    [fetchVisitors]
  )

  useEffect(() => {
    fetchVisitors()
  }, [fetchVisitors])

  return { visitors, loading, error, errorSnack, saveVisitor, deleteVisitor }
}
