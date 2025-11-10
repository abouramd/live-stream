// app/sports/[sportId]/page.tsx
import { getMatches, getSportById, getSports } from "@/lib/api";
import { MatchCard } from "@/components/match-card";
import { SportSelector } from "@/components/sport-selector";
import { notFound } from "next/navigation";
import SearchInput from "@/components/SearchInput";

// Props definition
interface SportPageProps {
  params: Promise<{
    sportId: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SportPage({ params, searchParams }: SportPageProps) {
  const { sportId } = await params;

  const sportData = await getSportById(sportId);

  if (!sportData) {
    return notFound();
  }

  // Fetch matches for the specific sport
  let matches = await getMatches(sportId);

  // filter using query 
  const { q: query } = await searchParams;
  if (query) {
    matches = matches.filter((match) =>
      match.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  
  return (
    <main className="container p-4 mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="mb-6 text-3xl font-bold">{sportData.name} Matches</h1>
        <SearchInput />
        <SportSelector selectedSportId={sportId}/>
      </div>

      {matches.length === 0 && <p>No matches found for {sportId}.</p>}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </main>
  );
}

// (Optional) Generate static pages for all sports for better performance
export async function generateStaticParams() {
  const sports = await getSports();

  return sports.map((sport) => ({
    sportId: sport.id,
  }));
}
