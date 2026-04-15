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
    padding: spacing.xl,
    gap: spacing.xl,
  },
  header: {
    gap: spacing.xs,
  },
  title: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 32,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.md,
    ...shadows.card,
  },
  emptyImage: {
    width: 140,
    height: 140,
  },
  emptyTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 24,
    textAlign: "center",
  },
  emptyText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
  },
  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.lg,
    ...shadows.card,
  },
  summaryTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 22,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  summaryLabel: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
  },
  summaryValue: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 14,
  },
  totalValue: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 24,
  },
  shippingBox: {
    gap: spacing.md,
    padding: spacing.lg,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
  },
});
