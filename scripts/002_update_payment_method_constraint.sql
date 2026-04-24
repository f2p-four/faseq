-- Remover a constraint antiga
ALTER TABLE public.checkouts DROP CONSTRAINT IF EXISTS checkouts_payment_method_check;

-- Adicionar nova constraint que permite 'pending', 'pix' e 'card'
ALTER TABLE public.checkouts ADD CONSTRAINT checkouts_payment_method_check 
  CHECK (payment_method IN ('pending', 'pix', 'card'));
