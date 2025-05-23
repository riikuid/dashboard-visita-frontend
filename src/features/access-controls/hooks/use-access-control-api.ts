import { useState, useEffect, useCallback } from 'react'
import { toast } from '@/hooks/use-toast'
import { AccessControl, AccessControlFormData } from '../data/schema'

export function useAccessControlApi() {
  const [accessControls, setAccessControls] = useState<AccessControl[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [errorSnack, setErrorSnack] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  // Fetch access control
  const fetchAccessControls = useCallback(async () => {
    try {
      setLoading(true)

      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/access-control`
      )
      // const res = await fetch(
      //   `${import.meta.env.VITE_BACKEND_SERVER}/access-control`,
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //       'ngrok-skip-browser-warning': 'true',
      //     },
      //   }
      // )
      if (!res.ok) {
        throw new Error(`Failed to fetch access control: ${res.status}`)
      }

      const data = await res.json()
      setAccessControls(data)
    } catch (err) {
      setError('Error: ' + err)
      setAccessControls([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Create or update access-control
  const saveAccessControl = useCallback(
    async (data: AccessControlFormData, accessControlId?: string) => {
      try {
        const isUpdate = !!accessControlId
        const url = isUpdate
          ? `${import.meta.env.VITE_BACKEND_SERVER}/access-control/${accessControlId}`
          : `${import.meta.env.VITE_BACKEND_SERVER}/access-control`
        const method = isUpdate ? 'PUT' : 'POST'

        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })

        if (!res.ok) {
          throw new Error(
            `Failed to ${isUpdate ? 'update' : 'create'} access control: ${res.status}`
          )
        }

        // Refresh data setelah create/update
        await fetchAccessControls()

        toast({
          title: 'Success!',
          description: `Access control ${isUpdate ? 'updated' : 'created'} successfully.`,
        })

        return true // Berhasil
      } catch (err) {
        setErrorSnack(
          `Failed to ${accessControlId ? 'update' : 'create'} access control`
        )
        toast({
          title: 'Error!',
          description: `Something went wrong while ${accessControlId ? 'updating' : 'creating'} the access control.\n ${err}`,
        })
        // eslint-disable-next-line no-console
        console.error(err)
        return false // Gagal
      }
    },
    [fetchAccessControls]
  )

  const checkConnection = useCallback(async (accessControlId: string) => {
    console.log('Calling kontol for ID:', accessControlId)
    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/access-control/connection/${accessControlId}`,
        {
          method: 'PUT',
        }
      )

      if (!res.ok) {
        throw new Error(`Failed to check connection: ${res.status}`)
      }

      const result = await res.json()

      if (result.is_active === true && result.access_control) {
        setAccessControls((prev) =>
          prev.map((item) =>
            item.id === accessControlId
              ? { ...item, ...result.access_control }
              : item
          )
        )
        toast({
          title: 'Connection Successful',
          description: result.message || 'Device is connected.',
        })
        return true // Success
      } else {
        toast({
          title: 'Connection Failed',
          description: 'Device is not active.',
          variant: 'destructive',
        })
        return false // Failure
      }
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to check device connection.',
        variant: 'destructive',
      })
      console.error('Error checking connection:', err)
      return false // Failure
    }
  }, [])

  const deleteAccessControl = useCallback(
    async (accessControlId: string, accessControlData: AccessControl) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/access-control/${accessControlId}`,
          {
            method: 'DELETE',
          }
        )

        if (!res.ok) {
          throw new Error(`Failed to delete access control: ${res.status}`)
        }

        // Refresh data setelah delete
        await fetchAccessControls()

        toast({
          title: 'Success!',
          description:
            'The following access control has ben deleted:' +
            accessControlData.name,
        })

        return true // Berhasil
      } catch (err) {
        setErrorSnack(`Failed to delete access control: ${accessControlId}`)
        toast({
          title: 'Error!',
          description:
            'Something went wrong while deleting the access control.',
        })
        // eslint-disable-next-line no-console
        console.error(err)
        return false // Gagal
      }
    },
    [fetchAccessControls]
  )

  useEffect(() => {
    fetchAccessControls()
  }, [fetchAccessControls])

  return {
    accessControls,
    loading,
    error,
    errorSnack,
    saveAccessControl,
    deleteAccessControl,
    checkConnection,
  }
}
