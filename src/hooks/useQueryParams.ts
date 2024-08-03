import { useSearchParams } from "next/navigation";

export function useQueryParams(
  queryParams: string[],
  defaultValue: string | null = null
) {
  const searchParams = useSearchParams();
  return queryParams.map((param) => searchParams.get(param) || defaultValue);
}
