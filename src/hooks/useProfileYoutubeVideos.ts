import { useEffect, useMemo, useState } from "react";
import { PROFILE_YOUTUBE_VIDEO_IDS } from "../config/profileMedia";

type State = { videoIds: string[]; loading: boolean; error: string | null };

/** UC… channel IDs use an uploads playlist id of UU + rest after "UC". */
function uploadsPlaylistIdFromChannelId(channelId: string): string | null {
  const t = channelId.trim();
  if (t.startsWith("UC") && t.length > 2) {
    return `UU${t.slice(2)}`;
  }
  return null;
}

function resolvePlaylistId(): string {
  const playlistFromEnv = import.meta.env.VITE_YOUTUBE_PLAYLIST_ID?.trim();
  const channelId = import.meta.env.VITE_YOUTUBE_CHANNEL_ID?.trim();
  return (
    playlistFromEnv ||
    (channelId ? uploadsPlaylistIdFromChannelId(channelId) ?? "" : "")
  );
}

export function useProfileYoutubeVideos(): State {
  const willFetch = useMemo(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY?.trim();
    return Boolean(apiKey && resolvePlaylistId());
  }, []);

  const [state, setState] = useState<State>(() => ({
    videoIds: willFetch ? [] : PROFILE_YOUTUBE_VIDEO_IDS.filter(Boolean),
    loading: willFetch,
    error: null,
  }));

  useEffect(() => {
    const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY?.trim();
    const playlistId = resolvePlaylistId();

    if (!apiKey || !playlistId) {
      setState({
        videoIds: PROFILE_YOUTUBE_VIDEO_IDS.filter(Boolean),
        loading: false,
        error: null,
      });
      return;
    }

    let cancelled = false;
    setState((s) => ({ ...s, loading: true, error: null }));

    const url = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
    url.searchParams.set("part", "snippet");
    url.searchParams.set("maxResults", "25");
    url.searchParams.set("playlistId", playlistId);
    url.searchParams.set("key", apiKey);

    fetch(url.toString())
      .then(async (res) => {
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || res.statusText);
        }
        return res.json() as Promise<{
          items?: { snippet?: { resourceId?: { videoId?: string } } }[];
        }>;
      })
      .then((data) => {
        if (cancelled) return;
        const ids =
          data.items
            ?.map((i) => i.snippet?.resourceId?.videoId)
            .filter((id): id is string => Boolean(id)) ?? [];
        const merged = ids.length > 0 ? ids : PROFILE_YOUTUBE_VIDEO_IDS.filter(Boolean);
        setState({ videoIds: merged, loading: false, error: null });
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : "Could not load YouTube playlist.";
        setState({
          videoIds: PROFILE_YOUTUBE_VIDEO_IDS.filter(Boolean),
          loading: false,
          error: message,
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
