export function useLocalStorage() {
  function storeData<T = any>(key: string, data: T) {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(key, JSON.stringify(data));

        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  function getStoredData<T = any>(
    key: string,
    defaultData: T | null = null
  ): T | null {
    try {
      if (typeof window !== "undefined") {
        const item = localStorage.getItem(key);
        if (!item) return defaultData;
        return JSON.parse(item) as T;
      }
      return defaultData;
    } catch {
      return defaultData;
    }
  }

  function deleteStoredData(key: string) {
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(key);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  function clearStorage() {
    try {
      if (typeof window !== "undefined") {
        localStorage.clear();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  return { storeData, getStoredData, deleteStoredData, clearStorage };
}
