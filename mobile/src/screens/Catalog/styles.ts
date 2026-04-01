import { StyleSheet } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  container: {
    padding: spacing.xl,
    gap: spacing.xl,
  },
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 18,
    gap: spacing.lg,
    ...shadows.card,
  },
  title: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 28,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  chip: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: "transparent",
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 13,
  },
  chipTextActive: {
    color: colors.surface,
  },
  rangeLabelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rangeText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 12,
  },
  sliderWrap: {
    height: 28,
    justifyContent: "center",
  },
  slider: {
    position: "absolute",
    left: 0,
    right: 0,
  },
  colorDot: {
    width: 18,
    height: 18,
    borderRadius: radius.pill,
    borderWidth: 1,
    borderColor: colors.border,
  },
  section: {
    gap: spacing.lg,
  },
  categoryHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryTitle: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 17,
  },
  categoryHint: {
    color: colors.textSoft,
    fontFamily: typography.body,
    fontSize: 12,
  },
  horizontalList: {
    gap: spacing.lg,
  },
  emptyCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    alignItems: "center",
  },
  emptyTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 22,
  },
  emptyText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    textAlign: "center",
  },
});
