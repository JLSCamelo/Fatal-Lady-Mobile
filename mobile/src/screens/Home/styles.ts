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
  hero: {
    minHeight: 430,
  },
  heroOverlay: {
    minHeight: 430,
    justifyContent: "flex-end",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xl,
  },
  heroContent: {
    gap: spacing.md,
  },
  heroTitle: {
    color: colors.surface,
    fontFamily: typography.title,
    fontSize: 42,
    textTransform: "uppercase",
  },
  heroSubtitle: {
    color: "rgb(255, 196, 196)",
    fontFamily: typography.body,
    fontSize: 22,
  },
  benefitsBar: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    gap: spacing.lg,
  },
  benefitCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  benefitIcon: {
    width: 52,
    height: 52,
  },
  benefitTitle: {
    color: colors.surface,
    fontFamily: typography.body,
    fontSize: 16,
  },
  benefitSubtitle: {
    color: "#DFDFDF",
    fontFamily: typography.body,
    fontSize: 13,
  },
  section: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    gap: spacing.lg,
  },
  featuredHeader: {
    gap: spacing.sm,
  },
  featuredHeaderTitle: {
    color: "#F4ECE4",
    fontFamily: typography.title,
    fontSize: 28,
  },
  featuredHeaderSubtitle: {
    color: "#E9DDD2",
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: 22,
  },
  horizontalList: {
    gap: spacing.lg,
  },
  storySection: {
    backgroundColor: colors.backgroundMuted,
  },
  storyImageWrap: {
    borderRadius: radius.xl,
    overflow: "hidden",
  },
  storyImage: {
    width: "100%",
    height: 240,
  },
  storyCopy: {
    gap: spacing.md,
  },
  storyLabel: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 13,
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  storyTitle: {
    color: colors.text,
    fontFamily: typography.title,
    fontSize: 34,
  },
  storyParagraph: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: 22,
  },
  statsRow: {
    gap: spacing.md,
  },
  statCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    ...shadows.card,
  },
  statValue: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 26,
  },
  statLabel: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 13,
  },
  categoryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.lg,
  },
  categoryCard: {
    width: "47%",
    backgroundColor: colors.background,
    borderRadius: 10,
    paddingVertical: 19,
    paddingHorizontal: 13,
    alignItems: "center",
    gap: spacing.sm,
    ...shadows.card,
  },
  categoryImageWrap: {
    width: "100%",
    height: 100,
    borderRadius: 8,
    backgroundColor: "#F1F1F1",
    alignItems: "center",
    justifyContent: "center",
  },
  categoryImage: {
    width: "85%",
    height: "85%",
  },
  categoryTitle: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 14,
    textAlign: "center",
  },
  categoryCount: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 12,
  },
  bannerList: {
    gap: spacing.lg,
  },
  bannerImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  testimonialGrid: {
    gap: spacing.lg,
  },
  testimonialCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.md,
    ...shadows.card,
  },
  stars: {
    color: colors.warning,
    fontSize: 18,
  },
  testimonialText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: 22,
  },
  testimonialAuthor: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 16,
  },
  testimonialCity: {
    color: colors.textSoft,
    fontFamily: typography.body,
    fontSize: 13,
  },
  tableCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    overflow: "hidden",
    ...shadows.card,
  },
  tableHeader: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  tableHeaderText: {
    width: "24%",
    color: colors.surface,
    fontFamily: typography.body,
    fontSize: 14,
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.border,
  },
  tableCell: {
    width: "24%",
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 14,
    textAlign: "center",
  },
  tipsCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.md,
    ...shadows.card,
  },
  tipsTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 22,
  },
  tipItem: {
    flexDirection: "row",
    gap: spacing.sm,
  },
  tipBullet: {
    color: colors.primary,
    fontSize: 16,
  },
  tipText: {
    flex: 1,
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 21,
  },
  faqList: {
    gap: spacing.md,
  },
  faqCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    ...shadows.card,
  },
  faqRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.md,
  },
  faqQuestion: {
    flex: 1,
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 15,
  },
  faqArrow: {
    width: 18,
    height: 18,
  },
  faqAnswer: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 21,
  },
  newsletterSection: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    gap: spacing.lg,
  },
  newsletterHeader: {
    gap: spacing.sm,
  },
  newsletterSectionTitle: {
    color: colors.surface,
    fontFamily: typography.title,
    fontSize: 28,
  },
  newsletterSectionSubtitle: {
    color: "#F6E4E4",
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: 22,
  },
  newsletterCard: {
    width: 240,
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.md,
  },
  newsletterBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    color: colors.surface,
    fontFamily: typography.body,
    fontSize: 12,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  newsletterTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 20,
  },
  newsletterText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    lineHeight: 20,
  },
});
