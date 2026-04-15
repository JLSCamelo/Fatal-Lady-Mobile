import React, { useMemo, useState } from "react";
import { Alert, Pressable, StyleSheet, Switch, Text, View } from "react-native";
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
      setErrors({ senha: result.message, global: result.message });
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
      <View style={styles.container}>
        <AuthBenefitsCard
          title="Bem-vindo de volta"
          subtitle="Acesse sua conta para continuar com suas compras, ver pedidos e aproveitar ofertas exclusivas."
          benefits={loginBenefits}
          benefitsTitle="Benefícios"
        />

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Entrar na sua conta</Text>

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

            <View style={styles.actionsRow}>
              <View style={styles.rememberRow}>
                <Switch
                  value={form.remember}
                  onValueChange={(value) => setForm((current) => ({ ...current, remember: value }))}
                  trackColor={{ false: "#D7D0C6", true: colors.primary }}
                  thumbColor={colors.surface}
                />
                <Text style={styles.rememberText}>Lembrar-me</Text>
              </View>

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

            <View style={styles.socialRow}>
              <Pressable
                style={styles.socialButton}
                onPress={() =>
                  Alert.alert("Integração pendente", "Login com Google ainda não está disponível no app mobile.")
                }
              >
                <Text style={styles.socialText}>Google</Text>
              </Pressable>
              <Pressable
                style={styles.socialButton}
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
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    paddingVertical: 24,
    paddingHorizontal: 20,
    gap: spacing.xl,
    ...shadows.card,
  },
  cardTitle: {
    color: colors.text,
    fontFamily: typography.titleSemi,
    fontSize: 28,
    textAlign: "center",
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
  },
  rememberRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
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
  socialButton: {
    flex: 1,
    minHeight: 48,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
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
