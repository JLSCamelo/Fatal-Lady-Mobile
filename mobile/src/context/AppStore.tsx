import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

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
import {
  fetchCatalogProducts,
  hasBackendApiConfigured,
  loginWithBackend,
  registerWithBackend,
} from "../services/backendApi";

interface AppStoreValue {
  products: Produto[];
  currentUser: Usuario | null;
  favorites: number[];
  cartItems: ItemCarrinho[];
  cartCount: number;
  cartSubtotal: number;
  authToken: string | null;
  productsLoading: boolean;
  productsError: string | null;
  login: (payload: LoginPayload) => Promise<{ ok: boolean; message?: string }>;
  logout: () => void;
  register: (
    payload: RegisterPayload
  ) => Promise<{ ok: boolean; message?: string; email?: string }>;
  toggleFavorite: (productId: number) => void;
  addToCart: (
    product: Produto,
    tamanho: number | null,
    quantidade: number
  ) => { ok: boolean; reason?: "auth" | "size" };
  updateCartItemQuantity: (itemId: string, quantity: number) => void;
  removeCartItem: (itemId: string) => void;
  getProductById: (productId: number) => Produto | undefined;
  getShippingQuote: (cep: string) => Promise<ShippingQuote>;
  refreshProducts: () => Promise<void>;
}

const AppStoreContext = createContext<AppStoreValue | undefined>(undefined);

export function AppStoreProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Produto[]>(mockProducts);
  const [currentUser, setCurrentUser] = useState<Usuario | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [cartItems, setCartItems] = useState<ItemCarrinho[]>(initialCartItems);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [productsLoading, setProductsLoading] = useState(false);
  const [productsError, setProductsError] = useState<string | null>(null);

  const cartCount = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantidade, 0),
    [cartItems]
  );

  const cartSubtotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.quantidade * item.preco_unitario, 0),
    [cartItems]
  );

  async function refreshProducts() {
    if (!hasBackendApiConfigured()) {
      setProductsError("Backend não configurado. Usando catálogo local.");
      return;
    }

    setProductsLoading(true);
    setProductsError(null);

    try {
      const remoteProducts = await fetchCatalogProducts();
      if (remoteProducts.length > 0) {
        setProducts(remoteProducts);
      } else {
        setProductsError("O backend respondeu sem produtos.");
      }
    } catch (error) {
      setProductsError(
        error instanceof Error ? error.message : "Falha ao carregar produtos do backend."
      );
    } finally {
      setProductsLoading(false);
    }
  }

  useEffect(() => {
    refreshProducts();
  }, []);

  async function login(payload: LoginPayload) {
    try {
      const result = await loginWithBackend(payload.email, payload.senha);
      setAuthToken(result.token);
      setCurrentUser(result.user);
      return { ok: true };
    } catch (error) {
      return {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Falha ao autenticar no backend.",
      };
    }
  }

  function logout() {
    setCurrentUser(null);
    setAuthToken(null);
  }

  async function register(payload: RegisterPayload) {
    try {
      const result = await registerWithBackend(payload);
      return { ok: true, email: result.email };
    } catch (error) {
      return {
        ok: false,
        message:
          error instanceof Error
            ? error.message
            : "Falha ao cadastrar no backend.",
      };
    }
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
      authToken,
      productsLoading,
      productsError,
      login,
      logout,
      register,
      toggleFavorite,
      addToCart,
      updateCartItemQuantity,
      removeCartItem,
      getProductById,
      getShippingQuote,
      refreshProducts,
    }),
    [
      products,
      currentUser,
      favorites,
      cartItems,
      cartCount,
      cartSubtotal,
      authToken,
      productsLoading,
      productsError,
    ]
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
