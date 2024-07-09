import { useCustomMutate } from "@/services/hooks/useCustomMutate";
import { LoginCredentialsRequest, LoginResponse } from "../types";

export function useLoginService() {
  const service = useCustomMutate<LoginCredentialsRequest, LoginResponse>({
    routeName: "login",
    setQueryKeys: ["login"],
    invalidateQueryKeys: ["user-info"],
  });
  return service;
}
