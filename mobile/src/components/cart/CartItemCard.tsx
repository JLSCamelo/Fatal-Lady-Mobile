import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { ItemCarrinho } from "../../types/domain";
import { colors, radius, shadows, spacing, typography } from "../../theme";
import { formatCurrency } from "../../utils/format";

interface CartItemCardProps {
  item: ItemCarrinho;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export function CartItemCard({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: CartItemCardProps) {
  return (
    <View style={styles.card}>
      <Image source={item.produto.caminhoimagem} style={styles.image} resizeMode="cover" />
      <View style={styles.content}>
        <Text style={styles.name}>{item.produto.nome}</Text>
        <Text style={styles.meta}>ID: {item.produto_id}</Text>
        <Text style={styles.meta}>Tamanho: {item.tamanho}</Text>
        <Text style={styles.price}>{formatCurrency(item.preco_unitario)}</Text>
      </View>
      <View style={styles.actions}>
        <View style={styles.qty}>
          <Pressable onPress={onDecrease} style={styles.qtyButton}>
            <Text style={styles.qtyText}>-</Text>
          </Pressable>
          <Text style={styles.qtyValue}>{item.quantidade}</Text>
          <Pressable onPress={onIncrease} style={styles.qtyButton}>
            <Text style={styles.qtyText}>+</Text>
          </Pressable>
        </View>
        <Pressable onPress={onRemove} style={styles.removeButton}>
          <Text style={styles.removeText}>Remover</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    gap: spacing.lg,
    ...shadows.card,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceAlt,
  },
  content: {
    gap: spacing.sm,
  },
  name: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 16,
  },
  meta: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 13,
  },
  price: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 22,
  },
  actions: {
    gap: spacing.md,
  },
  qty: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  qtyButton: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceAlt,
  },
  qtyText: {
    color: colors.text,
    fontSize: 18,
  },
  qtyValue: {
    minWidth: 24,
    textAlign: "center",
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 16,
  },
  removeButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: radius.pill,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
  },
  removeText: {
    color: colors.danger,
    fontFamily: typography.body,
    fontSize: 13,
  },
});
