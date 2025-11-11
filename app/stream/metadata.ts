import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Watch Live Stream - Watch Live",
    description: "Watch the live stream with multiple source options and HD quality.",
    robots: {
      index: false,
      follow: false,
    },
  };
}
