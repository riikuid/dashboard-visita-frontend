import { useState, useEffect, useCallback } from 'react';
import { Card, CardFormData } from '../data/schema';
import { toast } from '@/hooks/use-toast';


export function useCardsApi() {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [errorSnack, setErrorSnack] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch card
  const fetchCards = useCallback(async () => {
    try {
      setLoading(true);

      const res = await fetch(`${import.meta.env.VITE_BACKEND_SERVER}/rfid`);
      if (!res.ok) {
        throw new Error(`Failed to fetch card: ${res.status}`);
      }


      const data = await res.json();
    
      setCards(data);
    } catch (err) {
      setError('' + err);
      setCards([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Create or update card
  const saveCard = useCallback(
    async (data: CardFormData, cardId?: string) => {
      try {
        const isUpdate = !!cardId;
        const url = isUpdate
          ? `${import.meta.env.VITE_BACKEND_SERVER}/rfid/${cardId}`
          : `${import.meta.env.VITE_BACKEND_SERVER}/rfid`;
        const method = isUpdate ? 'PUT' : 'POST';

        const res = await fetch(url, {
          method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (!res.ok) {
          throw new Error(`Failed to ${isUpdate ? 'update' : 'create'} access control: ${res.status}`);
        }

        // Refresh data setelah create/update
        await fetchCards();

        toast({
          title: 'Success!',
          description: `Access control ${isUpdate ? 'updated' : 'created'} successfully.`,
        });

        return true; // Berhasil
      } catch (err) {
        setErrorSnack(`Failed to ${cardId ? 'update' : 'create'} access control`);
        toast({
          title: 'Error!',
          description: `Something went wrong while ${cardId ? 'updating' : 'creating'} the access control.\n ${err}`,
        });
        // eslint-disable-next-line no-console
        console.error(err);
        return false; // Gagal
      }
    },
    [fetchCards]
  );
  
  const deleteCard = useCallback(
    async (cardId: string, cardData: Card) => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_SERVER}/rfid/${cardId}`,
          {
            method: 'DELETE',
          }
        );

        if (!res.ok) {
          throw new Error(`Failed to delete card: ${res.status}`);
        }

        // Refresh data setelah delete
        await fetchCards();

        toast({
          title: 'Success!',
          description:'The following card has ben deleted:' + cardData.name
        });

        return true; // Berhasil
      } catch (err) {
        setErrorSnack(`Failed to delete card: ${cardId}`);
        toast({
          title: 'Error!',
          description: 'Something went wrong while deleting the card.',
        });
        // eslint-disable-next-line no-console
        console.error(err);
        return false; // Gagal
      }
    },
    [fetchCards]
  );

  useEffect(() => {
    fetchCards();
  }, [fetchCards]);

  return { cards, loading, error, errorSnack, saveCard, deleteCard };
}