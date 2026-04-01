export interface LoginFormState {
  email: string;
  senha: string;
  remember: boolean;
}

export interface LoginErrors {
  email?: string;
  senha?: string;
  global?: string;
}
