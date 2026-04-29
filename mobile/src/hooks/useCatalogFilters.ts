import { useEffect, useMemo, useState } from "react";

import { filterProducts, getCatalogBounds, groupProductsByCategory } from "../services/catalogService";
import { Produto } from "../types/domain";

export function useCatalogFilters(products: Produto[]) {
  const bounds = useMemo(() => getCatalogBounds(products), [products]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [priceMin, setPriceMin] = useState(bounds.min);
  const [priceMax, setPriceMax] = useState(bounds.max);
  const [activeColors, setActiveColors] = useState<string[]>([]);
  const [activeSizes, setActiveSizes] = useState<number[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setPriceMin(bounds.min);
    setPriceMax(bounds.max);
  }, [bounds.min, bounds.max]);

  const filteredProducts = useMemo(
    () =>
      filterProducts(products, {
        categoryName: activeCategory,
        priceMin,
        priceMax,
        colors: activeColors,
        sizes: activeSizes,
        search,
      }),
    [products, activeCategory, priceMin, priceMax, activeColors, activeSizes, search]
  );

  const grouped = useMemo(() => groupProductsByCategory(filteredProducts), [filteredProducts]);

  function toggleColor(color: string) {
    setActiveColors((current) =>
      current.includes(color) ? current.filter((item) => item !== color) : [...current, color]
    );
  }

  function toggleSize(size: number) {
    setActiveSizes((current) =>
      current.includes(size) ? current.filter((item) => item !== size) : [...current, size]
    );
  }

  function clearAll() {
    setActiveCategory(null);
    setPriceMin(bounds.min);
    setPriceMax(bounds.max);
    setActiveColors([]);
    setActiveSizes([]);
    setSearch("");
  }

  return {
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
    filteredProducts,
    grouped,
  };
}
