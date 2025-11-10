"use client"; // This must be a Client Component

import { useCallback, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SearchInput() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Prevent full page reload
    // Navigate to the search page with the query
    router.push(pathname + "?" + createQueryString("q", query));
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
      <Button type="submit">Search</Button>
    </form>
  );
}
