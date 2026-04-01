import React, { useMemo } from "react";
import { ScrollView, Text, View } from "react-native";
import Slider from "@react-native-community/slider";
import { useNavigation } from "@react-navigation/native";

import { catalogFilterCategories } from "../../constants/categories";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { ProductCard } from "../../components/product/ProductCard";
import { AppFooter } from "../../components/layout/AppFooter";
import { AppHeader } from "../../components/layout/AppHeader";
import { TextField } from "../../components/common/TextField";
import { useAppStore } from "../../hooks/useAppStore";
import { useCatalogFilters } from "../../hooks/useCatalogFilters";
import { formatCurrency } from "../../utils/format";
import { styles } from "./styles";

export function CatalogScreen() {
  const navigation = useNavigation<any>();
  const { products, favorites, toggleFavorite } = useAppStore();
  const {
    bounds,
    activeCategory,
    setActiveCategory,
    priceMin,
    priceMax,
    setPriceMin,
    setPriceMax,
    activeColors,
    activeSizes,
    search,
    setSearch,
    toggleColor,
    toggleSize,
    clearAll,
    grouped,
    filteredProducts,
  } = useCatalogFilters(products);

  const colors = useMemo(
    () => Array.from(new Set(products.map((item) => item.cor))),
    [products]
  );

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }}>
      <AppHeader />

      <View style={styles.container}>
        <View style={styles.headerCard}>
          <Text style={styles.title}>CATÁLOGO</Text>

          <View style={styles.chipRow}>
            {catalogFilterCategories.map((category) => {
              const active = activeCategory === category.match;
              return (
                <Text
                  key={category.id}
                  style={[styles.chip, active && styles.chipActive, styles.chipText, active && styles.chipTextActive]}
                  onPress={() => setActiveCategory(active ? null : category.match)}
                >
                  {category.label}
                </Text>
              );
            })}
          </View>

          <TextField
            label="Buscar Produto"
            placeholder="Buscar Produto"
            value={search}
            onChangeText={setSearch}
          />

          <View style={styles.rangeLabelRow}>
            <Text style={styles.rangeText}>{formatCurrency(priceMin)}</Text>
            <Text style={styles.rangeText}>{formatCurrency(priceMax)}</Text>
          </View>
          <View style={styles.sliderWrap}>
            <Slider
              style={styles.slider}
              minimumValue={bounds.min}
              maximumValue={bounds.max}
              value={priceMin}
              minimumTrackTintColor="#C92020"
              maximumTrackTintColor="#D5D0C8"
              thumbTintColor="#C92020"
              onValueChange={(value) => setPriceMin(Math.min(Math.floor(value), priceMax))}
            />
            <Slider
              style={styles.slider}
              minimumValue={bounds.min}
              maximumValue={bounds.max}
              value={priceMax}
              minimumTrackTintColor="#C92020"
              maximumTrackTintColor="transparent"
              thumbTintColor="#C92020"
              onValueChange={(value) => setPriceMax(Math.max(Math.ceil(value), priceMin))}
            />
          </View>

          <View style={styles.chipRow}>
            {colors.map((color) => {
              const active = activeColors.includes(color);
              return (
                <Text
                  key={color}
                  style={[styles.chip, active && styles.chipActive, styles.chipText, active && styles.chipTextActive]}
                  onPress={() => toggleColor(color)}
                >
                  {color}
                </Text>
              );
            })}
          </View>

          <View style={styles.chipRow}>
            {[32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42].map((size) => {
              const active = activeSizes.includes(size);
              return (
                <Text
                  key={size}
                  style={[styles.chip, active && styles.chipActive, styles.chipText, active && styles.chipTextActive]}
                  onPress={() => toggleSize(size)}
                >
                  {size}
                </Text>
              );
            })}
          </View>

          <PrimaryButton label="Limpar filtros" variant="secondary" onPress={clearAll} />
        </View>

        {filteredProducts.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
            <Text style={styles.emptyText}>
              Ajuste os filtros para explorar outras combinações do catálogo.
            </Text>
          </View>
        ) : (
          Object.entries(grouped).map(([categoryName, categoryProducts]) => (
            <View key={categoryName} style={styles.section}>
              <View style={styles.categoryHeader}>
                <Text style={styles.categoryTitle}>{categoryName}</Text>
                <Text style={styles.categoryHint}>Deslize para ver mais</Text>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalList}>
                {categoryProducts.map((product) => (
                  <ProductCard
                    key={product.id_produto}
                    product={product}
                    isFavorite={favorites.includes(product.id_produto)}
                    onFavoritePress={() => toggleFavorite(product.id_produto)}
                    onPress={() =>
                      navigation.getParent()?.navigate("Product", {
                        productId: product.id_produto,
                      })
                    }
                  />
                ))}
              </ScrollView>
            </View>
          ))
        )}
      </View>

      <AppFooter />
    </ScrollView>
  );
}
