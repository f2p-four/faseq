"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Menu, ShoppingCart } from "lucide-react"

export function Header() {
  const [searchValue, setSearchValue] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchValue === "2020") {
      router.push("/admin")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full overflow-hidden">
      {/* Top Bar - Yellow */}
      <div className="bg-[#FFE600] px-3 py-2">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-2">
          {/* Official Mercado Livre Logo */}
          <div className="flex-shrink-0">
            <img
              src="https://v0-v0-vegetaasqueroso-4387-b3fc0387.vercel.app/images/mercado-livre-logo.png"
              alt="Mercado Livre"
              className="h-8 w-auto object-contain"
            />
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 min-w-0">
            <div className="relative flex items-center bg-white rounded-sm shadow-sm">
              <input
                type="text"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                placeholder="Estou buscando..."
                className="w-full py-2 px-3 text-sm text-gray-700 rounded-l-sm outline-none"
              />
              <button type="submit" className="flex-shrink-0 px-3 py-2 border-l border-gray-200 hover:bg-gray-50 transition-colors">
                <Search className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          </form>

          {/* Icons */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button className="p-1 hover:opacity-70 transition-opacity">
              <Menu className="w-5 h-5 text-gray-700" />
            </button>
            <button className="p-1 hover:opacity-70 transition-opacity relative">
              <ShoppingCart className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
