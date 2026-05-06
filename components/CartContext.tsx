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
  cartEntryId?: number; 
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

  const API_BASE_URL = 'https://gada-web-backend.vercel.app';

  // Sync with Backend on mount
  useEffect(() => {
    async function syncWithBackend() {
      try {
        const response = await fetch(`${API_BASE_URL}/v1/carts/all`);
        if (!response.ok) {
          console.warn(`Cart sync skipped: backend returned ${response.status}`);
          return;
        }
        const result = await response.json();
        
        if (result.success && Array.isArray(result.data)) {
          const syncedItems: CartItem[] = result.data.map((entry: any) => ({
            id: entry.product.id,
            cartEntryId: entry.id,
            name: entry.product.name,
            price: parseFloat(entry.product.discount_price_ngn || entry.product.actual_price_ngn),
            quantity: entry.no_of_items,
            image: entry.product.images?.[0]
          }));
          setItems(syncedItems);
        }
      } catch (error) {
        console.error("Failed to sync cart with backend:", error);
      }
    }

    if (isMounted) syncWithBackend();
  }, [isMounted]);

  // Poll exactly once on mount to get the blazing-fast live rates, cached for 4 hours to protect API limits
  useEffect(() => {
    async function fetchLiveRates() {
      try {
        
        const cachedRatesStr = localStorage.getItem('exchangeRatesCache');
        if (cachedRatesStr) {
          try {
            const cache = JSON.parse(cachedRatesStr);
            const fourHoursInMs = 4 * 60 * 60 * 1000;
            
            if (Date.now() - cache.timestamp < fourHoursInMs) {
              setLiveRates(cache.rates);
              return
            }
          } catch (cacheError) {
            console.warn("Invalid cache data, will fetch fresh rates:", cacheError);
          }
        }

        const response = await fetch('https://v6.exchangerate-api.com/v6/b7b496a8a418a2048c4060fc/latest/NGN');
        
        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const data = await response.json();
        
        if (data && data.result === "success" && data.conversion_rates) {
          const newRates = {
            NGN: data.conversion_rates.NGN || 1,
            USD: data.conversion_rates.USD || fallbackRates.USD,
            GBP: data.conversion_rates.GBP || fallbackRates.GBP,
            CAD: data.conversion_rates.CAD || fallbackRates.CAD,
            GHS: data.conversion_rates.GHS || fallbackRates.GHS,
            KES: data.conversion_rates.KES || fallbackRates.KES,
           
            AEF: data.conversion_rates.XAF || data.conversion_rates.XOF || fallbackRates.AEF,
          };

          setLiveRates(newRates);

          // 3. Save the brand new rates directly to LocalStorage timestamped
          localStorage.setItem('exchangeRatesCache', JSON.stringify({
            timestamp: Date.now(),
            rates: newRates
          }));
        }
      } catch (error) {
        console.error("Failed to fetch live API currency exchange rates:", error);
      }
    }
    
    // Ensure we only try touching localStorage on the browser natively
    if (typeof window !== 'undefined') {
      fetchLiveRates();
    }
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

  const addItem = async (product: Omit<CartItem, 'quantity'>) => {
    // 1. Optimistic Update
    setItems(current => {
      const existing = current.find(item => item.id === product.id);
      if (existing) {
        return current.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...current, { ...product, quantity: 1 }];
    });

    // 2. Sync to Backend
    try {
      const response = await fetch(`${API_BASE_URL}/v1/carts/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product_id: product.id,
          no_items: 1
        })
      });
      if (!response.ok) {
        console.warn(`Cart add skipped: backend returned ${response.status}`);
        return;
      }
      const result = await response.json();
      if (result.success) {
        // Update the cartEntryId from backend response
        setItems(current => current.map(item => 
          item.id === product.id ? { ...item, cartEntryId: result.data.id } : item
        ));
      }
    } catch (error) {
      console.error("Failed to add item to backend cart:", error);
    }
  };

  const removeItem = async (id: string | number) => {
    const itemToRemove = items.find(i => i.id === id);
    
    // 1. Optimistic Update
    setItems(current => current.filter(i => i.id !== id));

    // 2. Sync to Backend
    if (itemToRemove?.cartEntryId) {
      try {
        const res = await fetch(`${API_BASE_URL}/v1/carts/delete/${itemToRemove.cartEntryId}`, {
          method: 'DELETE'
        });
        if (!res.ok) {
          console.warn(`Cart delete skipped: backend returned ${res.status}`);
        }
      } catch (error) {
        console.error("Failed to delete item from backend cart:", error);
      }
    }
  };

  const updateQuantity = (id: string | number, quantity: number) => {
    if (quantity < 1) return;
    setItems(current => current.map(i => i.id === id ? { ...i, quantity } : i));
    // Note: Backend lacks a direct quantity update, so for now we rely on the next refresh/sync
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
