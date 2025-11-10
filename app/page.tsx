// app/page.tsx
import { getMatches } from "@/lib/api";
import { MatchCard } from "@/components/match-card";
import { SportSelector } from "@/components/sport-selector";
import SearchInput from "@/components/SearchInput";

export default async function HomePage({ searchParams } : { searchParams: Promise<{ q?: string }>}) {
  // Fetch live matches on the server
  let liveMatches = await getMatches("all-today");

  // filter using query 
  const { q: query } = await searchParams;
  console.log(query, liveMatches.length);
  if (query) {
    liveMatches = liveMatches.filter((match) =>
      match.title.toLowerCase().includes(query.toLowerCase())
    );
  }
  console.log(liveMatches.length);


  return (
    <main className="container p-4 mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="mb-6 text-3xl font-bold">Live Matches</h1>
        <SearchInput />
        <SportSelector />
      </div>


      {liveMatches.length === 0 && (
        <p>No live matches at the moment.</p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {liveMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </main>
  );
}