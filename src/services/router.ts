const HOST = process.env.NEXT_PUBLIC_API_URL as string;

const routes = {
  login: {
    method: "POST",
    uri: "/api/v1/login",
  },
  getUserInfo: {
    method: "GET",
    uri: "/api/v1/user/info",
    listenHeaders: ["Authorization"],
  },
} as const;

export { HOST, routes };
