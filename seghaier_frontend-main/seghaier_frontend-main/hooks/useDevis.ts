import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface DevisItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
  reference: string;
  image: string;
}

interface DevisStore {
  items: DevisItem[];
  addItem: (item: DevisItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearDevis: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useDevis = create<DevisStore>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (item: DevisItem) => {
        set((state) => {
          const existing = state.items.find((i) => i.productId === item.productId);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.productId === item.productId
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              ),
            };
          }
          return { items: [...state.items, item] };
        });
      },
      
      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((i) => i.productId !== productId),
        }));
      },
      
      updateQuantity: (productId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((i) =>
            i.productId === productId ? { ...i, quantity } : i
          ),
        }));
      },
      
      clearDevis: () => set({ items: [] }),
      
      totalItems: () => {
        return get().items.reduce((sum, item) => sum + item.quantity, 0);
      },
      
      totalPrice: () => {
        return get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'devis-storage',
    }
  )
);