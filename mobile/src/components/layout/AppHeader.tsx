import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { promoMessages } from "../../constants/content";
import { useAppStore } from "../../hooks/useAppStore";
import { iconAssets } from "../../services/assets";
import { colors, radius, shadows, spacing, typography } from "../../theme";

export function AppHeader() {
  const navigation = useNavigation<any>();
  const { cartCount, currentUser, logout } = useAppStore();
  const [menuVisible, setMenuVisible] = useState(false);
  const promo = useMemo(
    () => promoMessages[new Date().getSeconds() % promoMessages.length],
    []
  );

  const routeNames: string[] = navigation.getState?.()?.routeNames ?? [];

  function openTab(screen: "Home" | "Catalog" | "Cart") {
    if (routeNames.includes(screen)) {
      navigation.navigate(screen);
      return;
    }

    navigation.navigate("MainTabs", { screen });
  }

  function openStack(screen: "Login" | "Register") {
    if (routeNames.includes(screen)) {
      navigation.navigate(screen);
      return;
    }

    const parent = navigation.getParent?.();
    if (parent) {
      parent.navigate(screen);
      return;
    }

    navigation.navigate(screen);
  }

  return (
    <>
      <View style={styles.topBar}>
        <View style={styles.languageRow}>
          <Image source={iconAssets.languages} style={styles.smallIcon} />
          <Text style={styles.topText}>BR</Text>
        </View>
        <Text style={styles.promoText}>{promo}</Text>
        <Pressable onPress={() => (currentUser ? logout() : openStack("Login"))}>
          <Text style={styles.topLink}>{currentUser ? "Sair" : "Entrar"}</Text>
        </Pressable>
      </View>

      <View style={styles.navBar}>
        <Pressable onPress={() => setMenuVisible(true)} style={styles.iconButton}>
          <Image source={iconAssets.menu} style={styles.mainIcon} />
        </Pressable>

        <Pressable style={styles.logoWrap} onPress={() => openTab("Home")}>
          <Image source={iconAssets.logo} style={styles.logo} resizeMode="contain" />
        </Pressable>

        <View style={styles.actionGroup}>
          <Pressable onPress={() => openStack("Login")} style={styles.iconButton}>
            <Image source={iconAssets.user} style={styles.mainIcon} />
          </Pressable>
          <Pressable onPress={() => openTab("Cart")} style={styles.iconButton}>
            <Image source={iconAssets.cart} style={styles.mainIcon} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          </Pressable>
        </View>
      </View>

      <Modal
        visible={menuVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setMenuVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setMenuVisible(false)}>
          <Pressable style={styles.menuSheet} onPress={() => undefined}>
            <View style={styles.menuHeader}>
              <Text style={styles.menuTitle}>Menu</Text>
              <Pressable onPress={() => setMenuVisible(false)}>
                <Text style={styles.closeText}>x</Text>
              </Pressable>
            </View>

            <View style={styles.menuLinks}>
              <Pressable onPress={() => { setMenuVisible(false); openTab("Home"); }}>
                <Text style={styles.menuLink}>Início</Text>
              </Pressable>
              <Pressable onPress={() => { setMenuVisible(false); openTab("Catalog"); }}>
                <Text style={styles.menuLink}>Catálogo</Text>
              </Pressable>
              <Pressable onPress={() => { setMenuVisible(false); openTab("Cart"); }}>
                <Text style={styles.menuLink}>Carrinho</Text>
              </Pressable>
              <Pressable onPress={() => { setMenuVisible(false); openStack(currentUser ? "Login" : "Register"); }}>
                <Text style={styles.menuLink}>{currentUser ? "Minha conta" : "Criar conta"}</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  topBar: {
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  languageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  smallIcon: {
    width: 14,
    height: 14,
  },
  topText: {
    fontFamily: typography.body,
    color: colors.textMuted,
    fontSize: 12,
  },
  promoText: {
    flex: 1,
    marginHorizontal: spacing.md,
    textAlign: "center",
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 12,
  },
  topLink: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 12,
  },
  navBar: {
    backgroundColor: colors.dark,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    width: 36,
    height: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  mainIcon: {
    width: 22,
    height: 22,
    tintColor: colors.surface,
  },
  logoWrap: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 132,
    height: 28,
  },
  actionGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  badge: {
    position: "absolute",
    top: 2,
    right: 0,
    minWidth: 18,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    color: colors.surface,
    fontFamily: typography.body,
    fontSize: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: colors.overlayStrong,
    justifyContent: "flex-end",
  },
  menuSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    padding: spacing.xl,
    gap: spacing.xl,
    ...shadows.floating,
  },
  menuHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 24,
  },
  closeText: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 22,
  },
  menuLinks: {
    gap: spacing.lg,
  },
  menuLink: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 18,
  },
});
