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
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontFamily: typography.title,
    fontSize: 34,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
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
    fontSize: 24,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  summaryLabel: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
  },
  summaryValue: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 16,
  },
  totalValue: {
    color: colors.text,
    fontFamily: typography.title,
    fontSize: 24,
  },
  shippingBox: {
    gap: spacing.md,
  },
  emptyState: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: "center",
    gap: spacing.lg,
    ...shadows.card,
  },
  emptyImage: {
    width: 120,
    height: 120,
  },
  emptyTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 24,
  },
  emptyText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    textAlign: "center",
  },
});
