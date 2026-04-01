import { RegisterPayload } from "../types/domain";
import { onlyDigits } from "./format";

export function validateEmail(email: string) {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email.trim());
}

export function calculatePasswordStrength(password: string) {
  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength += 1;
  if (/\d/.test(password)) strength += 1;
  if (/[^a-zA-Z0-9]/.test(password)) strength += 1;
  return strength;
}

export function isValidCpf(cpf: string) {
  const digits = onlyDigits(cpf);
  if (!/^\d{11}$/.test(digits)) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  const calcCheck = (base: string) => {
    let sum = 0;
    for (let index = 0; index < base.length; index += 1) {
      sum += Number(base[index]) * (base.length + 1 - index);
    }
    const mod = (sum * 10) % 11;
    return mod === 10 ? 0 : mod;
  };

  const d1 = calcCheck(digits.slice(0, 9));
  const d2 = calcCheck(digits.slice(0, 10));

  return d1 === Number(digits[9]) && d2 === Number(digits[10]);
}

export function validateRegister(payload: RegisterPayload) {
  const errors: Partial<Record<keyof RegisterPayload | "global", string>> = {};

  if (!payload.nome.trim()) errors.nome = "Informe seu nome completo.";
  if (!validateEmail(payload.email)) errors.email = "Informe um e-mail válido.";
  if (onlyDigits(payload.telefone).length < 10) errors.telefone = "Informe um telefone válido com DDD.";
  if (!isValidCpf(payload.cpf)) errors.cpf = "CPF inválido.";
  if (!payload.data_nascimento) errors.data_nascimento = "Informe sua data de nascimento.";
  if (!payload.genero) errors.genero = "Selecione uma opção de gênero.";
  if (onlyDigits(payload.cep).length !== 8) errors.cep = "Informe um CEP válido.";
  if (!payload.rua.trim()) errors.rua = "Informe o nome da rua.";
  if (!payload.numero.trim()) errors.numero = "Informe o número.";
  if (!payload.bairro.trim()) errors.bairro = "Informe o bairro.";
  if (!payload.cidade.trim()) errors.cidade = "Informe a cidade.";
  if (!payload.estado.trim()) errors.estado = "Selecione o estado.";

  const hasNumber = /\d/;
  const hasSpecialChar = /[^a-zA-Z0-9]/;

  if (!payload.senha) errors.senha = "Informe uma senha.";
  else if (payload.senha.length < 8) errors.senha = "A senha deve ter no mínimo 8 caracteres.";
  else if (!hasNumber.test(payload.senha)) errors.senha = "A senha deve conter ao menos um número.";
  else if (!hasSpecialChar.test(payload.senha)) errors.senha = "A senha deve conter ao menos um caractere especial.";

  if (!payload.confirmarSenha) errors.confirmarSenha = "Confirme a senha informada.";
  else if (payload.confirmarSenha !== payload.senha) errors.confirmarSenha = "As senhas não coincidem.";

  if (!payload.terms) errors.global = "Você precisa aceitar os Termos de Uso e a Política de Privacidade.";

  return errors;
}
