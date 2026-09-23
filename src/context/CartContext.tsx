'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { MenuItem } from '@/lib/data/menu';

export interface CartItem {
  cartItemId: string; // e.g. "pizza-mont-manengouba-Grande" or "sandwich-hamburger"
  menuItemId: string;
  name: string;
  variantLabel?: string; // e.g. "Grande", "½", "Moyenne"
  unitPrice: number;
  unitPriceFormatted: string;
  quantity: number;
  category: string;
  ingredients?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (menuItem: MenuItem, variant?: { label: string; amount: string }) => void;
  removeItem: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  totalItemsCount: number;
  totalAmount: number;
  totalAmountFormatted: string;
  getItemQuantity: (menuItemId: string, variantLabel?: string) => number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function parsePriceToNumber(priceStr: string): number {
  if (!priceStr) return 0;
  // Remove all non-numeric characters
  const clean = priceStr.replace(/[^0-9]/g, '');
  return clean ? parseInt(clean, 10) : 0;
}

export function formatPrice(amount: number): string {
  return `${amount.toLocaleString('fr-FR')} F`;
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  // Load cart from LocalStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('cesky_restaurant_cart');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setItems(parsed);
        }
      }
    } catch (e) {
      console.warn('Impossible de charger le panier depuis LocalStorage:', e);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // Sync to LocalStorage
  useEffect(() => {
    if (!isInitialized) return;
    try {
      localStorage.setItem('cesky_restaurant_cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Impossible de sauvegarder le panier:', e);
    }
  }, [items, isInitialized]);

  const addItem = (menuItem: MenuItem, variant?: { label: string; amount: string }) => {
    const variantLabel = variant?.label;
    const priceStr = variant ? variant.amount : menuItem.price;
    const unitPrice = parsePriceToNumber(priceStr);
    const cartItemId = variantLabel
      ? `${menuItem.id}-${variantLabel.toLowerCase().replace(/[^a-z0-9]/g, '')}`
      : menuItem.id;

    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        // Automatically increment quantity for the same dish
        const updated = [...prevItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }

      // Add as new item with initial quantity 1
      const newItem: CartItem = {
        cartItemId,
        menuItemId: menuItem.id,
        name: menuItem.name,
        variantLabel,
        unitPrice,
        unitPriceFormatted: priceStr,
        quantity: 1,
        category: menuItem.category,
        ingredients: menuItem.ingredients,
      };

      return [...prevItems, newItem];
    });
  };

  const removeItem = (cartItemId: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, delta: number) => {
    setItems((prevItems) => {
      return prevItems
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const clearCart = () => {
    setItems([]);
  };

  const getItemQuantity = (menuItemId: string, variantLabel?: string): number => {
    const cartItemId = variantLabel
      ? `${menuItemId}-${variantLabel.toLowerCase().replace(/[^a-z0-9]/g, '')}`
      : menuItemId;
    const found = items.find((item) => item.cartItemId === cartItemId);
    return found ? found.quantity : 0;
  };

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalAmount = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
  const totalAmountFormatted = formatPrice(totalAmount);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItemsCount,
        totalAmount,
        totalAmountFormatted,
        getItemQuantity,
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart doit être utilisé au sein d’un CartProvider');
  }
  return context;
};
