import React, { createContext, useContext, useMemo, useState } from "react";

import { initialCartItems, mockProducts } from "../services/mockData";
import {
  ItemCarrinho,
  LoginPayload,
  Produto,
  RegisterPayload,
  ShippingQuote,
  Usuario,
} from "../types/domain";
import { calculateShipping } from "../services/shippingService";

interface AppStoreValue {
  products: Produto[];
  currentUser: Usuario | null;
  favorites: number[];
  cartItems: ItemCarrinho[];
  cartCount: number;
  cartSubtotal: number;
  login: (payload: LoginPayload) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
  register: (payload: RegisterPayload) => Promise<{ ok: boolean }>;
  toggleFavorite: (productId: number) => void;
  addToCart: (product: Produto, tamanho: number | null, quantidade: number) => { ok: boolean; reason?: "auth" | "size" };
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  removeCartItem: (itemId: string) => void;
  getProductById: (productId: number) => Produto | undefined;
  getShippingQuote: (cep: string) => Promise<ShippingQuote>;
}

const AppStoreContext = createContext<AppStoreValue | undefined>(undefined);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [products] = useState<Produto[]>(mockProducts);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [favorites, setFavorites] = useState<number[]>([1001, 2001]);
  const [cartItems, setCartItems] = useState<ItemCarrinho[]>(initialCartItems);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantidade, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantidade * item.preco_unitario, 0),
    [cartItems]
  );

  async function login(payload: LoginPayload) {
    if (!payload.email.trim() || !payload.senha.trim()) {
      return { ok: false, message: "Usuário ou senha incorretos." };
    }

    const nameSeed = payload.email.split("@")[0] || "Cliente";
    const firstName = nameSeed.charAt(0).toUpperCase() + nameSeed.slice(1);

    setCurrentUser({
      id_cliente: 1,
      nome: `${firstName} Fatal Lady`,
      email: payload.email.trim(),
      telefone: "(11) 99999-9999",
      cpf: "12345678910",
      genero: "Feminino",
      data_nascimento: "1997-06-15",
    });

    return { ok: true };
  }

  function logout() {
    setCurrentUser(null);
  }

  async function register(_: RegisterPayload) {
    return { ok: true };
  }

  function toggleFavorite(productId: number) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }

  function addToCart(product: Produto, tamanho: number | null, quantidade: number) {
    if (!currentUser) return { ok: false as const, reason: "auth" as const };
    if (!tamanho) return { ok: false as const, reason: "size" as const };

    setCartItems((current) => {
      const found = current.find(
        (item) => item.produto_id === product.id_produto && item.tamanho === tamanho
      );

      if (found) {
        return current.map((item) =>
          item.id === found.id
            ? { ...item, quantidade: Math.min(item.quantidade + quantidade, 5) }
            : item
        );
      }

      return [
        ...current,
        {
          id: `cart-${product.id_produto}-${tamanho}`,
          produto_id: product.id_produto,
          produto: product,
          quantidade,
          preco_unitario: product.preco,
          tamanho,
        },
      ];
    });

    return { ok: true as const };
  }

  function updateCartItemQuantity(itemId: string, quantity: number) {
    setCartItems((current) =>
      current.map((item) =>
        item.id === itemId ? { ...item, quantidade: Math.max(1, Math.min(quantity, 5)) } : item
      )
    );
  }

  function removeCartItem(itemId: string) {
    setCartItems((current) => current.filter((item) => item.id !== itemId));
  }

  function getProductById(productId: number) {
    return products.find((item) => item.id_produto === productId);
  }

  async function getShippingQuote(cep: string) {
    return calculateShipping(cep);
  }

  const value = useMemo<AppStoreValue>(
    () => ({
      products,
      currentUser,
      favorites,
      cartItems,
      cartCount,
      cartSubtotal,
      login,
      logout,
      register,
      toggleFavorite,
      addToCart,
      updateCartItemQuantity,
      removeCartItem,
      getProductById,
      getShippingQuote,
    }),
    [products, currentUser, favorites, cartItems, cartCount, cartSubtotal]
  );

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
}

export function useAppStoreContext() {
  const context = useContext(AppStoreContext);
  if (!context) {
    throw new Error("useAppStoreContext must be used inside AppStoreProvider");
  }
  return context;
}
