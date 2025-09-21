"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function UseUpdateSearchParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Update or remove a query param
   * @param key The param name
   * @param value The param value, if null/empty then it will be removed
   * @param resetOthers If true, resets all other query params
   */
  function setParam(
    key: string,
    value: string | null,
    resetOthers: boolean = false
  ): void {
    const params = new URLSearchParams(
      resetOthers ? undefined : searchParams.toString()
    );

    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return { setParam, searchParams };
}
