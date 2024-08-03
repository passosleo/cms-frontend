"use client";
import { CustomLoading } from "@/components/CustomLoading";
import { useCustomMutate } from "@/services/hooks/useCustomMutate";
import { usePathname, useSearchParams } from "next/navigation";
import { LoginOAuth2Request, LoginResponse } from "../types";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/context/AuthContext";
import { useQueryParams } from "../../../../hooks/useQueryParams";

export default function LoginCallbackPage() {
  const { onAuthenticated } = useAuthContext();
  const [provider, code] = useQueryParams(["provider", "code"]);
  const pathname = usePathname();
  const redirectUri =
    window.location.origin + pathname + `?provider=${provider}`;
  const [hasMutated, setHasMutated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginService = useCustomMutate<LoginOAuth2Request, LoginResponse>({
    routeName: "loginOAuth2",
    setQueryKeys: ["loginOAuth2"],
    invalidateQueryKeys: ["user-info"],
    retry: false,
    onSuccess: (res) => {
      if (res?.data) onAuthenticated(res.data.token);
    },
    onError: (error) => {
      setError(error.message);
    },
  });

  useEffect(() => {
    if (provider && code && redirectUri && !hasMutated) {
      loginService.mutate({
        payload: { code, redirectUri },
        params: { provider },
      });
      setHasMutated(true);
    }
  }, [provider, code, redirectUri, loginService, hasMutated, onAuthenticated]);

  return !!error ? <div>{error}</div> : <CustomLoading isLoading fullScreen />;
}
