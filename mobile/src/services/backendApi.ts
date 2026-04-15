import { productAssets } from "./assets";
import { Produto, RegisterPayload, Usuario } from "../types/domain";

const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || "").replace(/\/+$/, "");

function assertApiBaseUrl() {
  if (!API_BASE_URL) {
    throw new Error("Defina EXPO_PUBLIC_API_BASE_URL para conectar o mobile ao backend.");
  }
}

function buildUrl(path: string) {
  assertApiBaseUrl();
  return `${API_BASE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

function originFromBaseUrl() {
  assertApiBaseUrl();
  const url = new URL(API_BASE_URL);
  return `${url.protocol}//${url.host}`;
}

function toImageSource(imagePath?: string | null) {
  if (!imagePath) return productAssets.fallback;
  if (imagePath.startsWith("http://") || imagePath.startsWith("https://")) {
    return { uri: imagePath };
  }
  return { uri: `${originFromBaseUrl()}${imagePath}` };
}

function normalizeProduct(raw: any): Produto {
  const tamanhoList = Array.isArray(raw?.tamanhos_disponiveis)
    ? raw.tamanhos_disponiveis.map((value: any) => Number(value)).filter(Number.isFinite)
    : [];

  return {
    id_produto: Number(raw.id_produto),
    nome: String(raw.nome ?? ""),
    nome_categoria: String(raw.nome_categoria ?? raw?.categoria?.nome ?? "Calçados"),
    categoria: {
      id: Number(raw?.categoria?.id ?? 0),
      nome: String(raw?.categoria?.nome ?? raw.nome_categoria ?? "Calçados"),
      slug: String(raw?.categoria?.slug ?? "calcados"),
    },
    preco: Number(raw.preco ?? 0),
    estoque: Number(raw.estoque ?? 0),
    tamanhos: String(raw.tamanhos ?? ""),
    tamanhos_disponiveis: tamanhoList.length > 0 ? tamanhoList : [32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42],
    caminhoimagem: toImageSource(raw.caminhoimagem),
    cor: String(raw.cor ?? "Unspecified"),
    descricao: String(raw.descricao ?? ""),
    nota_media: typeof raw.nota_media === "number" ? raw.nota_media : undefined,
  };
}

async function parseJsonResponse(response: Response) {
  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = data?.detail || data?.message || "Falha ao comunicar com o backend.";
    throw new Error(message);
  }

  return data;
}

export async function fetchCatalogProducts() {
  const response = await fetch(buildUrl("/api/mobile/products"));
  const data = await parseJsonResponse(response);
  return Array.isArray(data?.items) ? data.items.map(normalizeProduct) : [];
}

export async function fetchProductById(productId: number) {
  const response = await fetch(buildUrl(`/api/mobile/products/${productId}`));
  const data = await parseJsonResponse(response);
  return normalizeProduct(data);
}

export async function loginWithBackend(email: string, senha: string): Promise<{ token: string; user: Usuario }> {
  const response = await fetch(buildUrl("/api/mobile/auth/login"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, senha }),
  });

  const data = await parseJsonResponse(response);
  return {
    token: String(data.token),
    user: data.user as Usuario,
  };
}

export async function registerWithBackend(payload: RegisterPayload): Promise<{ email: string; user: Usuario }> {
  const response = await fetch(buildUrl("/api/mobile/auth/register"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await parseJsonResponse(response);
  return {
    email: String(data.email),
    user: data.user as Usuario,
  };
}

export function hasBackendApiConfigured() {
  return Boolean(API_BASE_URL);
}
