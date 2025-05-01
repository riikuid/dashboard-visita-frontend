import { useState, useEffect, useCallback } from 'react';
import { Company, CompanyFormData } from '../data/schema';
import { toast } from '@/hooks/use-toast';


export function useCompaniesApi() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorSnack, setErrorSnack] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch companies
  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/company`);
      if (!res.ok) {
        throw new Error(`Failed to fetch Companies: ${res.status}`);
      }
      const data = await res.json();
    
      setCompanies(data);
    } catch (err) {
      setError('Error: ' + err);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const saveVisitorCompany = useCallback(
    async (data: CompanyFormData, companyId?: string) => {
      try {
        const isUpdate = !!companyId;
        const url = isUpdate
          ? `${import.meta.env.VITE_BACKEND_SERVER}/company/${companyId}`
          : `${import.meta.env.VITE_BACKEND_SERVER}/company`;
        const method = isUpdate ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`Failed to ${isUpdate ? 'update' : 'create'} company: ${res.status}`);
        }

        // Ambil data company yang baru dibuat dari response (untuk POST)
        let newCompany: Company | null = null;
        if (!isUpdate) {
          newCompany = await res.json(); // Asumsi API mengembalikan data company baru
          if (!newCompany || !newCompany.id) {
            throw new Error('API did not return a valid company object.');
          }
        }

        // Refresh data setelah create/update
        await fetchCompanies();

        toast({
          title: 'Success!',
          description: `Company ${isUpdate ? 'updated' : 'created'} successfully.`,
        });

        return isUpdate ? true : newCompany; // Kembalikan true untuk update, atau object company untuk create
      } catch (err) {
        setErrorSnack(`Failed to ${companyId ? 'update' : 'create'} company`);
        toast({
          title: 'Error!',
          description: `Something went wrong while ${companyId ? 'updating' : 'creating'} the company.\n ${err}`,
        });
        return false; // Gagal
      }
    },
    [fetchCompanies]
  );

  // Create or update company
  const saveCompany = useCallback(
    async (data: CompanyFormData, companyId?: string) => {
      try {
        const isUpdate = !!companyId;
        const url = isUpdate
          ? `${import.meta.env.VITE_BACKEND_SERVER}/company/${companyId}`
          : `${import.meta.env.VITE_BACKEND_SERVER}/company`;
        const method = isUpdate ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`Failed to ${isUpdate ? 'update' : 'create'} company: ${res.status}`);
        }

        // Refresh data setelah create/update
        await fetchCompanies();

        toast({
          title: 'Success!',
          description: `Company ${isUpdate ? 'updated' : 'created'} successfully.`,
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
    [fetchCompanies]
  );
  
  const deleteCompany = useCallback(
    async (companyId: string, companyData: Company) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/company/${companyId}`,
          {
            method: 'DELETE',
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to delete company: ${res.status}`);
        }

        // Refresh data setelah delete
        await fetchCompanies();

        toast({
          title: 'Success!',
          description:'The following company has ben deleted:' + companyData.name
        });

        return true; // Berhasil
      } catch (err) {
        setErrorSnack(`Failed to delete company: ${companyId}`);
        toast({
          title: 'Error!',
          description: 'Something went wrong while deleting the company.',
        });
        // eslint-disable-next-line no-console
        console.error(err);
        return false; // Gagal
      }
    },
    [fetchCompanies]
  );

  useEffect(() => {
    fetchCompanies();
  }, [fetchCompanies]);

  return { companies, loading, error, errorSnack, saveCompany, saveVisitorCompany, deleteCompany };
}