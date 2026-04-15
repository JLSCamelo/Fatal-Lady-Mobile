import React from "react";
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { Produto } from "../../types/domain";
import { colors, radius, shadows, spacing, typography } from "../../theme";
import { formatCurrency } from "../../utils/format";

interface ProductCardProps {
  product: Produto;
  isFavorite?: boolean;
  onPress: () => void;
  onFavoritePress?: () => void;
  variant?: "catalog" | "featured";
}

export function ProductCard({
  product,
  isFavorite = false,
  onPress,
  onFavoritePress,
  variant = "catalog",
}: ProductCardProps) {
  const isFeatured = variant === "featured";

  return (
    <Pressable style={[styles.card, isFeatured && styles.cardFeatured]} onPress={onPress}>
      <View style={[styles.imageWrap, isFeatured && styles.imageWrapFeatured]}>
        <Image
          source={product.caminhoimagem}
          style={[styles.image, isFeatured && styles.imageFeatured]}
          resizeMode={isFeatured ? "contain" : "cover"}
        />
        {!isFeatured ? (
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{product.nome_categoria.toUpperCase()}</Text>
          </View>
        ) : null}
        {onFavoritePress && !isFeatured ? (
          <Pressable
            style={[styles.favorite, isFavorite && styles.favoriteActive]}
            onPress={(event) => {
              event.stopPropagation();
              onFavoritePress();
            }}
          >
            <Text style={[styles.favoriteText, isFavorite && styles.favoriteTextActive]}>♥</Text>
          </Pressable>
        ) : null}
      </View>

      <View style={[styles.body, isFeatured && styles.bodyFeatured]}>
        {isFeatured ? (
          <>
            <Text style={styles.categoryFeatured}>{product.nome_categoria}</Text>
            <Text style={styles.nameFeatured}>{product.nome}</Text>
            <Text style={styles.priceFeatured}>{formatCurrency(product.preco)}</Text>
          </>
        ) : (
          <>
            <Text style={styles.name}>{product.nome}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.rating}>{product.nota_media ? `★ ${product.nota_media.toFixed(1)}` : "Novo"}</Text>
              <Text style={styles.price}>{formatCurrency(product.preco)}</Text>
            </View>
            <View style={styles.button}>
              <Text style={styles.buttonText}>Ver mais</Text>
            </View>
          </>
        )}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 240,
    minHeight: 320,
    borderRadius: 14,
    backgroundColor: colors.surface,
    overflow: "hidden",
    ...shadows.card,
  },
  cardFeatured: {
    minHeight: 0,
    borderRadius: 10,
    backgroundColor: "#3F3A3A",
  },
  imageWrap: {
    position: "relative",
    backgroundColor: colors.surfaceAlt,
  },
  imageWrapFeatured: {
    height: 260,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F1F1",
  },
  image: {
    width: "100%",
    height: 210,
  },
  imageFeatured: {
    width: "80%",
    height: "80%",
  },
  badge: {
    position: "absolute",
    top: 10,
    left: 10,
    backgroundColor: "rgba(25,25,25,0.86)",
    borderRadius: radius.pill,
    paddingHorizontal: 11,
    paddingVertical: 4,
  },
  badgeText: {
    color: colors.surface,
    fontFamily: typography.body,
    fontSize: 10,
  },
  favorite: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: radius.pill,
    backgroundColor: "rgba(255,255,255,0.94)",
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteActive: {
    backgroundColor: colors.primary,
  },
  favoriteText: {
    color: colors.textSoft,
    fontSize: 16,
  },
  favoriteTextActive: {
    color: colors.surface,
  },
  body: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 16,
    gap: spacing.sm,
  },
  bodyFeatured: {
    paddingTop: 16,
    paddingBottom: 18,
  },
  categoryFeatured: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 11,
    textTransform: "uppercase",
  },
  nameFeatured: {
    color: colors.surface,
    fontFamily: typography.body,
    fontSize: 17,
  },
  priceFeatured: {
    color: colors.surface,
    fontFamily: typography.titleSemi,
    fontSize: 20,
  },
  name: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 15,
    minHeight: 42,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rating: {
    color: colors.warning,
    fontFamily: typography.body,
    fontSize: 13,
  },
  price: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 18,
  },
  button: {
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    alignItems: "center",
  },
  buttonText: {
    color: colors.surface,
    fontFamily: typography.body,
    fontSize: 14,
  },
});
