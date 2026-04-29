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
  headerCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: 18,
    gap: spacing.lg,
    ...shadows.card,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: spacing.lg,
    flexWrap: "wrap",
  },
  titleCopy: {
    flex: 1,
    minWidth: 220,
    gap: spacing.xs,
  },
  eyebrow: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 12,
    textTransform: "uppercase",
  },
  title: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 28,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
  clearPill: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  clearPillText: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 12,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
  },
  categoryChipList: {
    flexDirection: "row",
    gap: spacing.sm,
    paddingRight: spacing.md,
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
  chipLabel: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 13,
  },
  chipLabelActive: {
    color: colors.surface,
  },
  filterBlock: {
    gap: spacing.sm,
  },
  filterLabel: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 15,
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
  productGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.lg,
    justifyContent: "center",
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
