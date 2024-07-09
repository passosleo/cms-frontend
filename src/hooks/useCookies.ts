export function useCookies() {
  function setCookie<T>(
    key: string,
    value: T,
    expirationDate: Date | null = null,
    path = "/"
  ) {
    try {
      if (typeof document !== "undefined") {
        let cookieString = `${key}=${encodeURIComponent(
          JSON.stringify(value)
        )}`;
        if (expirationDate !== null) {
          let cookieExpirationDate = new Date(expirationDate);
          cookieExpirationDate.setDate(
            cookieExpirationDate.getDate() + expirationDate.getDate()
          );
          cookieString += `; expires=${cookieExpirationDate.toUTCString()}`;
          cookieString += `; path=${path}`;
        }
        document.cookie = cookieString;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  function getCookie<T>(key: string): T | null {
    try {
      if (typeof document !== "undefined") {
        const cookies = document.cookie
          .split(";")
          .map((cookie) => cookie.trim());
        for (const cookie of cookies) {
          const [cookieKey, cookieValue] = cookie.split("=");
          if (cookieKey === key) {
            return JSON.parse(decodeURIComponent(cookieValue));
          }
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  function invalidateCookie(key: string) {
    try {
      if (typeof document !== "undefined") {
        document.cookie = `${key}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  return { setCookie, getCookie, invalidateCookie };
}
