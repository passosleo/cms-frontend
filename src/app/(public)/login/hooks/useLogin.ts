import { LoginSchemaType } from "@/schemas/login";
import { useLoginService } from "./useLoginService";

export function useLogin() {
  const loginService = useLoginService();

  function onSubmit(data: LoginSchemaType) {
    loginService.mutate({ payload: data });
  }

  return {
    isLoading: loginService.isPending,
    onSubmit,
  };
}
