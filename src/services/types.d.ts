import type { AxiosError } from "axios";
import { routes } from "./router";

export type RouteName = keyof typeof routes;

export type DefaultResponse<T> = {
  status: number;
  message: string;
  data?: T;
  [key: string]: any;
};

export type Params = Record<string, string | string[] | number | number[]>;

export type CustomAxiosError = AxiosError<DefaultResponse<null>>;
