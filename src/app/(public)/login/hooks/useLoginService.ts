import { useAuthContext } from "@/context/AuthContext";
import { useCustomMutate } from "@/services/hooks/useCustomMutate";
import { LoginRequest, LoginResponse } from "../types";

export function useLoginService() {
  const { onAuthenticated } = useAuthContext();
  const service = useCustomMutate<LoginRequest, LoginResponse>({
    routeName: "login",
    setQueryKeys: ["login"],
    invalidateQueryKeys: ["user-info"],
    onSuccess: (res) => {
      if (res?.data) onAuthenticated(res.data.token);
    },
  });
  return service;
}
