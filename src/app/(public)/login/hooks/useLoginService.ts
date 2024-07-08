import { useCustomMutate } from "@/services/hooks/useCustomMutate";
import { LoginRequest, LoginResponse } from "../types";

export function useLoginService() {
  const service = useCustomMutate<LoginRequest, LoginResponse>({
    routeName: "login",
    setQueryKeys: ["login"],
    invalidateQueryKeys: ["user-info"],
  });
  return service;
}
