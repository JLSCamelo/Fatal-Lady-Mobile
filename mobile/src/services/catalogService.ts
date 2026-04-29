import { Produto } from "../types/domain";

export interface CatalogFilters {
  categoryName: string | null;
  priceMin: number;
  priceMax: number;
  colors: string[];
  sizes: number[];
  search: string;
}

export function groupProductsByCategory(products: Produto[]) {
  return products.reduce<Record<string, Produto[]>>((accumulator, product) => {
    const key = product.nome_categoria;
    if (!accumulator[key]) accumulator[key] = [];
    accumulator[key].push(product);
    return accumulator;
  }, {});
}

export function getCatalogBounds(products: Produto[]) {
  const prices = products.map((item) => item.preco);

  if (prices.length === 0) {
    return { min: 0, max: 0 };
  }

  return {
    min: Math.floor(Math.min(...prices)),
    max: Math.ceil(Math.max(...prices)),
  };
}

export function filterProducts(products: Produto[], filters: CatalogFilters) {
  const search = filters.search.trim().toLowerCase();

  return products.filter((product) => {
    const matchesCategory = !filters.categoryName || product.nome_categoria === filters.categoryName;
    const matchesPrice = product.preco >= filters.priceMin && product.preco <= filters.priceMax;
    const matchesColor = filters.colors.length === 0 || filters.colors.includes(product.cor);
    const matchesSearch = !search || product.nome.toLowerCase().includes(search);
    const matchesSize =
      filters.sizes.length === 0 ||
      filters.sizes.some((size) => product.tamanhos_disponiveis.includes(size));

    return matchesCategory && matchesPrice && matchesColor && matchesSearch && matchesSize;
  });
}
