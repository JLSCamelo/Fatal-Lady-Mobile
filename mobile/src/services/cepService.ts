import { onlyDigits } from "../utils/format";

export interface AddressLookup {
  rua: string;
  bairro: string;
  cidade: string;
  estado: string;
}

export async function lookupCep(cep: string): Promise<AddressLookup | null> {
  const digits = onlyDigits(cep);

  if (digits.length !== 8) {
    return null;
  }

  try {
    const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
    const data = await response.json();

    if (data?.erro) {
      return null;
    }

    return {
      rua: data.logradouro || "",
      bairro: data.bairro || "",
      cidade: data.localidade || "",
      estado: data.uf || "",
    };
  } catch {
    return null;
  }
}
