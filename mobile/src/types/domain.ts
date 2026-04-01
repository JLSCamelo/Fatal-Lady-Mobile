import { ImageSourcePropType } from "react-native";

export interface Categoria {
  id: number;
  nome: string;
  slug: string;
}

export interface Produto {
  id_produto: number;
  nome: string;
  nome_categoria: string;
  categoria: Categoria;
  preco: number;
  estoque: number;
  tamanhos: string;
  tamanhos_disponiveis: number[];
  caminhoimagem: ImageSourcePropType;
  cor: string;
  descricao: string;
  nota_media?: number;
  is_favorito?: boolean;
}

export interface Usuario {
  id_cliente: number;
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  genero: string;
  data_nascimento: string;
  is_admin?: boolean;
}

export interface ItemCarrinho {
  id: string;
  produto_id: number;
  produto: Produto;
  quantidade: number;
  preco_unitario: number;
  tamanho: number;
}

export interface ShippingQuote {
  cep: string;
  endereco: string;
  valor_frete: number;
  prazo_estimado_dias: number;
}

export interface LoginPayload {
  email: string;
  senha: string;
}

export interface RegisterPayload {
  nome: string;
  email: string;
  telefone: string;
  cpf: string;
  data_nascimento: string;
  genero: string;
  cep: string;
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  estado: string;
  senha: string;
  confirmarSenha: string;
  terms: boolean;
  newsletter: boolean;
}
