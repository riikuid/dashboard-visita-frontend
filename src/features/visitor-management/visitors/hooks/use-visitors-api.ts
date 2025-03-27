import { useState, useEffect, useCallback } from 'react';
import { Visitor, VisitorFormData } from '../data/schema';
import { toast } from '@/hooks/use-toast';


export function useVisitorsApi() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorSnack, setErrorSnack] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch visitors
  const fetchVisitors = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/visitor`);
      if (!res.ok) {
        throw new Error(`Failed to fetch Visitors: ${res.status}`);
      }
      const data = await res.json();
    
      setVisitors(data);
    } catch (err) {
      setError('Error: ' + err);
      setVisitors([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create or update visit
  const saveVisitor = useCallback(
    async (data: VisitorFormData, visitId?: string) => {
      try {
        const isUpdate = !!visitId;
        const url = isUpdate
          ? `${import.meta.env.VITE_BACKEND_SERVER}/visitor/${visitId}`
          : `${import.meta.env.VITE_BACKEND_SERVER}/visitor`;
        const method = isUpdate ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`Failed to ${isUpdate ? 'update' : 'create'} visit: ${res.status}`);
        }

        // Refresh data setelah create/update
        await fetchVisitors();

        toast({
          title: 'Success!',
          description: `Visitor ${isUpdate ? 'updated' : 'created'} successfully.`,
        });

        return true; // Berhasil
      } catch (err) {
        setErrorSnack(`Failed to ${visitId ? 'update' : 'create'} visit`);
        toast({
          title: 'Error!',
          description: `Something went wrong while ${visitId ? 'updating' : 'creating'} the visit.\n ${err}`,
        });
        // eslint-disable-next-line no-console
        console.error(err);
        return false; // Gagal
      }
    },
    [fetchVisitors]
  );
  
  const deleteVisitor = useCallback(
    async (visitId: string, visitData: Visitor) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/visit/${visitId}`,
          {
            method: 'DELETE',
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to delete visit: ${res.status}`);
        }

        // Refresh data setelah delete
        await fetchVisitors();

        toast({
          title: 'Success!',
          description:`The following visit has ben deleted: ${visitData.id} - ${visitData.arrival_date}`
        });

        return true; // Berhasil
      } catch (err) {
        setErrorSnack(`Failed to delete visit: ${visitId}`);
        toast({
          title: 'Error!',
          description: 'Something went wrong while deleting the visit.',
        });
        // eslint-disable-next-line no-console
        console.error(err);
        return false; // Gagal
      }
    },
    [fetchVisitors]
  );

  useEffect(() => {
    fetchVisitors();
  }, [fetchVisitors]);

  return { visitors, loading, error, errorSnack, saveVisitor, deleteVisitor };
}