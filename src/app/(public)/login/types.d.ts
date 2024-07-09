import { redirect } from "next/navigation";
export type LoginCredentialsRequest = {
  email: string;
  password: string;
};

export type LoginOAuth2Request = {
  code: string;
  redirectUri: string;
};

export type LoginResponse = {
  type: string;
  token: string;
};
