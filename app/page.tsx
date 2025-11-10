// app/page.tsx
import { getMatches } from "@/lib/api";
import { MatchCard } from "@/components/match-card";
import { SportSelector } from "@/components/sport-selector";

export default async function HomePage() {
  // Fetch live matches on the server
  const liveMatches = await getMatches("live");

  return (
    <main className="container p-4 mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="mb-6 text-3xl font-bold">Live Matches</h1>
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