import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { imageAssets } from "../../services/assets";
import { colors, spacing, typography } from "../../theme";

export function AppFooter() {
  return (
    <View style={styles.container}>
      <View style={styles.columns}>
        <View style={styles.column}>
          <Text style={styles.title}>Minha Conta</Text>
          <Text style={styles.link}>Meus Dados</Text>
          <Text style={styles.link}>Meus Pedidos</Text>
          <Text style={styles.link}>Cashback</Text>
          <Text style={styles.link}>Login</Text>
        </View>
        <View style={styles.column}>
          <Text style={styles.title}>Suporte e Políticas</Text>
          <Text style={styles.link}>Trocas e Devoluções</Text>
          <Text style={styles.link}>Dúvidas Frequentes</Text>
          <Text style={styles.link}>Fale Conosco</Text>
          <Text style={styles.link}>Política de Privacidade</Text>
        </View>
      </View>
      <Image source={imageAssets.paymentMethods} style={styles.payment} resizeMode="contain" />
      <Text style={styles.copy}>Coffe and Code | © 2025 Todos os direitos reservados</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: spacing.xl,
    gap: spacing.lg,
    backgroundColor: colors.background,
  },
  columns: {
    flexDirection: "row",
    gap: spacing.xl,
  },
  column: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 16,
  },
  link: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 13,
  },
  payment: {
    width: "100%",
    height: 28,
  },
  copy: {
    color: colors.textSoft,
    fontFamily: typography.body,
    fontSize: 12,
    textAlign: "center",
  },
});
