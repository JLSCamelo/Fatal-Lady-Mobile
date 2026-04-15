import { StyleSheet } from "react-native";

import { colors, radius, shadows, spacing, typography } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    gap: spacing.xl,
    width: "100%",
    maxWidth: 960,
    alignSelf: "center",
  },
  containerCompact: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    gap: spacing.xl,
    ...shadows.card,
  },
  cardCompact: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    gap: spacing.lg,
  },
  header: {
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 28,
    textAlign: "center",
  },
  titleCompact: {
    fontSize: 24,
  },
  subtitle: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    textAlign: "center",
  },
  section: {
    gap: spacing.md,
  },
  sectionTitle: {
    color: colors.primary,
    fontFamily: typography.titleSemi,
    fontSize: 18,
  },
  checkboxRow: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "flex-start",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 1,
  },
  checkboxActive: {
    borderColor: colors.primary,
    backgroundColor: colors.primary,
  },
  checkboxText: {
    color: colors.surface,
    fontSize: 12,
  },
  checkboxLabel: {
    flex: 1,
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: 20,
  },
  link: {
    color: colors.primary,
  },
  globalError: {
    color: colors.danger,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: 18,
  },
  passwordMeter: {
    gap: spacing.sm,
  },
  meterTrack: {
    height: 8,
    borderRadius: radius.pill,
    backgroundColor: "#DDDDDD",
    overflow: "hidden",
  },
  meterFill: {
    height: "100%",
    borderRadius: radius.pill,
  },
  meterLabel: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 12,
  },
  footerText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    textAlign: "center",
  },
});
