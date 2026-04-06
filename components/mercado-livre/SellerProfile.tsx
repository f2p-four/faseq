"use client"

import { MessageSquare, Clock, Package } from "lucide-react"

export function SellerProfile() {
  return (
    <div className="bg-white p-4">
      <h2 className="text-lg font-normal text-gray-800 mb-1">
        Vendido por MC20251130001113
      </h2>
      <p className="text-sm text-gray-500 mb-4">+25 Produtos</p>

      {/* Reputation Bar */}
      <div className="flex gap-0.5 mb-4">
        <div className="h-2 flex-1 bg-red-500 rounded-l-full" />
        <div className="h-2 flex-1 bg-orange-400" />
        <div className="h-2 flex-1 bg-yellow-400" />
        <div className="h-2 flex-1 bg-lime-400" />
        <div className="h-2 flex-1 bg-[#00a650] rounded-r-full relative">
          <div className="absolute -top-1 right-0 w-4 h-4 bg-[#00a650] rotate-45 transform translate-x-1" />
        </div>
      </div>

      {/* Stats */}
      <div className="flex justify-between py-4 border-t border-gray-100">
        <div className="flex flex-col items-center text-center">
          <Package className="w-6 h-6 text-gray-400 mb-2" />
          <span className="text-sm font-medium text-gray-800">+50</span>
          <span className="text-xs text-gray-500">Vendas</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <MessageSquare className="w-6 h-6 text-gray-400 mb-2" />
          <span className="text-sm font-medium text-gray-800">Bom atendimento</span>
          <span className="text-xs text-gray-500 invisible">-</span>
        </div>
        <div className="flex flex-col items-center text-center">
          <Clock className="w-6 h-6 text-[#00a650] mb-2" />
          <span className="text-sm font-medium text-[#00a650]">Entrega no prazo</span>
          <span className="text-xs text-gray-500 invisible">-</span>
        </div>
      </div>
    </div>
  )
}
