"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Button } from "@/components/ui/button";

export default function LiveStream() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const live: boolean = !!searchParams.get("live");

  const createQueryString = useCallback(
    (name: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams]
  );

  const handleClick = () => {
    router.push(pathname + "?" + createQueryString("live", live ? "" : "true"));
  };

  return (
    <Button onClick={handleClick} variant={live ? "destructive" : "outline"} className="rounded-full">
      Live
    </Button>
  );
}
