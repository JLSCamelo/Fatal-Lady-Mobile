import React, { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { PageShell } from "../../components/layout/PageShell";
import { AuthBenefitsCard } from "../../components/auth/AuthBenefitsCard";
import { TextField } from "../../components/common/TextField";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { useAppStore } from "../../hooks/useAppStore";
import { loginBenefits } from "../../constants/content";
import { RootStackParamList } from "../../types/navigation";
import { colors, radius, shadows, spacing, typography } from "../../theme";
import { validateEmail } from "../../utils/validation";
import { LoginErrors, LoginFormState } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

export function LoginScreen({ navigation, route }: Props) {
  const { login } = useAppStore();
  const { width } = useWindowDimensions();
  const compact = width < 420;
  const [form, setForm] = useState<LoginFormState>({
    email: route.params?.prefillEmail ?? "",
    senha: "",
    remember: true,
  });
  const [errors, setErrors] = useState<LoginErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const feedbackMessage = useMemo(() => {
    if (route.params?.feedback === "registered") {
      return "Conta criada com sucesso. Faça login para continuar.";
    }

    return null;
  }, [route.params?.feedback]);

  async function handleSubmit() {
    const nextErrors: LoginErrors = {};
    const sanitizedEmail = form.email.trim().toLowerCase();

    if (!validateEmail(sanitizedEmail)) {
      nextErrors.email = "Informe um e-mail válido.";
    }

    if (!form.senha.trim()) {
      nextErrors.senha = "Digite sua senha.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    const result = await login({ email: sanitizedEmail, senha: form.senha });
    setSubmitting(false);

    if (!result.ok) {
      setErrors({ global: result.message });
      return;
    }

    if (route.params?.redirectTo) {
      navigation.replace("MainTabs", { screen: route.params.redirectTo });
      return;
    }

    navigation.replace("MainTabs", { screen: "Home" });
  }

  return (
    <PageShell>
      <View style={[styles.container, compact && styles.containerCompact]}>
        <AuthBenefitsCard
          title="Bem-vindo de volta"
          subtitle="Acesse sua conta para continuar com suas compras, ver pedidos e aproveitar ofertas exclusivas."
          benefits={loginBenefits}
          benefitsTitle="Benefícios"
        />

        <View style={[styles.card, compact && styles.cardCompact]}>
          <Text style={[styles.cardTitle, compact && styles.cardTitleCompact]}>Entrar na sua conta</Text>

          {feedbackMessage ? <Text style={styles.successBanner}>{feedbackMessage}</Text> : null}

          <View style={styles.form}>
            <TextField
              label="Email"
              value={form.email}
              onChangeText={(value) => {
                setForm((current) => ({ ...current, email: value }));
                setErrors((current) => ({ ...current, email: undefined, global: undefined }));
              }}
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="seu@exemplo.com"
              error={errors.email}
            />

            <TextField
              label="Senha"
              value={form.senha}
              onChangeText={(value) => {
                setForm((current) => ({ ...current, senha: value }));
                setErrors((current) => ({ ...current, senha: undefined, global: undefined }));
              }}
              secureTextEntry={!showPassword}
              placeholder="Digite sua senha"
              rightActionLabel={showPassword ? "Ocultar" : "Mostrar"}
              onRightActionPress={() => setShowPassword((current) => !current)}
              error={errors.senha}
            />

            <View style={[styles.actionsRow, compact && styles.actionsRowCompact]}>
              <Pressable
                style={styles.rememberRow}
                onPress={() => setForm((current) => ({ ...current, remember: !current.remember }))}
              >
                <View style={[styles.rememberToggle, form.remember && styles.rememberToggleActive]}>
                  <View style={[styles.rememberKnob, form.remember && styles.rememberKnobActive]} />
                </View>
                <Text style={styles.rememberText}>Lembrar-me</Text>
              </Pressable>

              <Pressable
                onPress={() =>
                  Alert.alert("Em breve", "Recuperação de senha ainda não está disponível no app.")
                }
              >
                <Text style={styles.link}>Esqueci minha senha</Text>
              </Pressable>
            </View>

            {errors.global ? <Text style={styles.globalError}>{errors.global}</Text> : null}

            <PrimaryButton label="Entrar" onPress={handleSubmit} loading={submitting} />

            <View style={styles.dividerRow}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>Ou entre com</Text>
              <View style={styles.divider} />
            </View>

            <View style={[styles.socialRow, compact && styles.socialRowCompact]}>
              <Pressable
                style={[styles.socialButton, compact && styles.socialButtonCompact]}
                onPress={() =>
                  Alert.alert("Integração pendente", "Login com Google ainda não está disponível no app mobile.")
                }
              >
                <Text style={styles.socialText}>Google</Text>
              </Pressable>
              <Pressable
                style={[styles.socialButton, compact && styles.socialButtonCompact]}
                onPress={() =>
                  Alert.alert("Integração pendente", "Login com Facebook ainda não está disponível no app mobile.")
                }
              >
                <Text style={styles.socialText}>Facebook</Text>
              </Pressable>
            </View>

            <Text style={styles.footerText}>
              Não tem conta?{" "}
              <Text style={styles.link} onPress={() => navigation.navigate("Register")}>
                Crie uma agora
              </Text>
            </Text>
          </View>
        </View>
      </View>
    </PageShell>
  );
}

const styles = StyleSheet.create({
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
  cardTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 28,
    textAlign: "center",
  },
  cardTitleCompact: {
    fontSize: 24,
  },
  successBanner: {
    color: colors.successText,
    backgroundColor: colors.successBg,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    fontFamily: typography.body,
    fontSize: 13,
  },
  form: {
    gap: spacing.lg,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
    flexWrap: "wrap",
  },
  actionsRowCompact: {
    alignItems: "flex-start",
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  rememberToggle: {
    width: 34,
    height: 18,
    borderRadius: radius.pill,
    backgroundColor: "#D7D0C6",
    justifyContent: "center",
    paddingHorizontal: 2,
  },
  rememberToggleActive: {
    backgroundColor: colors.primary,
  },
  rememberKnob: {
    width: 14,
    height: 14,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
  },
  rememberKnobActive: {
    alignSelf: "flex-end",
  },
  rememberText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 13,
  },
  link: {
    color: colors.primary,
    fontFamily: typography.body,
    fontSize: 13,
  },
  globalError: {
    color: colors.danger,
    fontFamily: typography.body,
    fontSize: 13,
    lineHeight: 18,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
  },
  divider: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textSoft,
    fontFamily: typography.body,
    fontSize: 12,
  },
  socialRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  socialRowCompact: {
    flexDirection: "column",
  },
  socialButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  socialButtonCompact: {
    width: "100%",
  },
  socialText: {
    color: colors.text,
    fontFamily: typography.body,
    fontSize: 14,
  },
  footerText: {
    color: colors.textMuted,
    fontFamily: typography.body,
    fontSize: 14,
    textAlign: "center",
  },
});
