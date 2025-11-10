import { APIMatch, Sport, Stream } from "@/lib/types";

// --- Base URL ---
const API_BASE_URL = "https://streamed.pk";

/**
 * Fetches all available sport categories.
 */
export async function getSports(): Promise<Sport[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/sports`);
    if (!res.ok) throw new Error("Failed to fetch sports");
    return res.json();
  } catch (error) {
    console.error("Error fetching sports:", error);
    return []; 
  }
}

/**
 * Fetches the sport by ID
 */
export async function getSportById(sportId: string): Promise<Sport | null> {
  try {
    const sports = await getSports();
    const sport = sports.find(s => s.id === sportId);
    return sport || null;
    } catch (error) {
    console.error(`Error fetching sport ${sportId}:`, error);
    return null;
  }
}


/**
 * Fetches matches by category (e.g., "live", "football", "all").
 */
export async function getMatches(category: string): Promise<APIMatch[]> {
  // ... (same as before)
  try {
    const res = await fetch(`${API_BASE_URL}/api/matches/${category}`);
    if (!res.ok) throw new Error(`Failed to fetch matches for ${category}`);
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${category} matches:`, error);
    return [];
  }
}

// NEW: Fetches streams for a specific source
export async function getStreams(sourceName: string, sourceId: string): Promise<Stream[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/api/stream/${sourceName}/${sourceId}`);
    if (!res.ok) throw new Error(`Failed to fetch streams for ${sourceName}`);
    return res.json();
  } catch (error) {
    console.error(`Error fetching ${sourceName} streams:`, error);
    return [];
  }
}

/**
 * Helper function to get the full URL for a team badge.
 */
export function getBadgeUrl(badgeId: string): string {
  return `${API_BASE_URL}/api/images/badge/${badgeId}.webp`;
}

// NEW: Helper function to get a single match
// NOTE: The API docs don't show a /api/matches/id/[matchId] endpoint.
// This function fetches a broad list and finds the match, which is
// the only way to get match details on a deep-linked page.
export async function getMatchById(matchId: string): Promise<APIMatch | null> {
  try {
    // We fetch "all-today" as a good fallback to find the match
    const matches = await getMatches("all-today");
    const match = matches.find(m => m.id === matchId);
    return match || null;
  } catch (error) {
    console.error(`Error fetching match by id ${matchId}:`, error);
    return null;
  }
}