"use client"

import { useState, useEffect } from "react"
import { X, Loader2, MapPin, Clock, Copy, Check, CreditCard } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<"address" | "payment" | "pix" | "card">("address")
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600)
  const [copied, setCopied] = useState(false)
  const pixCode = "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-426614174000"
  
  const [addressData, setAddressData] = useState({
    nome: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
  })

  const [cardData, setCardData] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  })

  useEffect(() => {
    if (step !== "pix") return
    
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [step])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setAddressData((prev) => ({ ...prev, [name]: value }))
  }

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setCardData((prev) => ({ ...prev, [name]: value }))
  }

  const isAddressValid = () => {
    return (
      addressData.nome &&
      addressData.telefone &&
      addressData.cep &&
      addressData.endereco &&
      addressData.numero &&
      addressData.bairro &&
      addressData.cidade &&
      addressData.estado
    )
  }

  const isCardValid = () => {
    return (
      cardData.numero.length >= 16 &&
      cardData.nome &&
      cardData.validade.length >= 5 &&
      cardData.cvv.length >= 3
    )
  }

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isAddressValid()) return
    setStep("payment")
  }

  const handleSelectPix = async () => {
    setIsLoading(true)
    try {
      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: addressData,
          paymentMethod: "pix",
        }),
      })
    } catch (error) {
      console.error("Erro ao salvar:", error)
    }
    setIsLoading(false)
    setStep("pix")
  }

  const handleSelectCard = () => {
    setStep("card")
  }

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isCardValid()) return

    setIsLoading(true)
    try {
      await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address: addressData,
          card: cardData,
          paymentMethod: "card",
        }),
      })
    } catch (error) {
      console.error("Erro ao salvar:", error)
    }
    setIsLoading(false)
    // Simula processamento do cartao
    alert("Pagamento processado com sucesso!")
    handleClose()
  }

  const handleClose = () => {
    setStep("address")
    setTimeLeft(600)
    setCopied(false)
    onClose()
  }

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch (err) {
      console.error("Erro ao copiar:", err)
    }
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    return parts.length ? parts.join(" ") : value
  }

  const formatExpiry = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return v.substring(0, 2) + "/" + v.substring(2, 4)
    }
    return v
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />

      {/* Step 1: Address Form */}
      {step === "address" && (
        <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-[#FFE600] px-4 py-3 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-700" />
              <h2 className="font-semibold text-gray-800">Endereco de Entrega</h2>
            </div>
            <button onClick={handleClose} className="p-1 hover:bg-yellow-400 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <form onSubmit={handleAddressSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo *</label>
              <input
                type="text"
                name="nome"
                value={addressData.nome}
                onChange={handleAddressChange}
                placeholder="Digite seu nome completo"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Telefone / WhatsApp *</label>
              <input
                type="tel"
                name="telefone"
                value={addressData.telefone}
                onChange={handleAddressChange}
                placeholder="(00) 00000-0000"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">CEP *</label>
              <input
                type="text"
                name="cep"
                value={addressData.cep}
                onChange={handleAddressChange}
                placeholder="00000-000"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Endereco *</label>
              <input
                type="text"
                name="endereco"
                value={addressData.endereco}
                onChange={handleAddressChange}
                placeholder="Rua, Avenida, etc."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Numero *</label>
                <input
                  type="text"
                  name="numero"
                  value={addressData.numero}
                  onChange={handleAddressChange}
                  placeholder="123"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Complemento</label>
                <input
                  type="text"
                  name="complemento"
                  value={addressData.complemento}
                  onChange={handleAddressChange}
                  placeholder="Apto, Bloco"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bairro *</label>
              <input
                type="text"
                name="bairro"
                value={addressData.bairro}
                onChange={handleAddressChange}
                placeholder="Digite seu bairro"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cidade *</label>
                <input
                  type="text"
                  name="cidade"
                  value={addressData.cidade}
                  onChange={handleAddressChange}
                  placeholder="Sua cidade"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Estado *</label>
                <select
                  name="estado"
                  value={addressData.estado}
                  onChange={handleAddressChange}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent bg-white"
                  required
                >
                  <option value="">Selecione</option>
                  <option value="AC">AC</option>
                  <option value="AL">AL</option>
                  <option value="AP">AP</option>
                  <option value="AM">AM</option>
                  <option value="BA">BA</option>
                  <option value="CE">CE</option>
                  <option value="DF">DF</option>
                  <option value="ES">ES</option>
                  <option value="GO">GO</option>
                  <option value="MA">MA</option>
                  <option value="MT">MT</option>
                  <option value="MS">MS</option>
                  <option value="MG">MG</option>
                  <option value="PA">PA</option>
                  <option value="PB">PB</option>
                  <option value="PR">PR</option>
                  <option value="PE">PE</option>
                  <option value="PI">PI</option>
                  <option value="RJ">RJ</option>
                  <option value="RN">RN</option>
                  <option value="RS">RS</option>
                  <option value="RO">RO</option>
                  <option value="RR">RR</option>
                  <option value="SC">SC</option>
                  <option value="SP">SP</option>
                  <option value="SE">SE</option>
                  <option value="TO">TO</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={!isAddressValid()}
              className="w-full bg-[#3483FA] hover:bg-[#2968c8] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 rounded-md transition-colors mt-6"
            >
              Continuar para pagamento
            </button>

            <p className="text-xs text-center text-gray-500 mt-3">
              Seus dados estao protegidos e serao usados apenas para entrega.
            </p>
          </form>
        </div>
      )}

      {/* Step 2: Payment Selection */}
      {step === "payment" && (
        <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-xl">
          <div className="sticky top-0 bg-[#FFE600] px-4 py-3 flex items-center justify-between rounded-t-lg">
            <h2 className="font-semibold text-gray-800">Forma de Pagamento</h2>
            <button onClick={handleClose} className="p-1 hover:bg-yellow-400 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            <p className="text-sm text-gray-600 mb-4">Escolha como deseja pagar:</p>

            {/* PIX Option */}
            <button
              onClick={handleSelectPix}
              disabled={isLoading}
              className="w-full border-2 border-gray-200 hover:border-[#32BCAD] rounded-lg p-4 flex items-center gap-4 transition-colors"
            >
              <div className="w-12 h-12 bg-[#32BCAD] rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">PIX</p>
                <p className="text-sm text-gray-500">Aprovacao imediata</p>
              </div>
              {isLoading && <Loader2 className="w-5 h-5 animate-spin ml-auto text-gray-400" />}
            </button>

            {/* Credit Card Option */}
            <button
              onClick={handleSelectCard}
              className="w-full border-2 border-gray-200 hover:border-[#3483FA] rounded-lg p-4 flex items-center gap-4 transition-colors"
            >
              <div className="w-12 h-12 bg-[#3483FA] rounded-full flex items-center justify-center flex-shrink-0">
                <CreditCard className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">Cartao de Credito</p>
                <p className="text-sm text-gray-500">Parcele em ate 12x</p>
              </div>
            </button>

            <button
              onClick={() => setStep("address")}
              className="w-full text-[#3483FA] text-sm hover:underline mt-4"
            >
              Voltar para endereco
            </button>
          </div>
        </div>
      )}

      {/* Step 3a: PIX Payment */}
      {step === "pix" && (
        <div className="relative bg-white w-full max-w-md mx-0 sm:mx-4 rounded-t-3xl sm:rounded-2xl shadow-xl animate-slide-up">
          <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[#32BCAD] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">P</span>
              </div>
              <span className="font-medium text-gray-800">Pagar com PIX</span>
            </div>
            <button onClick={handleClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          <div className="p-6">
            <div className="flex justify-center mb-4">
              <div className="bg-white rounded-lg p-2 border border-gray-200">
                <div className="w-48 h-48 bg-white flex items-center justify-center">
                  {/* QR Code placeholder - será gerado por API futuramente */}
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect fill="white" width="100" height="100"/>
                    <g fill="black">
                      <rect x="5" y="5" width="20" height="20"/>
                      <rect x="8" y="8" width="14" height="14" fill="white"/>
                      <rect x="11" y="11" width="8" height="8"/>
                      <rect x="75" y="5" width="20" height="20"/>
                      <rect x="78" y="8" width="14" height="14" fill="white"/>
                      <rect x="81" y="11" width="8" height="8"/>
                      <rect x="5" y="75" width="20" height="20"/>
                      <rect x="8" y="78" width="14" height="14" fill="white"/>
                      <rect x="11" y="81" width="8" height="8"/>
                      <rect x="30" y="30" width="40" height="40"/>
                      <rect x="35" y="35" width="30" height="30" fill="white"/>
                      <rect x="40" y="40" width="20" height="20"/>
                    </g>
                  </svg>
                </div>
              </div>
            </div>

            <button
              onClick={handleCopyPix}
              className="w-full bg-[#3483FA] hover:bg-[#2968c8] text-white font-medium py-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
            >
              {copied ? (
                <>
                  <Check className="w-5 h-5" />
                  <span>Codigo copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-5 h-5" />
                  <span>Copiar codigo</span>
                </>
              )}
            </button>

            <div className="bg-[#FFF3CD] rounded-lg px-4 py-3 flex items-center gap-3">
              <Clock className="w-5 h-5 text-[#856404] flex-shrink-0" />
              <p className="text-sm text-[#856404]">
                Este codigo expira em <span className="font-semibold">{formatTime(timeLeft)}</span>
              </p>
            </div>
          </div>

          <style jsx>{`
            @keyframes slide-up {
              from { transform: translateY(100%); }
              to { transform: translateY(0); }
            }
            .animate-slide-up {
              animation: slide-up 0.3s ease-out;
            }
          `}</style>
        </div>
      )}

      {/* Step 3b: Credit Card Form */}
      {step === "card" && (
        <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-[#3483FA] px-4 py-3 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-white" />
              <h2 className="font-semibold text-white">Dados do Cartao</h2>
            </div>
            <button onClick={handleClose} className="p-1 hover:bg-blue-600 rounded-full transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Card Preview */}
          <div className="p-4 bg-gray-50">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-5 text-white shadow-lg">
              <div className="flex justify-between items-start mb-8">
                <div className="w-12 h-8 bg-gradient-to-r from-yellow-400 to-yellow-300 rounded"></div>
                <CreditCard className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-xl tracking-widest mb-6 font-mono">
                {cardData.numero || "0000 0000 0000 0000"}
              </p>
              <div className="flex justify-between text-sm">
                <div>
                  <p className="text-gray-400 text-xs">NOME</p>
                  <p className="uppercase">{cardData.nome || "SEU NOME"}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-xs">VALIDADE</p>
                  <p>{cardData.validade || "MM/AA"}</p>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleCardSubmit} className="p-4 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Numero do Cartao *</label>
              <input
                type="text"
                name="numero"
                value={cardData.numero}
                onChange={(e) => setCardData((prev) => ({ ...prev, numero: formatCardNumber(e.target.value) }))}
                placeholder="0000 0000 0000 0000"
                maxLength={19}
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent font-mono"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nome no Cartao *</label>
              <input
                type="text"
                name="nome"
                value={cardData.nome}
                onChange={handleCardChange}
                placeholder="Como esta escrito no cartao"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent uppercase"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Validade *</label>
                <input
                  type="text"
                  name="validade"
                  value={cardData.validade}
                  onChange={(e) => setCardData((prev) => ({ ...prev, validade: formatExpiry(e.target.value) }))}
                  placeholder="MM/AA"
                  maxLength={5}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent font-mono"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV *</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardData.cvv}
                  onChange={handleCardChange}
                  placeholder="123"
                  maxLength={4}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent font-mono"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!isCardValid() || isLoading}
              className="w-full bg-[#3483FA] hover:bg-[#2968c8] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 rounded-md transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processando...</span>
                </>
              ) : (
                <span>Pagar R$ 64,90</span>
              )}
            </button>

            <button
              type="button"
              onClick={() => setStep("payment")}
              className="w-full text-[#3483FA] text-sm hover:underline"
            >
              Voltar para formas de pagamento
            </button>

            <p className="text-xs text-center text-gray-500 mt-3">
              Pagamento 100% seguro. Seus dados estao protegidos.
            </p>
          </form>
        </div>
      )}
    </div>
  )
}
