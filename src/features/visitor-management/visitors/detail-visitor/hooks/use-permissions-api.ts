import { useState, useEffect, useCallback } from 'react';
import { z } from 'zod';
import { toast } from '@/hooks/use-toast';
import {
  visitorSchema,
  Permission,
  permissionSchema,
  permissionAccessControlFormData,
  permissionAccessControlSchema,
  PermissionFormData,
  Visitor,
  PermissionAccessControlFormData,
} from '../../data/schema';

export function usePermissionsApi(visitorId: string) {
  const [visitor, setVisitor] = useState<Visitor | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [errorSnack, setErrorSnack] = useState<string | null>(null);

  const fetchVisitorWithPermissions = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/visitor/${visitorId}`);
      if (!res.ok) {
        throw new Error(`Failed to fetch visitor: ${res.status}`);
      }
      const data = await res.json();
      const parsedData = visitorSchema.parse(data);
      setVisitor(parsedData);
      setPermissions(parsedData.permissions || []);
    } catch (err) {
      if (err instanceof z.ZodError) {
        // console.error('Zod validation error:', err.errors);
        setError('Invalid data format received from API');
        toast({
          title: 'Error!',
          description: 'The data received from the API does not match the expected format.',
          variant: 'destructive',
        });
      } else {
        setError('Error: ' + err);
        toast({
          title: 'Error!',
          description: `Failed to fetch visitor: ${err}`,
          variant: 'destructive',
        });
      }
      setVisitor(null);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  }, [visitorId]);
  
  const savePermission = useCallback(
    async (
      permissionData: PermissionFormData,
      permissionAccessControlData: PermissionAccessControlFormData,
      permissionId?: string
    ) => {
      try {
        const isUpdate = !!permissionId;
        let permission: Permission;
  
        if (isUpdate) {
          // Update permission
          const res = await fetch(
            `${import.meta.env.VITE_BACKEND_SERVER}/permission/${permissionId}`,
            {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(permissionData),
            }
          );
  
          if (!res.ok) {
            throw new Error(`Failed to update permission: ${res.status}`);
          }
  
          permission = await res.json();
          const parsedPermission = permissionSchema.parse(permission);
  
          // Update state untuk permission
          setPermissions((prev) =>
            prev.map((perm) => (perm.id === permissionId ? parsedPermission : perm))
          );
          setVisitor((prev) =>
            prev
              ? {
                  ...prev,
                  permissions: prev.permissions?.map((perm) =>
                    perm.id === permissionId ? parsedPermission : perm
                  ),
                }
              : prev
          );
  
          // Hapus permission access control lama
          await fetch(
            `${import.meta.env.VITE_BACKEND_SERVER}/permission-access-control/${permissionId}`,
            {
              method: 'DELETE',
            }
          );
  
          // Buat permission access control baru
          const accessControlRes = await fetch(
            `${import.meta.env.VITE_BACKEND_SERVER}/permission-access-control`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...permissionAccessControlData,
                permission_id: permissionId,
              }),
            }
          );
  
          if (!accessControlRes.ok) {
            throw new Error(`Failed to create permission access control: ${accessControlRes.status}`);
          }
  
          const newPermissionAccessControl = await accessControlRes.json();
          const parsedPermissionAccessControl = permissionAccessControlSchema.parse(
            newPermissionAccessControl
          );
  
          // Update state untuk permission access control
          setPermissions((prev) =>
            prev.map((perm) =>
              perm.id === permissionId
                ? {
                    ...perm,
                    permission_access_controls: [parsedPermissionAccessControl],
                  }
                : perm
            )
          );
          setVisitor((prev) =>
            prev
              ? {
                  ...prev,
                  permissions: prev.permissions?.map((perm) =>
                    perm.id === permissionId
                      ? {
                          ...perm,
                          permission_access_controls: [parsedPermissionAccessControl],
                        }
                      : perm
                  ),
                }
              : prev
          );
        } else {
          // Create permission
          const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/permission`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(permissionData),
          });
  
          if (!res.ok) {
            throw new Error(`Failed to create permission: ${res.status}`);
          }
  
          permission = await res.json();
          const parsedPermission = permissionSchema.parse(permission);
  
          // Update state untuk permission baru
          setPermissions((prev) => [...prev, parsedPermission]);
          setVisitor((prev) =>
            prev
              ? { ...prev, permissions: [...(prev.permissions || []), parsedPermission] }
              : prev
          );
  
          // Buat permission access control
          const accessControlRes = await fetch(
            `${import.meta.env.VITE_BACKEND_SERVER}/permission-access-control`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                ...permissionAccessControlData,
                permission_id: permission.id,
              }),
            }
          );
  
          if (!accessControlRes.ok) {
            throw new Error(`Failed to create permission access control: ${accessControlRes.status}`);
          }
  
          const newPermissionAccessControl = await accessControlRes.json();
          const parsedPermissionAccessControl = permissionAccessControlSchema.parse(
            newPermissionAccessControl
          );
  
          // Update state untuk permission access control
          setPermissions((prev) =>
            prev.map((perm) =>
              perm.id === permission.id
                ? {
                    ...perm,
                    permission_access_controls: [parsedPermissionAccessControl],
                  }
                : perm
            )
          );
          setVisitor((prev) =>
            prev
              ? {
                  ...prev,
                  permissions: prev.permissions?.map((perm) =>
                    perm.id === permission.id
                      ? {
                          ...perm,
                          permission_access_controls: [parsedPermissionAccessControl],
                        }
                      : perm
                  ),
                }
              : prev
          );
        }
  
        toast({
          title: 'Success!',
          description: `Permission ${isUpdate ? 'updated' : 'created'} successfully.`,
        });
  
        return true; // Berhasil
      } catch (err) {
        toast({
          title: 'Error!',
          description: `Failed to ${!!permissionId ? 'update' : 'create'} permission: ${err}`,
          variant: 'destructive',
        });
        console.error(err);
        return false; // Gagal
      }
    },
    []
  );

  const deletePermission = useCallback(
    async (permissionId: string, permissionData: Permission) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/permission/${permissionId}`,
          {
            method: 'DELETE',
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to delete permissions: ${res.status}`);
        }

        // Refresh data setelah delete
        await fetchVisitorWithPermissions();

        toast({
          title: 'Success!',
          description:`The following permission has ben deleted: ${permissionData.id} - ${permissionData.person.name}`
        });

        return true; // Berhasil
      } catch (err) {
        console.log(err)
        setErrorSnack(`Failed to delete permission: ${permissionId}`);
        toast({
          title: 'Error!',
          description: 'Something went wrong while deleting the visit.',
        });
        // eslint-disable-next-line no-console
        console.error(err);
        return false; // Gagal
      }
    },
    [fetchVisitorWithPermissions]
  );

  useEffect(() => {
    if (visitorId) {
      fetchVisitorWithPermissions();
    }
  }, [visitorId, fetchVisitorWithPermissions]);

  return {
    visitor,
    permissions,
    loading,
    error,
    savePermission,
    deletePermission,
  };
}