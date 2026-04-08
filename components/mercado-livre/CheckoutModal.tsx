"use client"

import { useState, useEffect } from "react"
import { X, Loader2, MapPin, Copy, Check, Clock } from "lucide-react"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const [step, setStep] = useState<"address" | "pix">("address")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState(600) // 10 minutos em segundos
  const [formData, setFormData] = useState({
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

  const pixCode = "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef1234567890520400005303986540564.905802BR5925MERCADO LIVRE LTDA6009SAO PAULO62140510COMPRA12346304E2CA"

  // Timer countdown
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const isFormValid = () => {
    return (
      formData.nome &&
      formData.telefone &&
      formData.cep &&
      formData.endereco &&
      formData.numero &&
      formData.bairro &&
      formData.cidade &&
      formData.estado
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isFormValid()) return

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setStep("pix")
    }, 1500)
  }

  const handleCopyPix = async () => {
    try {
      await navigator.clipboard.writeText(pixCode)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    } catch {
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = pixCode
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setCopied(true)
      setTimeout(() => setCopied(false), 3000)
    }
  }

  const handleClose = () => {
    setStep("address")
    setTimeLeft(600)
    setCopied(false)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60"
        onClick={handleClose}
      />

      {/* Address Form Modal */}
      {step === "address" && (
        <div className="relative bg-white w-full max-w-md mx-4 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto sm:mb-0 mb-0">
          {/* Header */}
          <div className="sticky top-0 bg-[#FFE600] px-4 py-3 flex items-center justify-between rounded-t-lg">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-700" />
              <h2 className="font-semibold text-gray-800">Endereco de Entrega</h2>
            </div>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-yellow-400 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            {/* Nome Completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome Completo *
              </label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Digite seu nome completo"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                required
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone / WhatsApp *
              </label>
              <input
                type="tel"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                required
              />
            </div>

            {/* CEP */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CEP *
              </label>
              <input
                type="text"
                name="cep"
                value={formData.cep}
                onChange={handleChange}
                placeholder="00000-000"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                required
              />
            </div>

            {/* Endereco */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Endereco *
              </label>
              <input
                type="text"
                name="endereco"
                value={formData.endereco}
                onChange={handleChange}
                placeholder="Rua, Avenida, etc."
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                required
              />
            </div>

            {/* Numero e Complemento */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Numero *
                </label>
                <input
                  type="text"
                  name="numero"
                  value={formData.numero}
                  onChange={handleChange}
                  placeholder="123"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Complemento
                </label>
                <input
                  type="text"
                  name="complemento"
                  value={formData.complemento}
                  onChange={handleChange}
                  placeholder="Apto, Bloco"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                />
              </div>
            </div>

            {/* Bairro */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bairro *
              </label>
              <input
                type="text"
                name="bairro"
                value={formData.bairro}
                onChange={handleChange}
                placeholder="Digite seu bairro"
                className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                required
              />
            </div>

            {/* Cidade e Estado */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Cidade *
                </label>
                <input
                  type="text"
                  name="cidade"
                  value={formData.cidade}
                  onChange={handleChange}
                  placeholder="Sua cidade"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#3483FA] focus:border-transparent"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estado *
                </label>
                <select
                  name="estado"
                  value={formData.estado}
                  onChange={handleChange}
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!isFormValid() || isLoading}
              className="w-full bg-[#3483FA] hover:bg-[#2968c8] disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium py-4 rounded-md transition-colors flex items-center justify-center gap-2 mt-6"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Processando...</span>
                </>
              ) : (
                <span>Continuar para pagamento</span>
              )}
            </button>

            {/* Security Note */}
            <p className="text-xs text-center text-gray-500 mt-3">
              Seus dados estao protegidos e serao usados apenas para entrega.
            </p>
          </form>
        </div>
      )}

      {/* PIX Bottom Sheet */}
      {step === "pix" && (
        <div className="relative bg-white w-full max-w-md mx-0 sm:mx-4 rounded-t-2xl sm:rounded-lg shadow-xl animate-slide-up">
          {/* Handle bar (mobile) */}
          <div className="flex justify-center pt-3 sm:hidden">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full" />
          </div>

          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Content */}
          <div className="p-6 pt-4">
            {/* Price */}
            <div className="text-center mb-6">
              <p className="text-sm text-gray-500 mb-1">Valor a pagar</p>
              <p className="text-4xl font-bold text-[#3483FA]">R$ 64,90</p>
            </div>

            {/* PIX Icon/Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-[#32BCAD] rounded-2xl flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-10 h-10 text-white fill-current">
                  <path d="M9.5 4.5L4.5 9.5L9.5 14.5L14.5 9.5L9.5 4.5ZM14.5 9.5L19.5 14.5L14.5 19.5L9.5 14.5L14.5 9.5Z" />
                </svg>
              </div>
            </div>

            {/* Copy PIX Button */}
            <button
              onClick={handleCopyPix}
              className={`w-full ${
                copied 
                  ? "bg-[#00a650] hover:bg-[#008c44]" 
                  : "bg-[#3483FA] hover:bg-[#2968c8]"
              } text-white font-semibold py-4 rounded-lg transition-all flex items-center justify-center gap-3 text-lg`}
            >
              {copied ? (
                <>
                  <Check className="w-6 h-6" />
                  <span>Codigo copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-6 h-6" />
                  <span>Copiar codigo PIX</span>
                </>
              )}
            </button>

            {/* Timer */}
            <div className="flex items-center justify-center gap-2 mt-4 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">
                Este codigo expira em{" "}
                <span className={`font-semibold ${timeLeft < 60 ? "text-red-500" : "text-gray-800"}`}>
                  {formatTime(timeLeft)}
                </span>
              </span>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-6" />

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Resumo da Compra</h3>
              <p className="text-sm text-gray-600">
                Camisa Selecao Brasileira - Edicao Especial
              </p>
              <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-500">Total</span>
                <span className="font-semibold text-gray-800">R$ 64,90</span>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 space-y-2">
              <p className="text-xs text-gray-500 text-center">
                1. Copie o codigo PIX acima
              </p>
              <p className="text-xs text-gray-500 text-center">
                2. Abra o app do seu banco e cole o codigo
              </p>
              <p className="text-xs text-gray-500 text-center">
                3. Confirme o pagamento e pronto!
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}
