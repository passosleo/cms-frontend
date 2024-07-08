import { QueryKey, UseQueryOptions, useQuery } from "@tanstack/react-query";
import { useMiddleware } from "../middleware/useMiddleware";
import { DefaultResponse, Params, RouteName } from "../types";
import { AxiosError } from "axios";

export type CustomQueryProps<ReturnData> = {
  onError?: (error: any, res?: DefaultResponse<ReturnData>) => void;
  onSuccess?: (data: DefaultResponse<ReturnData>) => void;
  queryOptions?: UseQueryOptions<DefaultResponse<ReturnData>>;
  notHandleError?: boolean;
  queryKey: QueryKey;
  routeName: RouteName;
  enabled?: boolean;
  params?: Params;
  query?: Params;
};

export function useCustomQuery<ReturnData>({
  queryKey,
  enabled = true,
  notHandleError,
  queryOptions,
  routeName,
  params,
  query: queryParam,
  ...statusFunctions
}: CustomQueryProps<ReturnData>) {
  const { requestAxios, handleAxiosError } = useMiddleware();

  function onError(error: AxiosError<any>) {
    if (!notHandleError) handleAxiosError(error);
    if (statusFunctions.onError)
      statusFunctions.onError(error, error.response?.data);
  }

  function onSuccess(data: DefaultResponse<ReturnData>) {
    if (statusFunctions.onSuccess) statusFunctions.onSuccess(data);
  }

  async function handleQuery() {
    return requestAxios({
      routeName,
      params,
      query: queryParam,
    })
      .then((res) => {
        onSuccess(res.data as DefaultResponse<ReturnData>);
        return res.data;
      })
      .catch(onError) as Promise<DefaultResponse<ReturnData>>;
  }

  return useQuery({
    queryKey,
    enabled,
    queryFn: handleQuery,
    ...queryOptions,
  });
}
