"use client"

import Image from "next/image"

const relatedProducts = [
  {
    id: 1,
    title: "Camisa Palmeiras I 2026/27 Linha Torcedor",
    originalPrice: "R$ 349",
    price: "R$ 219",
    cents: "90",
    discount: "36% OFF",
    installment: "6x R$ 36,65 sem juros",
    freeShipping: true,
    image: "https://http2.mlstatic.com/D_Q_NP_734729-MLB108193975599_032026-F-camisa-palmeiras-torcedor-masculina-2526-de-fato-e-campeo.webp",
  },
  {
    id: 2,
    title: "Camisa Futebol Seleção Torcedor Masculina Vá...",
    originalPrice: "R$ 78,99",
    price: "R$ 64",
    cents: "90",
    discount: "17% OFF",
    installment: null,
    freeShipping: true,
    image: "https://th.bing.com/th?id=OIF.pFi8UL%2fi3rFnSG0jJsod6A&rs=1&pid=ImgDetMain&o=7&rm=3",
  },
]

export function RelatedProducts() {
  return (
    <div className="bg-white p-4">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-normal text-gray-800">Produtos relacionados</h2>
        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded">Ad</span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {relatedProducts.map((product) => (
          <a
            key={product.id}
            href="#"
            className="group block"
          >
            <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-2">
              <Image
                src={product.image}
                alt={product.title}
                fill
                className="object-contain p-2 group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <h3 className="text-sm text-gray-700 leading-tight mb-1 line-clamp-2">
              {product.title}
            </h3>
            <p className="text-xs text-gray-400 line-through">{product.originalPrice}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-normal text-gray-800">
                {product.price}
              </span>
              <span className="text-sm text-gray-800">{product.cents}</span>
              <span className="text-xs text-[#00a650] font-medium ml-1">{product.discount}</span>
            </div>
            {product.installment && (
              <p className="text-xs text-[#00a650]">{product.installment}</p>
            )}
            {product.freeShipping && (
              <p className="text-xs text-[#00a650] mt-1">
                Frete grátis{" "}
                <span className="text-gray-500">por ser sua primeira compra</span>
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}
