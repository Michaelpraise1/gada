"use client"
import React, { useState } from 'react'
// import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,

  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from 'lucide-react'
import { useCart, Currency } from './CartContext'

const CurrencyIcon = () => {
  const { currency, setCurrency } = useCart();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-1 px-3 py-2 border-2 bg-gray-200 rounded-md text-sm">
        {currency}
        <ChevronDown size={16} />
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => setCurrency("USD")}>
          USD
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setCurrency("NGN")}>
          NGN
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setCurrency("GBP")}>
          GBP
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setCurrency("CAD")}>
          CAD
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setCurrency("GHS")}>
          GHS
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setCurrency("KES")}>
          KES
        </DropdownMenuItem>

        <DropdownMenuItem onClick={() => setCurrency("AEF")}>
          AEF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CurrencyIcon;