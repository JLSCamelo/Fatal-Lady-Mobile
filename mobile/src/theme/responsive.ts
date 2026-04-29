import { spacing } from "./tokens";

export const breakpoints = {
  compact: 420,
  tablet: 768,
  desktop: 1024,
};

// Mantem as regras de largura em um ponto unico para evitar ajustes divergentes entre telas.
export function isCompactWidth(width: number) {
  return width < breakpoints.compact;
}

export function isTabletWidth(width: number) {
  return width >= breakpoints.tablet;
}

export function getPagePadding(width: number) {
  if (width < breakpoints.compact) return spacing.lg;
  if (width < breakpoints.tablet) return spacing.xl;
  return spacing.xxxl;
}
