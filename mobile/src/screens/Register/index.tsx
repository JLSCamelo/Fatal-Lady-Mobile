import React, { useMemo, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import { AuthBenefitsCard } from "../../components/auth/AuthBenefitsCard";
import { OptionPickerField } from "../../components/common/OptionPickerField";
import { PrimaryButton } from "../../components/common/PrimaryButton";
import { TextField } from "../../components/common/TextField";
import { PageShell } from "../../components/layout/PageShell";
import { registerBenefits } from "../../constants/content";
import { lookupCep } from "../../services/cepService";
import { RootStackParamList } from "../../types/navigation";
import { calculatePasswordStrength, validateRegister } from "../../utils/validation";
import { maskCep, maskCpf, maskPhone } from "../../utils/format";
import { useAppStore } from "../../hooks/useAppStore";
import { RegisterErrors, RegisterFormState } from "./types";
import { styles } from "./styles";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const generoOptions = [
  "Masculino",
  "Feminino",
  "Outro",
  "Prefiro não informar",
];

const estados = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO",
];

export function RegisterScreen({ navigation }: Props) {
  const { register } = useAppStore();
  const [form, setForm] = useState<RegisterFormState>({
    nome: "",
    email: "",
    telefone: "",
    cpf: "",
    data_nascimento: "",
    genero: "",
    cep: "",
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    estado: "",
    senha: "",
    confirmarSenha: "",
    terms: false,
    newsletter: false,
  });
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const strength = useMemo(() => calculatePasswordStrength(form.senha), [form.senha]);
  const strengthColor = strength < 3 ? "#FF4444" : strength < 4 ? "#FFAA00" : "#00CC66";
  const strengthWidth = `${Math.min((strength / 5) * 100, 100)}%` as `${number}%`;
  const strengthLabel = !form.senha
    ? "Força da senha"
    : strength < 3
      ? "Fraca"
      : strength < 4
        ? "Média"
        : "Forte";

  async function handleCepBlur() {
    const result = await lookupCep(form.cep);
    if (!result) return;

    setForm((current) => ({
      ...current,
      rua: result.rua || current.rua,
      bairro: result.bairro || current.bairro,
      cidade: result.cidade || current.cidade,
      estado: result.estado || current.estado,
    }));
  }

  async function handleSubmit() {
    const nextErrors = validateRegister(form);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    await register(form);
    setSubmitting(false);
    navigation.replace("Login");
  }

  return (
    <PageShell>
      <View style={styles.container}>
        <AuthBenefitsCard
          title="Crie sua conta"
          subtitle="Cadastre-se agora e aproveite benefícios exclusivos, ofertas especiais e uma experiência de compra personalizada."
          benefits={registerBenefits}
          benefitsTitle="Vantagens de ter uma conta"
        />

        <View style={styles.card}>
          <View style={styles.header}>
            <Text style={styles.title}>Cadastro</Text>
            <Text style={styles.subtitle}>Preencha seus dados para começar</Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados Pessoais</Text>
            <TextField
              label="Nome Completo"
              placeholder="Seu Nome"
              value={form.nome}
              onChangeText={(value) => setForm((current) => ({ ...current, nome: value }))}
              error={errors.nome}
            />
            <TextField
              label="Email"
              placeholder="seu@exemplo.com"
              value={form.email}
              onChangeText={(value) => setForm((current) => ({ ...current, email: value }))}
              autoCapitalize="none"
              keyboardType="email-address"
              error={errors.email}
            />
            <TextField
              label="Telefone"
              placeholder="(11) 12345-6789"
              value={form.telefone}
              onChangeText={(value) => setForm((current) => ({ ...current, telefone: maskPhone(value) }))}
              keyboardType="phone-pad"
              error={errors.telefone}
            />
            <TextField
              label="CPF"
              placeholder="123.456.789-10"
              value={form.cpf}
              onChangeText={(value) => setForm((current) => ({ ...current, cpf: maskCpf(value) }))}
              keyboardType="number-pad"
              error={errors.cpf}
            />
            <TextField
              label="Data de Nascimento"
              placeholder="AAAA-MM-DD"
              value={form.data_nascimento}
              onChangeText={(value) => setForm((current) => ({ ...current, data_nascimento: value }))}
              error={errors.data_nascimento}
            />
            <OptionPickerField
              label="Gênero"
              value={form.genero}
              placeholder="Selecione seu gênero"
              options={generoOptions}
              onSelect={(value) => setForm((current) => ({ ...current, genero: value }))}
              error={errors.genero}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Endereço</Text>
            <TextField
              label="CEP"
              placeholder="12345-678"
              value={form.cep}
              onChangeText={(value) => setForm((current) => ({ ...current, cep: maskCep(value) }))}
              onBlur={handleCepBlur}
              hint="Informe seu CEP para busca automática"
              keyboardType="number-pad"
              error={errors.cep}
            />
            <TextField
              label="Rua"
              placeholder="Rua das Flores"
              value={form.rua}
              onChangeText={(value) => setForm((current) => ({ ...current, rua: value }))}
              error={errors.rua}
            />
            <TextField
              label="Número"
              placeholder="123"
              value={form.numero}
              onChangeText={(value) => setForm((current) => ({ ...current, numero: value }))}
              error={errors.numero}
            />
            <TextField
              label="Complemento"
              placeholder="Apto 45 (opcional)"
              value={form.complemento}
              onChangeText={(value) => setForm((current) => ({ ...current, complemento: value }))}
            />
            <TextField
              label="Bairro"
              placeholder="Centro"
              value={form.bairro}
              onChangeText={(value) => setForm((current) => ({ ...current, bairro: value }))}
              error={errors.bairro}
            />
            <TextField
              label="Cidade"
              placeholder="São Paulo"
              value={form.cidade}
              onChangeText={(value) => setForm((current) => ({ ...current, cidade: value }))}
              error={errors.cidade}
            />
            <OptionPickerField
              label="Estado"
              value={form.estado}
              placeholder="Selecione o estado"
              options={estados}
              onSelect={(value) => setForm((current) => ({ ...current, estado: value }))}
              error={errors.estado}
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Segurança</Text>
            <TextField
              label="Senha"
              placeholder="Mínimo 8 caracteres"
              value={form.senha}
              onChangeText={(value) => setForm((current) => ({ ...current, senha: value }))}
              secureTextEntry={!showPassword}
              rightActionLabel={showPassword ? "Ocultar" : "Mostrar"}
              onRightActionPress={() => setShowPassword((current) => !current)}
              hint="Use letras, números e símbolos"
              error={errors.senha}
            />
            <View style={styles.passwordMeter}>
              <View style={styles.meterTrack}>
                <View style={[styles.meterFill, { width: strengthWidth, backgroundColor: strengthColor }]} />
              </View>
              <Text style={styles.meterLabel}>{strengthLabel}</Text>
            </View>
            <TextField
              label="Confirmar Senha"
              placeholder="Digite a senha novamente"
              value={form.confirmarSenha}
              onChangeText={(value) => setForm((current) => ({ ...current, confirmarSenha: value }))}
              secureTextEntry={!showPassword}
              error={errors.confirmarSenha}
            />
          </View>

          <Pressable
            style={styles.checkboxRow}
            onPress={() => setForm((current) => ({ ...current, terms: !current.terms }))}
          >
            <View style={[styles.checkbox, form.terms && styles.checkboxActive]}>
              {form.terms ? <Text style={styles.checkboxText}>✓</Text> : null}
            </View>
            <Text style={styles.checkboxLabel}>
              Li e aceito os <Text style={styles.link}>Termos de Uso</Text> e a{" "}
              <Text style={styles.link}>Política de Privacidade</Text>.
            </Text>
          </Pressable>

          <Pressable
            style={styles.checkboxRow}
            onPress={() => setForm((current) => ({ ...current, newsletter: !current.newsletter }))}
          >
            <View style={[styles.checkbox, form.newsletter && styles.checkboxActive]}>
              {form.newsletter ? <Text style={styles.checkboxText}>✓</Text> : null}
            </View>
            <Text style={styles.checkboxLabel}>Quero receber ofertas e novidades por email</Text>
          </Pressable>

          {errors.global ? <Text style={styles.globalError}>{errors.global}</Text> : null}

          <PrimaryButton label="Criar Conta" onPress={handleSubmit} loading={submitting} />

          <Text style={styles.footerText}>
            Já tem uma conta?{" "}
            <Text style={styles.link} onPress={() => navigation.navigate("Login")}>
              Faça login
            </Text>
          </Text>
        </View>
      </View>
    </PageShell>
  );
}
