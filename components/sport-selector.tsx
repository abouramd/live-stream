// components/sport-selector.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sport, getSports } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SportSelector({
  selectedSportId
}: {
  selectedSportId?: string;
}) {
  const [sports, setSports] = useState<Sport[]>([]);
  const router = useRouter();

  useEffect(() => {
    // Fetch sports when the component mounts
    async function fetchSports() {
      const sportData = await getSports();
      setSports(sportData);
    }
    fetchSports();
  }, []);

  const handleSportChange = (sportId: string) => {
    if (sportId) {
      // Navigate to the dynamic sport page
      router.push(`/sports/${sportId}`);
    }
  };



  return (
    <Select onValueChange={handleSportChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue
          placeholder={selectedSportId || "Select a sport"}
        />
      </SelectTrigger>
      <SelectContent>
        {sports.map((sport) => (
          <SelectItem key={sport.id} value={sport.id}>
            {sport.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
