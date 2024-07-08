"use client";
import { CustomButton } from "@/components/CustomButton";
import { CustomForm } from "@/components/CustomForm";
import { CustomInput } from "@/components/CustomInput";
import { loginSchema } from "@/schemas/login";
import { LockIcon, MailIcon } from "lucide-react";
import { useLogin } from "./hooks/useLogin";
import { CustomCheckbox } from "@/components/CustomCheckbox";

export default function LoginPage() {
  const { onSubmit, isLoading } = useLogin();
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <CustomForm zodSchema={loginSchema} onSubmit={onSubmit}>
        <CustomInput
          name="email"
          type="email"
          label="E-mail"
          placeholder="Insira seu e-mail"
          leftElement={<MailIcon size={18} />}
        />
        <CustomInput
          name="password"
          type="password"
          label="Senha"
          placeholder="Insira sua senha"
          containerClassName="mb-2"
          leftElement={<LockIcon size={18} />}
        />
        <CustomCheckbox name="rememberMe" label="Lembrar-me" />
        <CustomButton type="submit" isLoading={isLoading}>
          Entrar
        </CustomButton>
      </CustomForm>
    </div>
  );
}
