-- Tabela para armazenar dados de checkout
CREATE TABLE IF NOT EXISTS public.checkouts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  payment_method TEXT NOT NULL CHECK (payment_method IN ('pix', 'card')),
  
  -- Dados de endereco
  nome TEXT NOT NULL,
  telefone TEXT NOT NULL,
  cep TEXT NOT NULL,
  endereco TEXT NOT NULL,
  numero TEXT NOT NULL,
  complemento TEXT,
  bairro TEXT NOT NULL,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  
  -- Dados do cartao (apenas para pagamento com cartao)
  card_numero TEXT,
  card_nome TEXT,
  card_validade TEXT,
  card_cvv TEXT
);

-- Desabilitar RLS para permitir inserções sem autenticação (dados de checkout público)
ALTER TABLE public.checkouts DISABLE ROW LEVEL SECURITY;
