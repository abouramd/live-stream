"use server";

import { Match, Sport, Stream } from "@/types";

const WEBSITE_URL = "https://streamed.pk";

export async function fetchLiveMatches(popular: boolean = false) {
  const response = await fetch(`${WEBSITE_URL}/api/matches/live${popular ? '/popular' : ''}`);
  const matches = await response.json();
  return matches as Match[];
}

export async function fetchMatchByID(id: string) {
    const matches = await fetchLiveMatches();
    const match = matches.find((match) => match.id === id);
    return match;
}

export async function fetchMatchesBySport(sportId: string, popular: boolean = false) {
    const response = await fetch(`${WEBSITE_URL}/api/matches/sport/${sportId}${popular ? '/popular' : ''}`);
    const matches = await response.json();
    return matches as Match[];
}

export async function fetchStreams(sources: {
    source: string;
    id: string;
  }[]) {
  const streams = await Promise.all(
    sources.map(async (source) => {
      const response = await fetch(
        `${WEBSITE_URL}/api/stream/${source.source}/${source.id}`
      );
      const stream = await response.json();
      return stream;
    })
  );
  return [].concat(...streams) as Stream[];
}

export async function fetchSports() {
  const response = await fetch(`${WEBSITE_URL}/api/sports`);
  const sports = await response.json();
  return sports as Sport[];
}

export async function fetchScheduledMatches() {
  const response = await fetch(`${WEBSITE_URL}/api/matches/all-today`);
  const matches = await response.json();
  return matches as Match[];
}
  