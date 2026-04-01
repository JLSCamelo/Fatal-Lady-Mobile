import { ShippingQuote } from "../types/domain";
import { onlyDigits } from "../utils/format";

export async function calculateShipping(cep: string): Promise<ShippingQuote> {
  const digits = onlyDigits(cep);

  if (digits.length !== 8) {
    throw new Error("Digite um CEP válido com 8 dígitos.");
  }

  const firstTwo = Number(digits.slice(0, 2));

  if (firstTwo <= 19) {
    return {
      cep: digits,
      endereco: "São Paulo, SP",
      valor_frete: 18.9,
      prazo_estimado_dias: 2,
    };
  }

  if (firstTwo <= 39) {
    return {
      cep: digits,
      endereco: "Sudeste / Centro-Oeste",
      valor_frete: 22.5,
      prazo_estimado_dias: 4,
    };
  }

  return {
    cep: digits,
    endereco: "Demais regiões do Brasil",
    valor_frete: 27.9,
    prazo_estimado_dias: 6,
  };
}
