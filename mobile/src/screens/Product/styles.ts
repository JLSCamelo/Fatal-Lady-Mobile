import { StyleSheet } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    backgroundColor: colors.background,
  },
  container: {
    gap: spacing.xl,
    width: "100%",
    maxWidth: 1180,
    alignSelf: "center",
    paddingVertical: spacing.xl,
  },
  backLink: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
  },
  backLinkText: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 13,
  },
  productLayout: {
    gap: spacing.xl,
  },
  productLayoutWide: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  imageCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: "hidden",
    ...shadows.card,
  },
  imageCardWide: {
    flex: 0.95,
  },
  productImage: {
    width: "100%",
    height: 340,
    backgroundColor: colors.surfaceAlt,
  },
  productImageWide: {
    height: 620,
  },
  infoCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    ...shadows.card,
  },
  infoCardWide: {
    flex: 1.05,
  },
  category: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 13,
    textTransform: "uppercase",
  },
  title: {
    color: colors.text,
    fontFamily: typography.title,
    fontSize: 34,
  },
  ratingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  ratingStars: {
    color: colors.warning,
    fontSize: 17,
  },
  ratingCount: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 13,
  },
  priceCard: {
    backgroundColor: colors.surfaceAlt,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  price: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 32,
  },
  installment: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
  },
  stockBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.successBg,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  stockText: {
    color: colors.successText,
    fontFamily: typography.body,
    fontSize: 13,
  },
  optionTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 18,
  },
  sizeGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  sizeButton: {
    width: 52,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  sizeButtonActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  sizeText: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 15,
  },
  sizeTextActive: {
    color: colors.surface,
  },
  qtyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  qtyButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 2,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surface,
  },
  qtyButtonText: {
    fontSize: 18,
    color: colors.text,
  },
  qtyValue: {
    minWidth: 36,
    textAlign: "center",
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 17,
  },
  featureCard: {
    flex: 1,
    minWidth: 180,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  featureGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.md,
  },
  featureTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 16,
  },
  featureText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 13,
  },
  descriptionText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: 22,
  },
  descriptionItem: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  descriptionBullet: {
    color: colors.primary,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlayStrong,
    justifyContent: "center",
    padding: spacing.xl,
  },
  modalCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
  },
  modalTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 24,
  },
  modalText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: 22,
  },
  modalButtons: {
    gap: spacing.md,
  },
  relatedSection: {
    gap: spacing.lg,
  },
  relatedHeader: {
    gap: spacing.xs,
  },
  relatedTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 24,
  },
  relatedSubtitle: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
  },
  relatedList: {
    gap: spacing.lg,
  },
});
