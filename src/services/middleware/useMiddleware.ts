import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import { CustomAxiosError, Params, RouteName } from "../types";
import { HOST, routes } from "../router";
import { useCookies } from "@/hooks/useCookies";
import { mountUrl } from "@/utils/url";
import { config } from "@/config";

export type RequestAxiosProps<PayloadType> = {
  config?: AxiosRequestConfig;
  routeName: RouteName;
  payload?: PayloadType;
  withAuth?: boolean;
  params?: Params;
  query?: Params;
};

export function useMiddleware() {
  function setAxiosAuthorization(request: AxiosInstance) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { getCookie } = useCookies();
    const token = getCookie("token");
    if (token) {
      request.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }

  async function requestAxios<ResponseType, PayloadType>({
    config = {},
    routeName,
    payload,
    params,
    query,
  }: RequestAxiosProps<PayloadType>) {
    const { method, uri, listenHeaders } = routes[routeName] as {
      listenHeaders?: string[];
      method: string;
      uri: string;
    };

    const request = Axios.create({
      ...config,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
        ...((config?.headers ?? {}) as Record<string, string>),
      },
    });
    const urlWithParams = mountUrl(uri, HOST, params, query);

    if (!!listenHeaders && listenHeaders.includes("Authorization"))
      setAxiosAuthorization(request);

    switch (method) {
      case "GET":
        return request.get<ResponseType>(urlWithParams);
      case "POST":
        return request.post<ResponseType>(urlWithParams, payload);
      case "PUT":
        return request.put<ResponseType>(urlWithParams, payload);
      case "PATCH":
        return request.patch<ResponseType>(urlWithParams, payload);
      case "DELETE":
        return request.delete<ResponseType>(urlWithParams);
      default:
        return request.get<ResponseType>(urlWithParams);
    }
  }

  function handleAxiosError(error: AxiosError) {
    const messageError = config.messages.response.error.default;
    const typedError = error as CustomAxiosError;
    const responseData = typedError.response?.data;

    const responseError = (responseData && responseData.error) as string;

    const descriptionError =
      responseError && typeof responseError === "string"
        ? responseError
        : messageError;

    // toast.error(descriptionError);
    alert(descriptionError);

    return { descriptionError };
  }

  return { requestAxios, handleAxiosError, setAxiosAuthorization };
}
