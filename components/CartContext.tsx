"use client"
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Currency = 'USD' | 'NGN' | 'GBP' | 'CAD' | 'GHS' | 'KES' | 'AEF';

export const fallbackRates: Record<Currency, number> = {
  NGN: 1,
  USD: 1 / 1400,
  GBP: 1 / 1800,
  CAD: 1 / 1000,
  GHS: 1 / 110,
  KES: 1 / 11.5,
  AEF: 1 / 2.5,
};

export const currencySymbols: Record<Currency, string> = {
  NGN: '₦',
  USD: '$',
  GBP: '£',
  CAD: 'C$',
  GHS: 'GH₵',
  KES: 'KSh',
  AEF: 'CFA ',
};

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string | number) => void;
  updateQuantity: (id: string | number, quantity: number) => void;
  cartCount: number;
  cartTotal: number;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  formatPrice: (priceInNgn: number) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [currency, setCurrencyState] = useState<Currency>('USD');
  const [isMounted, setIsMounted] = useState(false);
  const [liveRates, setLiveRates] = useState<Record<Currency, number>>(fallbackRates);

  // Poll exactly once on mount to get the blazing-fast live rates
  useEffect(() => {
    async function fetchLiveRates() {
      try {
        const response = await fetch('https://v6.exchangerate-api.com/v6/b7b496a8a418a2048c4060fc/latest/NGN');
        const data = await response.json();
        if (data && data.result === "success" && data.conversion_rates) {
          setLiveRates({
            NGN: data.conversion_rates.NGN || 1,
            USD: data.conversion_rates.USD || fallbackRates.USD,
            GBP: data.conversion_rates.GBP || fallbackRates.GBP,
            CAD: data.conversion_rates.CAD || fallbackRates.CAD,
            GHS: data.conversion_rates.GHS || fallbackRates.GHS,
            KES: data.conversion_rates.KES || fallbackRates.KES,
            // Fallback for AEF since API uses XAF (Central African CFA) or XOF (West African CFA)
            AEF: data.conversion_rates.XAF || data.conversion_rates.XOF || fallbackRates.AEF,
          });
        }
      } catch (error) {
        console.error("Failed to fetch live API currency exchange rates:", error);
      }
    }
    fetchLiveRates();
  }, []);

  // Initialize from LocalStorage safely on the client
  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('cart');
    const savedCurrency = localStorage.getItem('currency');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart storage", e);
      }
    }
    if (savedCurrency) {
      setCurrencyState(savedCurrency as Currency);
    }
  }, []);

  const setCurrency = (c: Currency) => {
    setCurrencyState(c);
    localStorage.setItem('currency', c);
  };

  // Sync to LocalStorage whenever cart changes
  useEffect(() => {
    if (isMounted) localStorage.setItem('cart', JSON.stringify(items));
  }, [items, isMounted]);

  const addItem = (product: Omit<CartItem, 'quantity'>) => {
    setItems(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        return current.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });
  };

  const removeItem = (id: string | number) => {
    setItems(current => current.filter(i => i.id !== id));
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) return;
    setItems(current => current.map(i => i.id === id ? { ...i, quantity } : i));
  };

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  const formatPrice = (priceInNgn: number) => {
    const rate = liveRates[currency] || fallbackRates[currency] || 1;
    const converted = priceInNgn * rate;
    return `${currencySymbols[currency]}${converted.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, cartCount, cartTotal, currency, setCurrency, formatPrice }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
