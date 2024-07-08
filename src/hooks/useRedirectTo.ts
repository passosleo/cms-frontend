export function useRedirectTo() {
  if (typeof window === "undefined") return null;
  const queryParams = new URLSearchParams(window.location.search);
  const redirectTo = queryParams.get("redirectTo");
  return redirectTo;
}
