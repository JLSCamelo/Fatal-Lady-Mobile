import React, { useMemo, useState } from "react";
import { Alert, Image, ScrollView, Text, useWindowDimensions, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { AppFooter } from "../../components/layout/AppFooter";
import { AppHeader } from "../../components/layout/AppHeader";
import { TextField } from "../../components/common/TextField";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { CartItemCard } from "../../components/cart/CartItemCard";
import { useAppStore } from "../../hooks/useAppStore";
import { imageAssets } from "../../services/assets";
import { formatCurrency, maskCep } from "../../utils/format";
import { getPagePadding } from "../../theme";
import { CartShippingState } from "./types";
import { styles } from "./styles";

export function CartScreen() {
  const navigation = useNavigation<any>();
  const { width } = useWindowDimensions();
  const pagePadding = getPagePadding(width);
  const {
    currentUser,
    cartItems,
    cartSubtotal,
    updateCartItemQuantity,
    removeCartItem,
    getShippingQuote,
  } = useAppStore();
  const [shipping, setShipping] = useState<CartShippingState>({
    cep: "",
    endereco: "",
    valorFrete: 0,
    prazo: 0,
  });
  const [loadingShipping, setLoadingShipping] = useState(false);
  const total = useMemo(() => cartSubtotal + shipping.valorFrete, [cartSubtotal, shipping.valorFrete]);

  async function handleCalculateShipping() {
    setLoadingShipping(true);
    try {
      const quote = await getShippingQuote(shipping.cep);
      setShipping((current) => ({
        ...current,
        endereco: quote.endereco,
        valorFrete: quote.valor_frete,
        prazo: quote.prazo_estimado_dias,
      }));
    } finally {
      setLoadingShipping(false);
    }
  }

  if (!currentUser) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingBottom: pagePadding }]}
        showsVerticalScrollIndicator={false}
      >
        <AppHeader />
        <View style={[styles.container, { paddingHorizontal: pagePadding }]}>
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>Login Necessário</Text>
            <Text style={styles.emptyText}>
              Você precisa estar logado para visualizar e finalizar os itens do seu carrinho.
            </Text>
            <PrimaryButton
              label="Fazer Login"
              onPress={() => navigation.getParent()?.navigate("Login", { redirectTo: "Cart" })}
            />
          </View>
        </View>
        <AppFooter />
      </ScrollView>
    );
  }

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingBottom: pagePadding }]}
      showsVerticalScrollIndicator={false}
    >
      <AppHeader />
      <View style={[styles.container, { paddingHorizontal: pagePadding }]}>
        <View style={styles.header}>
          <Text style={styles.title}>Meu Carrinho</Text>
          <Text style={styles.subtitle}>Revise seus produtos antes de finalizar a compra</Text>
        </View>

        {cartItems.length === 0 ? (
          <View style={styles.emptyState}>
            <Image source={imageAssets.cartEmpty} style={styles.emptyImage} resizeMode="contain" />
            <Text style={styles.emptyTitle}>Seu carrinho está vazio</Text>
            <Text style={styles.emptyText}>
              Adicione produtos e volte aqui para finalizar sua compra!
            </Text>
            <PrimaryButton
              label="Explorar Produtos"
              onPress={() => navigation.navigate("Catalog")}
            />
          </View>
        ) : (
          <>
            {cartItems.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrease={() => updateCartItemQuantity(item.id, item.quantidade + 1)}
                onDecrease={() => updateCartItemQuantity(item.id, item.quantidade - 1)}
                onRemove={() => removeCartItem(item.id)}
              />
            ))}

            <View style={styles.summaryCard}>
              <Text style={styles.summaryTitle}>Resumo do Pedido</Text>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Subtotal:</Text>
                <Text style={styles.summaryValue}>{formatCurrency(cartSubtotal)}</Text>
              </View>

              <View style={styles.shippingBox}>
                <TextField
                  label="Calcular Frete e Prazo"
                  placeholder="Seu CEP (00000-000)"
                  value={shipping.cep}
                  onChangeText={(value) =>
                    setShipping((current) => ({ ...current, cep: maskCep(value) }))
                  }
                  keyboardType="number-pad"
                />
                <PrimaryButton
                  label="CALCULAR"
                  onPress={handleCalculateShipping}
                  loading={loadingShipping}
                />
                {shipping.endereco ? (
                  <View style={styles.shippingBox}>
                    <Text style={styles.summaryLabel}>Endereço: {shipping.endereco}</Text>
                    <Text style={styles.summaryLabel}>Frete: {formatCurrency(shipping.valorFrete)}</Text>
                    <Text style={styles.summaryLabel}>Prazo: {shipping.prazo} dias</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.summaryRow}>
                <Text style={styles.summaryLabel}>Total:</Text>
                <Text style={styles.totalValue}>{formatCurrency(total)}</Text>
              </View>

              <PrimaryButton
                label="Finalizar Compra"
                onPress={() =>
                  Alert.alert("Checkout", "A finalização da compra ainda não está disponível no app mobile.")
                }
              />
              <PrimaryButton
                label="Continuar Comprando"
                variant="secondary"
                onPress={() => navigation.navigate("Catalog")}
              />
            </View>
          </>
        )}
      </View>
      <AppFooter />
    </ScrollView>
  );
}
