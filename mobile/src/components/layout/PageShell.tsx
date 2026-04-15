import React from "react";
import { ScrollView, StyleSheet, View, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "../../theme";
import { AppFooter } from "./AppFooter";
import { AppHeader } from "./AppHeader";

interface PageShellProps {
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  footerVisible?: boolean;
}

export function PageShell({
  children,
  contentContainerStyle,
  footerVisible = true,
}: PageShellProps) {
  return (
    <SafeAreaView style={styles.safeArea} edges={["top"]}>
      <ScrollView
        style={styles.scroll}
        contentContainerStyle={[styles.content, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <AppHeader />
        <View style={styles.body}>{children}</View>
        {footerVisible ? <AppFooter /> : null}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scroll: {
    flex: 1,
  },
  content: {
    backgroundColor: colors.background,
    flexGrow: 1,
  },
  body: {
    gap: 24,
  },
});
