import { LoginSchemaType } from "@/schemas/login";
import { useLoginService } from "./useLoginService";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useAuthContext } from "@/context/AuthContext";

export function useLogin() {
  const { onAuthenticated } = useAuthContext();
  const loginService = useLoginService();
  const { storeData, deleteStoredData, getStoredData } = useLocalStorage();
  const storedEmail = getStoredData("email");

  function onSubmit(data: LoginSchemaType) {
    loginService.mutate(
      {
        payload: {
          email: data.email,
          password: data.password,
        },
      },
      {
        onSuccess: (res) => {
          if (data.rememberMe) {
            storeData("email", data.email);
          } else {
            deleteStoredData("email");
          }
          if (res?.data) onAuthenticated(res.data.token);
        },
      }
    );
  }

  return {
    isLoading: loginService.isPending,
    onSubmit,
    storedEmail,
    storedRememberMe: !!storedEmail,
  };
}
