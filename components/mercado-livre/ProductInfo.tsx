"use client"

import { useState } from "react"
import { Heart, Share2, ShieldCheck, Zap, ShoppingCart } from "lucide-react"
import { CheckoutModal } from "./CheckoutModal"

const sizes = ["M", "2XL", "P", "G", "GG"]

export function ProductInfo() {
  const [selectedSize, setSelectedSize] = useState<string | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  return (
    <div className="bg-white p-4 space-y-4">
      {/* Product Status */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Novo</span>
        <span className="text-gray-300">|</span>
        <span>+99 vendidos</span>
      </div>

      {/* Product Title */}
      <h1 className="text-xl font-normal text-gray-800 leading-tight">
        Camisa Seleção Brasil Azul Torcedor Oficial Promoção
      </h1>

      {/* Color */}
      <div className="pt-2">
        <span className="text-sm text-gray-600">Cor: </span>
        <span className="text-sm font-medium text-gray-800">Azul</span>
      </div>

      {/* Size Selector */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Tamanho: <span className="font-medium text-gray-800">{selectedSize || "Escolha"}</span>
          </span>
          <button className="text-[#3483FA] text-sm flex items-center gap-1 hover:text-[#2968c8] transition-colors">
            Guia de tamanhos
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`min-w-[48px] h-10 px-3 border rounded-md text-sm font-medium transition-all ${
                selectedSize === size
                  ? "border-[#3483FA] text-[#3483FA] bg-blue-50"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Offer Badge */}
      <div className="pt-2">
        <span className="inline-flex items-center gap-1.5 bg-[#00a650] text-white text-xs font-semibold px-2.5 py-1.5 rounded">
          <Zap className="w-3 h-3 fill-current" />
          <span>OFERTA IMPERDIVEL</span>
        </span>
      </div>

      {/* Price */}
      <div className="space-y-1">
        <div className="flex items-baseline gap-1">
          <span className="text-3xl font-light text-gray-800">R$ 64</span>
          <span className="text-lg text-gray-800">99</span>
        </div>
        <p className="text-[#3483FA] text-sm">
          6x R$ 10,83 sem juros
        </p>
        <p>
          <span className="text-[#3483FA] text-xs cursor-pointer hover:underline">
            Ver os meios de pagamento
          </span>
        </p>
      </div>

      {/* Shipping */}
      <div className="space-y-1 pt-2">
        <p className="text-sm">
          <span className="text-[#00a650] font-medium">Chegará grátis amanhã</span>
          {" "}
          <span className="text-gray-600">por ser sua primeira compra</span>
        </p>
        <p className="text-[#3483FA] text-xs cursor-pointer hover:underline">
          Mais detalhes e formas de entrega
        </p>
      </div>

      {/* Return Policy */}
      <p className="text-sm pt-1">
        <span className="text-[#00a650] font-medium">Devolução grátis</span>
        {" "}
        <span className="text-gray-600">Você tem 30 dias a partir da data de recebimento.</span>
      </p>

      {/* Stock */}
      <div className="pt-2">
        <p className="text-sm font-medium text-gray-800">Estoque disponível</p>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3 pt-2">
        <button
          onClick={() => setIsCheckoutOpen(true)}
          className="w-full bg-[#3483FA] hover:bg-[#2968c8] text-white font-medium py-4 rounded-md transition-colors"
        >
          Comprar agora
        </button>
        <button className="w-full bg-[#e6f0ff] hover:bg-[#d4e4ff] text-[#3483FA] font-medium py-4 rounded-md transition-colors flex items-center justify-center gap-2">
          <ShoppingCart className="w-5 h-5" />
          Adicionar ao carrinho
        </button>
      </div>

      {/* Seller Info */}
      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm">
          <span className="text-gray-600">Vendido por </span>
          <span className="text-[#3483FA] cursor-pointer hover:underline">MC20251130001113</span>
        </p>
        <p className="text-sm text-gray-500 mt-1">+50 vendas</p>
      </div>

      {/* Guaranteed Purchase */}
      <div className="flex items-start gap-2 pt-3">
        <ShieldCheck className="w-5 h-5 text-[#00a650] flex-shrink-0 mt-0.5" />
        <p className="text-sm">
          <span className="text-[#00a650] font-medium">Compra Garantida.</span>
          {" "}
          <span className="text-gray-600">Receba o produto que está esperando ou devolvemos o dinheiro.</span>
        </p>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6 pt-4">
        <button className="flex items-center gap-2 text-[#3483FA] text-sm hover:text-[#2968c8] transition-colors">
          <Heart className="w-5 h-5" />
          <span>Adicionar aos favoritos</span>
        </button>
        <button className="flex items-center gap-2 text-[#3483FA] text-sm hover:text-[#2968c8] transition-colors">
          <Share2 className="w-5 h-5" />
          <span>Compartilhar</span>
        </button>
      </div>

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  )
}
