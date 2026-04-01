import React from "react";
import { ImageBackground, StyleSheet, Text, View } from "react-native";
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
  return (
    <ImageBackground source={imageAssets.authBackground} style={styles.background} imageStyle={styles.image}>
      <LinearGradient colors={["rgba(25,25,25,0.12)", "rgba(25,25,25,0.68)"]} style={styles.overlay}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
        <View style={styles.list}>
          {benefitsTitle ? <Text style={styles.listTitle}>{benefitsTitle}</Text> : null}
          {benefits.map((benefit) => (
            <View key={benefit} style={styles.item}>
              <Text style={styles.check}>✓</Text>
              <Text style={styles.itemText}>{benefit}</Text>
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
  image: {
    resizeMode: "cover",
  },
  overlay: {
    minHeight: 320,
    padding: spacing.xl,
    justifyContent: "center",
    gap: spacing.sm,
  },
  title: {
    color: colors.surface,
    fontFamily: typography.title,
    fontSize: 32,
  },
  subtitle: {
    color: "#DFDFDF",
    fontFamily: typography.body,
    fontSize: 15,
    lineHeight: 22,
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
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  check: {
    color: colors.primary,
    fontSize: 14,
  },
  itemText: {
    color: "#DFDFDF",
    fontFamily: typography.body,
    fontSize: 14,
  },
});
