"use client"

export function ProductDescription() {
  return (
    <div className="bg-white p-4">
      <h2 className="text-xl font-normal text-gray-800 mb-4">Descrição</h2>
      
      <div className="space-y-4 text-sm text-gray-700 leading-relaxed">
        <p>
          Lembrando todos os produtos são enviado dentro de 3hrs para compras feitas até às 14hrs. Após esse horário o envio será feito no dia seguinte!
        </p>

        <div className="space-y-1">
          <p><span className="text-gray-600">Indicado para:</span> Dia a Dia</p>
          <p><span className="text-gray-600">Produto:</span> Original e na Versão Torcedor</p>
          <p><span className="text-gray-600">Definição da Tecnologia:</span> Tecido de desempenho que afasta o suor da pele para ajudá-lo a se manter seco e confortável.</p>
          <p><span className="text-gray-600">Manga:</span> Manga Curta</p>
          <p><span className="text-gray-600">Escudo:</span> Patch</p>
          <p><span className="text-gray-600">Tipo:</span> Etiquetas e Tag da marca Oficial</p>
          <p><span className="text-gray-600">Camisa:</span> Pronta entrega / Envio imediato</p>
          <p><span className="text-gray-600">Patrocínio:</span> Oficial da equipe</p>
          <p><span className="text-gray-600">Composição:</span> 100% Poliéster</p>
          <p>Receba o seu produto no conforto de sua casa</p>
        </div>

        <div className="pt-4 border-t border-gray-200">
          <p className="text-gray-600">
            <span className="font-medium text-gray-800">Atendimento ao cliente:</span> Prezado cliente fique sempre atento as mensagens do vendedor, respondemos suas dúvidas de 10/30 minutos. Das 09 às 16hrs de segunda a sexta e aos sábados das 9:00 às 13hrs.
          </p>
        </div>
      </div>
    </div>
  )
}
