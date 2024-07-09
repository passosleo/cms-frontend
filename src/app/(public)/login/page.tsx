"use client";
import { CustomButton } from "@/components/CustomButton";
import { CustomForm } from "@/components/CustomForm";
import { CustomInput } from "@/components/CustomInput";
import { loginSchema } from "@/schemas/login";
import { FacebookIcon, LinkedinIcon, LockIcon, MailIcon } from "lucide-react";
import { useLogin } from "./hooks/useLogin";
import { CustomCheckbox } from "@/components/CustomCheckbox";
import Link from "next/link";

export default function LoginPage() {
  const { onSubmit, storedEmail, storedRememberMe, isLoading } = useLogin();
  return (
    <div className="flex flex-col items-center justify-center h-screen w-full">
      <CustomForm
        zodSchema={loginSchema}
        useFormProps={{
          defaultValues: {
            email: storedEmail || "",
            rememberMe: storedRememberMe,
          },
        }}
        onSubmit={onSubmit}
      >
        <CustomInput
          name="email"
          type="email"
          label="E-mail"
          placeholder="Insira seu e-mail"
          disabled={isLoading}
          leftElement={<MailIcon size={18} />}
        />
        <CustomInput
          name="password"
          type="password"
          label="Senha"
          placeholder="Insira sua senha"
          disabled={isLoading}
          leftElement={<LockIcon size={18} />}
        />
        <CustomCheckbox
          name="rememberMe"
          label="Lembrar-me"
          disabled={isLoading}
        />
        <div className="flex gap-2 items-center justify-center mb-2">
          <Link href="https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=77vkfuzgwhw5rn&redirect_uri=http://localhost:3000/login/callback?provider=linkedin&state=foobar&scope=openid%20email%20profile">
            <CustomButton variant="outline" size="icon" disabled={isLoading}>
              <LinkedinIcon />
            </CustomButton>
          </Link>
          <Link href="https://www.facebook.com/v20.0/dialog/oauth?client_id=985096126442471&redirect_uri=http://localhost:3000/login/callback?provider=facebook&state=123&scope=email">
            <CustomButton variant="outline" size="icon" disabled={isLoading}>
              <FacebookIcon />
            </CustomButton>
          </Link>
        </div>
        <CustomButton type="submit" isLoading={isLoading}>
          Entrar
        </CustomButton>
      </CustomForm>
    </div>
  );
}
