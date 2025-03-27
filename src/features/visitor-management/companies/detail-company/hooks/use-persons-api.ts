import { useState, useEffect, useCallback } from 'react';
import { Person, PersonFormData } from '../../data/schema';
import { toast } from '@/hooks/use-toast';


export function usePersonsApi() {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorSnack, setErrorSnack] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch companies
  const fetchPersons = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/person`);
      if (!res.ok) {
        throw new Error(`Failed to fetch Companies: ${res.status}`);
      }
      const data = await res.json();
      setPersons(data);
    } catch (err) {
      setError('Error: ' + err);
      setPersons([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create or update company
  const savePerson = useCallback(
    async (data: PersonFormData, companyId?: string) => {
      try {
        const isUpdate = !!companyId;
        const url = isUpdate
          ? `${import.meta.env.VITE_BACKEND_SERVER}/person/${companyId}`
          : `${import.meta.env.VITE_BACKEND_SERVER}/person`;
        const method = isUpdate ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`Failed to ${isUpdate ? 'update' : 'create'} person: ${res.status}`);
        }

        // Refresh data setelah create/update
        await fetchPersons();

        toast({
          title: 'Success!',
          description: `Person ${isUpdate ? 'updated' : 'created'} successfully.`,
        });

        return true; // Berhasil
      } catch (err) {
        setErrorSnack(`Failed to ${companyId ? 'update' : 'create'} company`);
        toast({
          title: 'Error!',
          description: `Something went wrong while ${companyId ? 'updating' : 'creating'} the company.\n ${err}`,
        });
        // eslint-disable-next-line no-console
        console.error(err);
        return false; // Gagal
      }
    },
    [fetchPersons]
  );
  
  const deletePerson = useCallback(
    async (personId: string, persondata: Person) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/person/${personId}`,
          {
            method: 'DELETE',
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to delete person: ${res.status}`);
        }

        // Refresh data setelah delete
        await fetchPersons();

        toast({
          title: 'Success!',
          description:'The following person has ben deleted:' + persondata.name
        });

        return true; // Berhasil
      } catch (err) {
        setErrorSnack(`Failed to delete person: ${personId}`);
        toast({
          title: 'Error!',
          description: 'Something went wrong while deleting the person.',
        });
        // eslint-disable-next-line no-console
        console.error(err);
        return false; // Gagal
      }
    },
    [fetchPersons]
  );

  useEffect(() => {
    fetchPersons();
  }, [fetchPersons]);

  return { persons, loading, error, errorSnack, savePerson, deletePerson };
}