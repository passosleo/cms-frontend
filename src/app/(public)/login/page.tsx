"use client";
import { CustomButton } from "@/components/CustomButton";
import { CustomForm } from "@/components/CustomForm";
import { CustomInput } from "@/components/CustomInput";
import { useAuthContext } from "@/context/AuthContext";
import { loginSchema } from "@/schemas/login";
import { useCustomMutate } from "@/services/hooks/useCustomMutate";
import { LockIcon, MailIcon } from "lucide-react";
import { redirect } from "next/dist/server/api-utils";

export default function LoginPage() {
  const { onAuthenticated } = useAuthContext();
  const { mutate: login, isPending } = useCustomMutate({
    routeName: "login",
    setQueryKeys: ["login"],
    invalidateQueryKeys: ["user"],
    onSuccess: (res) => onAuthenticated(res?.data.token),
  });
  return (
    <div className="flex items-center justify-center h-screen w-full">
      <CustomForm
        zodSchema={loginSchema}
        onSubmit={(data) => login({ payload: data })}
      >
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
          leftElement={<LockIcon size={18} />}
        />
        <CustomButton type="submit" className="mt-5" isLoading={isPending}>
          Entrar
        </CustomButton>
      </CustomForm>
    </div>
  );
}
