import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

import { ItemCarrinho } from "../../types/domain";
import { formatCurrency } from "../../utils/format";
import { colors, radius, shadows, spacing, typography } from "../../theme";

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

      <View style={styles.body}>
        <Text style={styles.category}>{item.produto.nome_categoria}</Text>
        <Text style={styles.name}>{item.produto.nome}</Text>
        <Text style={styles.meta}>Tamanho {item.tamanho}</Text>
        <Text style={styles.price}>{formatCurrency(item.preco_unitario)}</Text>

        <View style={styles.actionsRow}>
          <View style={styles.quantityControls}>
            <Pressable style={styles.qtyButton} onPress={onDecrease}>
              <Text style={styles.qtyText}>-</Text>
            </Pressable>
            <Text style={styles.quantity}>{item.quantidade}</Text>
            <Pressable style={styles.qtyButton} onPress={onIncrease}>
              <Text style={styles.qtyText}>+</Text>
            </Pressable>
          </View>

          <Pressable onPress={onRemove}>
            <Text style={styles.removeText}>Remover</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    ...shadows.card,
  },
  image: {
    width: 96,
    height: 96,
    borderRadius: radius.lg,
    backgroundColor: colors.surfaceAlt,
  },
  body: {
    flex: 1,
    gap: spacing.xs,
  },
  category: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 11,
    textTransform: "uppercase",
  },
  name: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 15,
  },
  meta: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 13,
  },
  price: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 20,
  },
  actionsRow: {
    marginTop: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  qtyButton: {
    width: 32,
    height: 32,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  qtyText: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 18,
  },
  quantity: {
    minWidth: 18,
    textAlign: "center",
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 14,
  },
  removeText: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 13,
  },
});
