import { RegisterPayload } from "../../types/domain";

export type RegisterFormState = RegisterPayload;

export type RegisterErrors = Partial<Record<keyof RegisterPayload | "global", string>>;
