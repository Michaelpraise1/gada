"use client";
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { searchProductsAction } from '@/actions/searchProducts';

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { formatPrice } = useCart();
  const searchRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced Search using Server Actions
  useEffect(() => {
    const fetchResults = async () => {
      if (query.trim().length === 0) {
        setResults([]);
        setIsOpen(false);
        return;
      }
      setIsLoading(true);
      setIsOpen(true);
      
      const data = await searchProductsAction(query);
      setResults(data);
      setIsLoading(false);
    };

    const debounceTimer = setTimeout(() => {
      fetchResults();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [query]);

  return (
    <div ref={searchRef} className="relative md:inline-flex hidden items-center bg-slate-100 rounded-xl w-full max-w-[320px] z-[100]">
      <Search className="w-5 h-5 text-gray-500 ml-4 shrink-0" />
      <input
        type="text"
        placeholder="Search for products..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={() => { if (query.trim().length > 0) setIsOpen(true); }}
        className="bg-transparent px-3 py-2.5 w-full border-none outline-none text-[14px] text-gray-700 placeholder-gray-400"
      />
      {query && (
        <button onClick={() => { setQuery(""); setIsOpen(false); }} className="px-3 shrink-0">
          <X className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors" />
        </button>
      )}

      {/* Flyout Dropdown Results */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-[12px] shadow-lg border border-gray-100 max-h-[350px] overflow-y-auto flex flex-col py-1">
          {isLoading ? (
            <div className="p-4 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-[#754DEB] animate-spin" />
            </div>
          ) : results.length > 0 ? (
            <div className="flex flex-col">
              {results.map((product) => {
                const img = Array.isArray(product.images) ? product.images[0] : product.images;
                return (
                  <Link 
                    key={product.id} 
                    href={`/product/${product.id}`}
                    onClick={() => { setQuery(""); setIsOpen(false); }}
                    className="flex flex-row items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors border-b border-gray-50 last:border-b-0"
                  >
                    <div className="relative w-11 h-11 rounded-md overflow-hidden bg-gray-100 shrink-0">
                      {img && (
                        <Image 
                          src={img} 
                          alt={product.name} 
                          fill 
                          sizes="44px"
                          className="object-cover" 
                        />
                      )}
                    </div>
                    <div className="flex flex-col flex-1 min-w-0">
                      <span className="text-[13px] font-semibold text-gray-900 truncate leading-tight mb-0.5">
                        {product.name}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[12px] text-[#754DEB] font-bold">
                          {formatPrice(product.actual_price_ngn)}
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : query.trim().length > 0 ? (
            <div className="p-6 text-sm text-center font-medium text-gray-500">
              No products found for "{query}"
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}
export default SearchBar;