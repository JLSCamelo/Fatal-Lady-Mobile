import { ImageSourcePropType } from "react-native";

import { iconAssets } from "../services/assets";

export interface CategoryMeta {
  id: number;
  nome: string;
  slug:
    | "sandalia"
    | "botas"
    | "salto-alto"
    | "rasteirinha"
    | "sapatilha"
    | "tenis"
    | "chinelos";
  countLabel: string;
  icon: ImageSourcePropType;
}

export const categories: CategoryMeta[] = [
  { id: 1, nome: "Saltos", slug: "salto-alto", countLabel: "45 modelos", icon: iconAssets.categorySaltos },
  { id: 2, nome: "Botas", slug: "botas", countLabel: "32 modelos", icon: iconAssets.categoryBotas },
  { id: 3, nome: "Rasteiras", slug: "rasteirinha", countLabel: "28 modelos", icon: iconAssets.categoryRasteiras },
  { id: 4, nome: "Tênis", slug: "tenis", countLabel: "38 modelos", icon: iconAssets.categoryTenis },
  { id: 5, nome: "Sapatilhas", slug: "sapatilha", countLabel: "25 modelos", icon: iconAssets.categorySapatilhas },
  { id: 6, nome: "Chinelos", slug: "chinelos", countLabel: "18 modelos", icon: iconAssets.categoryChinelos },
];

export const catalogFilterCategories = [
  { id: 1, label: "Sandália", match: "Sandália" },
  { id: 2, label: "Botas", match: "Botas" },
  { id: 3, label: "Salto Alto", match: "Salto Alto" },
  { id: 4, label: "Rasteirinha", match: "Rasteirinha" },
  { id: 5, label: "Sapatilha", match: "Sapatilha" },
  { id: 6, label: "Tênis", match: "Tênis" },
];
