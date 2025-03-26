import { z } from 'zod'
import { departmentSchema, Department } from './schema'

const departmentArraySchema = z.array(departmentSchema)

export async function fetchDepartments(): Promise<Department[]> {
  try {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/department`)
    if (!res.ok) {
      throw new Error(`Failed to fetch departments: ${res.status}`)
    }

    const data = await res.json()
    const validated = departmentArraySchema.parse(data)

    return validated
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error fetching departments:', error)
    return []
  }
}

// ❗ Ini akan menghasilkan Promise<Department[]>
export const departments = fetchDepartments()
