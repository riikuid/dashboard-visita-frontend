import { useState, useEffect, useCallback } from 'react'
import { toast } from '@/hooks/use-toast'
import { Department, DepartmentFormData } from '../data/schema'

// interface DepartmentFormData {
//   name: string;
// }

export function useDepartmentApi() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch departments
  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true)
      // const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/department`);
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_SERVER}/department`,
        {
          headers: {
            'Content-Type': 'application/json',
            'ngrok-skip-browser-warning': 'true',
          },
        }
      )
      console.log(res)
      if (!res.ok) {
        throw new Error(`Failed to fetch departments: ${res.status}`)
      }
      const data = await res.json()
      console.log(data)
      setDepartments(data)
    } catch (err) {
      setError('Error: ' + err)
      setDepartments([])
    } finally {
      setLoading(false)
    }
  }, [])

  // Create or update department
  const saveDepartment = useCallback(
    async (data: DepartmentFormData, departmentId?: string) => {
      try {
        const isUpdate = !!departmentId
        const url = isUpdate
          ? `${import.meta.env.VITE_BACKEND_SERVER}/department/${departmentId}`
          : `${import.meta.env.VITE_BACKEND_SERVER}/department`
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
            `Failed to ${isUpdate ? 'update' : 'create'} department: ${res.status}`
          )
        }

        // Refresh data setelah create/update
        await fetchDepartments()

        toast({
          title: 'Success!',
          description: `Department ${isUpdate ? 'updated' : 'created'} successfully.`,
        })

        return true // Berhasil
      } catch (err) {
        setError(`Failed to ${departmentId ? 'update' : 'create'} department`)
        toast({
          title: 'Error!',
          description: `Something went wrong while ${departmentId ? 'updating' : 'creating'} the department.`,
        })
        // eslint-disable-next-line no-console
        console.error(err)
        return false // Gagal
      }
    },
    [fetchDepartments]
  )

  const deleteDepartment = useCallback(
    async (departmentId: string) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/department/${departmentId}`,
          {
            method: 'DELETE',
          }
        )

        if (!res.ok) {
          throw new Error(`Failed to delete department: ${res.status}`)
        }

        // Refresh data setelah delete
        await fetchDepartments()

        return true // Berhasil
      } catch (err) {
        setError(`Failed to delete department: ${departmentId}`)
        toast({
          title: 'Error!',
          description: 'Something went wrong while deleting the department.',
        })
        // eslint-disable-next-line no-console
        console.error(err)
        return false // Gagal
      }
    },
    [fetchDepartments]
  )

  useEffect(() => {
    fetchDepartments()
  }, [fetchDepartments])

  return { departments, loading, error, saveDepartment, deleteDepartment }
}
