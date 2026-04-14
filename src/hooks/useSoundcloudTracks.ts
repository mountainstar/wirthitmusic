import { useEffect, useState } from "react";

export type SoundcloudTrackRow = {
  id: number;
  title: string;
  permalink_url: string | null;
  artwork_url: string | null;
};

type ApiResponse = {
  configured?: boolean;
  tracks?: SoundcloudTrackRow[];
  error?: string;
};

export function useSoundcloudTracks(): {
  tracks: SoundcloudTrackRow[];
  loading: boolean;
  error: string | null;
  configured: boolean | null;
} {
  const [tracks, setTracks] = useState<SoundcloudTrackRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [configured, setConfigured] = useState<boolean | null>(null);

  useEffect(() => {
    const base = import.meta.env.VITE_MAIL_API_BASE_URL?.replace(/\/$/, "") ?? "";
    if (!base) {
      setConfigured(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    fetch(`${base}/soundcloud/tracks`, { method: "GET", headers: { accept: "application/json" } })
      .then(async (res) => {
        const data = (await res.json()) as ApiResponse;
        if (!res.ok) {
          throw new Error(typeof data.error === "string" ? data.error : res.statusText);
        }
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        setConfigured(data.configured ?? null);
        setTracks(Array.isArray(data.tracks) ? data.tracks.filter((t) => t?.permalink_url) : []);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setConfigured(null);
        setError(e instanceof Error ? e.message : "Could not load SoundCloud tracks");
        setTracks([]);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { tracks, loading, error, configured };
}
