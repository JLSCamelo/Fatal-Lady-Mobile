import React, { useMemo, useState } from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { PrimaryButton } from "../../components/common/PrimaryButton";
import { AppFooter } from "../../components/layout/AppFooter";
import { AppHeader } from "../../components/layout/AppHeader";
import { useAppStore } from "../../hooks/useAppStore";
import { formatCurrency, formatInstallment } from "../../utils/format";
import { RootStackParamList } from "../../types/navigation";
import { ProductModalType } from "./types";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Product">;

export function ProductScreen({ navigation, route }: Props) {
  const { getProductById, addToCart } = useAppStore();
  const product = getProductById(route.params.productId);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [modal, setModal] = useState<ProductModalType>("none");

  const features = useMemo(
    () => [
      { title: "Frete grátis acima de R$ 299", text: "Entrega rápida para pedidos elegantes." },
      { title: "Primeira troca grátis", text: "Mais segurança na sua primeira compra." },
      { title: "Parcele em até 3x sem juros", text: "Flexibilidade para finalizar seu pedido." },
    ],
    []
  );

  if (!product) {
    return (
      <ScrollView style={styles.screen}>
        <AppHeader />
        <View style={styles.container}>
          <Text style={styles.title}>Produto não encontrado</Text>
        </View>
        <AppFooter />
      </ScrollView>
    );
  }

  function handleAddToCart() {
    const result = addToCart(product, selectedSize, quantity);

    if (!result.ok && result.reason === "auth") {
      setModal("login");
      return;
    }

    if (!result.ok && result.reason === "size") {
      setModal("size");
      return;
    }

    navigation.navigate("MainTabs", { screen: "Cart" });
  }

  return (
    <>
      <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
        <AppHeader />

        <View style={styles.container}>
          <Text style={styles.breadcrumb}>Home / Produtos / {product.nome}</Text>

          <View style={styles.imageCard}>
            <Image source={product.caminhoimagem} style={styles.productImage} resizeMode="cover" />
          </View>

          <View style={styles.infoCard}>
            <Text style={styles.category}>{product.nome_categoria}</Text>
            <Text style={styles.title}>{product.nome}</Text>

            <View style={styles.ratingRow}>
              <Text style={styles.ratingStars}>★★★★☆</Text>
              <Text style={styles.ratingCount}>(127 avaliações)</Text>
            </View>

            <View style={styles.priceCard}>
              <Text style={styles.price}>{formatCurrency(product.preco)}</Text>
              <Text style={styles.installment}>{formatInstallment(product.preco)}</Text>
            </View>

            <View style={styles.stockBadge}>
              <Text style={styles.stockText}>✓ {product.estoque} em estoque</Text>
            </View>

            <Text style={styles.optionTitle}>Tamanho *</Text>
            <View style={styles.sizeGrid}>
              {product.tamanhos_disponiveis.map((size) => {
                const active = selectedSize === size;
                return (
                  <Pressable
                    key={size}
                    style={[
                      styles.sizeButton,
                      active && styles.sizeButtonActive,
                    ]}
                    onPress={() => setSelectedSize(size)}
                  >
                    <Text style={[styles.sizeText, active && styles.sizeTextActive]}>
                      {size}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.optionTitle}>Quantidade *</Text>
            <View style={styles.qtyRow}>
              <Pressable style={styles.qtyButton} onPress={() => setQuantity((current) => Math.max(1, current - 1))}>
                <Text style={styles.qtyButtonText}>-</Text>
              </Pressable>
              <Text style={styles.qtyValue}>{quantity}</Text>
              <Pressable style={styles.qtyButton} onPress={() => setQuantity((current) => Math.min(5, current + 1))}>
                <Text style={styles.qtyButtonText}>+</Text>
              </Pressable>
            </View>

            <PrimaryButton label="ADICIONAR AO CARRINHO" onPress={handleAddToCart} />

            {features.map((feature) => (
              <View key={feature.title} style={styles.featureCard}>
                <Text style={styles.featureTitle}>{feature.title}</Text>
                <Text style={styles.featureText}>{feature.text}</Text>
              </View>
            ))}

            <Text style={styles.optionTitle}>Descrição do Produto</Text>
            <Text style={styles.descriptionText}>{product.descricao}</Text>
            {[
              "Material de alta qualidade",
              "Design moderno e confortável",
              "Acabamento premium",
              "Versatilidade para diversas ocasiões",
            ].map((item) => (
              <View key={item} style={styles.descriptionItem}>
                <Text style={styles.descriptionBullet}>•</Text>
                <Text style={styles.descriptionText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <AppFooter />
      </ScrollView>

      <Modal transparent visible={modal !== "none"} animationType="fade" onRequestClose={() => setModal("none")}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {modal === "size" ? "Tamanho Obrigatório" : "Login Necessário"}
            </Text>
            <Text style={styles.modalText}>
              {modal === "size"
                ? "Por favor, selecione um tamanho antes de adicionar o produto ao carrinho."
                : "Você precisa estar logado para adicionar produtos ao carrinho e finalizar sua compra."}
            </Text>
            <View style={styles.modalButtons}>
              {modal === "login" ? (
                <>
                  <PrimaryButton
                    label="Fazer Login"
                    onPress={() => {
                      setModal("none");
                      navigation.navigate("Login", { redirectTo: "Cart" });
                    }}
                  />
                  <PrimaryButton
                    label="Criar Conta"
                    variant="secondary"
                    onPress={() => {
                      setModal("none");
                      navigation.navigate("Register");
                    }}
                  />
                </>
              ) : (
                <PrimaryButton label="Entendi" onPress={() => setModal("none")} />
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}
