import React, { useMemo, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
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
  const { width } = useWindowDimensions();
  const compact = width < 420;
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
      <View style={[styles.topBar, compact && styles.topBarCompact]}>
        <View style={[styles.topMetaRow, compact && styles.topMetaRowCompact]}>
          <View style={styles.languageRow}>
            <Image source={iconAssets.languages} style={styles.smallIcon} />
            <Text style={styles.topText}>BR</Text>
          </View>
          <View style={[styles.topActions, compact && styles.topActionsCompact]}>
            <Pressable onPress={() => Alert.alert("Ajuda", "A central de ajuda ainda não está disponível no app mobile.")}>
              <Text style={styles.topLink}>Ajuda</Text>
            </Pressable>
            {currentUser ? (
              <>
                <Text style={styles.topLink}>Olá, {currentUser.nome.split(" ")[0]}</Text>
                <Pressable onPress={logout}>
                  <Text style={styles.topLink}>Sair</Text>
                </Pressable>
              </>
            ) : (
              <>
                <Pressable onPress={() => openStack("Login")}>
                  <Text style={styles.topLink}>Entrar</Text>
                </Pressable>
                <Pressable onPress={() => openStack("Register")}>
                  <Text style={styles.topLink}>Criar conta</Text>
                </Pressable>
              </>
            )}
          </View>
        </View>
        <Text style={[styles.promoText, compact && styles.promoTextCompact]}>{promo}</Text>
      </View>

      <View style={[styles.navBar, compact && styles.navBarCompact]}>
        <View style={styles.navLeft}>
          <Pressable onPress={() => openTab("Home")}>
            <Text style={styles.navText}>Início</Text>
          </Pressable>
          <Pressable onPress={() => openTab("Catalog")}>
            <Text style={styles.navText}>Catálogo</Text>
          </Pressable>
          <Pressable onPress={() => openTab("Cart")}>
            <Text style={styles.navText}>Carrinho</Text>
          </Pressable>
          <Pressable onPress={() => openTab("Catalog")}>
            <Text style={styles.navText}>Favoritos</Text>
          </Pressable>
        </View>

        <Pressable style={styles.logoWrap} onPress={() => openTab("Home")}>
          <Image source={iconAssets.logo} style={[styles.logo, compact && styles.logoCompact]} resizeMode="contain" />
        </Pressable>

        <View style={styles.navRight}>
          <Pressable onPress={() => openTab("Catalog")}>
            <Image source={iconAssets.bookmark} style={styles.icon} />
          </Pressable>
          <Pressable onPress={() => openTab("Cart")} style={styles.cartButton}>
            <Image source={iconAssets.cart} style={styles.icon} />
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          </Pressable>
          <Pressable onPress={() => openTab("Catalog")}>
            <Image source={iconAssets.shop} style={styles.icon} />
          </Pressable>
          <Pressable onPress={() => (currentUser ? openTab("Home") : openStack("Login"))}>
            <Image source={iconAssets.user} style={styles.icon} />
          </Pressable>
        </View>

        <Pressable
          onPress={() => setMenuVisible(true)}
          style={styles.mobileTrigger}
          accessibilityLabel="Abrir menu de navegação"
        >
          <Text style={styles.mobileBar}>≡</Text>
        </Pressable>
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
                <Text style={styles.closeText}>×</Text>
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
              <Pressable onPress={() => { setMenuVisible(false); openTab("Catalog"); }}>
                <Text style={styles.menuLink}>Favoritos</Text>
              </Pressable>
              {currentUser ? (
                <Pressable onPress={() => { setMenuVisible(false); logout(); }}>
                  <Text style={styles.menuLink}>Sair</Text>
                </Pressable>
              ) : (
                <>
                  <Pressable onPress={() => { setMenuVisible(false); openStack("Login"); }}>
                    <Text style={styles.menuLink}>Entrar</Text>
                  </Pressable>
                  <Pressable onPress={() => { setMenuVisible(false); openStack("Register"); }}>
                    <Text style={styles.menuLink}>Criar conta</Text>
                  </Pressable>
                </>
              )}
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
    gap: spacing.xs,
  },
  topBarCompact: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.sm,
  },
  topMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing.sm,
  },
  topMetaRowCompact: {
    alignItems: "flex-start",
    flexWrap: "wrap",
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
    textAlign: "center",
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 12,
  },
  promoTextCompact: {
    fontSize: 11,
    lineHeight: 16,
  },
  topActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
    flexWrap: "wrap",
    justifyContent: "flex-end",
  },
  topActionsCompact: {
    gap: 6,
    maxWidth: "82%",
  },
  topLink: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 11,
  },
  navBar: {
    backgroundColor: colors.dark,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  navBarCompact: {
    paddingHorizontal: spacing.md,
  },
  navLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    display: "none",
  },
  navText: {
    color: colors.background,
    fontFamily: typography.body,
    fontSize: 14,
  },
  logoWrap: {
    flex: 1,
    alignItems: "center",
  },
  logo: {
    width: 132,
    height: 28,
  },
  logoCompact: {
    width: 112,
    height: 24,
  },
  navRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    display: "none",
  },
  icon: {
    width: 22,
    height: 22,
    tintColor: colors.surface,
  },
  cartButton: {
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: -6,
    right: -8,
    minWidth: 16,
    height: 16,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  badgeText: {
    color: colors.surface,
    fontFamily: typography.body,
    fontSize: 10,
  },
  mobileTrigger: {
    width: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  mobileBar: {
    color: colors.surface,
    fontSize: 24,
    lineHeight: 24,
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
    fontSize: 28,
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
