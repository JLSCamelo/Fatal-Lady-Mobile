import React from "react";
import { ImageBackground, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { colors, spacing, typography } from "../../theme";
import { imageAssets } from "../../services/assets";

interface AuthBenefitsCardProps {
  title: string;
  subtitle: string;
  benefits: string[];
  benefitsTitle?: string;
}

export function AuthBenefitsCard({
  title,
  subtitle,
  benefits,
  benefitsTitle,
}: AuthBenefitsCardProps) {
  const { width } = useWindowDimensions();
  const compact = width < 420;

  return (
    <ImageBackground
      source={imageAssets.authBackground}
      style={[styles.background, compact && styles.backgroundCompact]}
      imageStyle={styles.image}
    >
      <LinearGradient
        colors={["rgba(25,25,25,0.12)", "rgba(25,25,25,0.68)"]}
        style={[styles.overlay, compact && styles.overlayCompact]}
      >
        <Text style={[styles.title, compact && styles.titleCompact]}>{title}</Text>
        <Text style={[styles.subtitle, compact && styles.subtitleCompact]}>{subtitle}</Text>
        <View style={styles.list}>
          {benefitsTitle ? <Text style={[styles.listTitle, compact && styles.listTitleCompact]}>{benefitsTitle}</Text> : null}
          {benefits.map((benefit) => (
            <View key={benefit} style={styles.item}>
              <Text style={styles.check}>✓</Text>
              <Text style={[styles.itemText, compact && styles.itemTextCompact]}>{benefit}</Text>
            </View>
          ))}
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    minHeight: 320,
  },
  backgroundCompact: {
    minHeight: 280,
  },
  image: {
    resizeMode: "cover",
  },
  overlay: {
    minHeight: 320,
    padding: spacing.xl,
    justifyContent: "center",
    gap: spacing.sm,
  },
  overlayCompact: {
    minHeight: 280,
    padding: spacing.lg,
  },
  title: {
    color: colors.surface,
    fontFamily: typography.title,
    fontSize: 32,
  },
  titleCompact: {
    fontSize: 24,
    lineHeight: 34,
  },
  subtitle: {
    color: "#DFDFDF",
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: 22,
  },
  subtitleCompact: {
    fontSize: 14,
    lineHeight: 21,
  },
  list: {
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  listTitle: {
    color: "#F8F8F8",
    fontFamily: typography.body,
    fontSize: 20,
  },
  listTitleCompact: {
    fontSize: 17,
  },
  item: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: spacing.sm,
  },
  check: {
    color: colors.primary,
    fontSize: 14,
    marginTop: 2,
  },
  itemText: {
    color: "#DFDFDF",
    fontFamily: typography.body,
    fontSize: 14,
    flex: 1,
  },
  itemTextCompact: {
    fontSize: 13,
  },
});
