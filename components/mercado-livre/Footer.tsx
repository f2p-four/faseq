"use client"

export function Footer() {
  const links = [
    { label: "Minha conta", href: "#" },
    { label: "Compras", href: "#" },
    { label: "Histórico", href: "#" },
    { label: "Ofertas", href: "#" },
    { label: "Favoritos", href: "#" },
    { label: "Lojas oficiais", href: "#" },
    { label: "Categorias", href: "#" },
    { label: "Meli+", href: "#" },
    { label: "Contato", href: "#" },
    { label: "Vender", href: "#" },
    { label: "Programa de Afiliados", href: "#" },
  ]

  return (
    <footer className="bg-white">
      {/* App Banner */}
      <div className="bg-[#FFE600] px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-center gap-3">
          <div className="flex-shrink-0">
            <img
              src="/images/mercado-livre-logo.png"
              alt="Mercado Livre"
              className="h-10 w-auto object-contain"
            />
          </div>
          <span className="text-gray-800 font-medium">
            <span className="text-[#3483FA]">Compre</span> e{" "}
            <span className="text-[#3483FA]">venda</span> com o app!
          </span>
        </div>
      </div>

      {/* Links */}
      <div className="px-4 py-6">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-y-4 gap-x-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-gray-600 hover:text-[#3483FA] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="px-4 py-4 border-t border-gray-200">
        <div className="max-w-6xl mx-auto text-center text-xs text-gray-500">
          <p>Copyright © 1999-2026 Ebazar.com.br LTDA.</p>
          <p className="mt-1">
            Rua Artur de Azevedo, 1.005 - Pinheiros, São Paulo/SP - CEP: 05404-001
          </p>
        </div>
      </div>
    </footer>
  )
}
