export type LoginRequest = {
  email: string;
  password: string;
};

export type LoginResponse = {
  type: string;
  token: string;
};
