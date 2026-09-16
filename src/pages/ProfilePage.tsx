import { useCallback, useEffect, useMemo, useState } from "react";
import type { UIEvent } from "react";
import { Alert, Box, CircularProgress, Container, Typography } from "@mui/material";
import PageWrapper from "../Components/PageWrapper/PageWrapper";
import SoundCloudEmbed from "../Components/MediaEmbeds/SoundCloudEmbed";
import YouTubeEmbed from "../Components/MediaEmbeds/YouTubeEmbed";
import YouTubePlaylistEmbed from "../Components/MediaEmbeds/YouTubePlaylistEmbed";
import {
  PROFILE_SOUNDCLOUD_TRACK_URLS,
  PROFILE_YOUTUBE_CHANNEL_ID,
} from "../config/profileMedia";
import { useProfileYoutubeVideos } from "../hooks/useProfileYoutubeVideos";
import { useSoundcloudTracks } from "../hooks/useSoundcloudTracks";

export default function ProfilePage() {
  const INITIAL_SOUNDLOUD_COUNT = 3;
  const SOUNDCLOUD_BATCH_SIZE = 3;

  const { videoIds, loading, error } = useProfileYoutubeVideos();
  const {
    tracks: apiSoundcloudTracks,
    loading: scLoading,
    error: scError,
    configured: scConfigured,
  } = useSoundcloudTracks();

  const soundcloudUrlsFromApi = apiSoundcloudTracks
    .map((t) => t.permalink_url)
    .filter((u): u is string => Boolean(u));

  const hasMailApi = Boolean(import.meta.env.VITE_MAIL_API_BASE_URL?.trim());
  const soundcloudUrls = useMemo(() => {
    if (hasMailApi) {
      if (scLoading) {
        return [];
      }
      return soundcloudUrlsFromApi.length > 0 ? soundcloudUrlsFromApi : PROFILE_SOUNDCLOUD_TRACK_URLS;
    }
    return PROFILE_SOUNDCLOUD_TRACK_URLS;
  }, [hasMailApi, scLoading, soundcloudUrlsFromApi]);
  const [visibleSoundcloudCount, setVisibleSoundcloudCount] = useState(
    INITIAL_SOUNDLOUD_COUNT,
  );

  useEffect(() => {
    setVisibleSoundcloudCount(INITIAL_SOUNDLOUD_COUNT);
  }, [soundcloudUrls.length]);

  const visibleSoundcloudUrls = soundcloudUrls.slice(0, visibleSoundcloudCount);
  const hasMoreSoundcloud = visibleSoundcloudCount < soundcloudUrls.length;

  const handleSoundcloudScroll = useCallback(
    (event: UIEvent<HTMLDivElement>) => {
      if (!hasMoreSoundcloud) {
        return;
      }
      const el = event.currentTarget;
      const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 80;
      if (nearBottom) {
        setVisibleSoundcloudCount((current) =>
          Math.min(current + SOUNDCLOUD_BATCH_SIZE, soundcloudUrls.length),
        );
      }
    },
    [hasMoreSoundcloud, soundcloudUrls.length],
  );

  const playlistId =
    import.meta.env.VITE_YOUTUBE_PLAYLIST_ID?.trim() ||
    (() => {
      const channelId =
        import.meta.env.VITE_YOUTUBE_CHANNEL_ID?.trim() || PROFILE_YOUTUBE_CHANNEL_ID;
      if (channelId.startsWith("UC") && channelId.length > 2) {
        return `UU${channelId.slice(2)}`;
      }
      return "";
    })();

  return (
    <PageWrapper showHero={false}>
      <Container maxWidth="md" sx={{ py: { xs: 4, sm: 6 }, px: { xs: 2, sm: 3 } }}>
        <Typography
          variant="overline"
          sx={{ letterSpacing: "0.2em", display: "block", mb: 1, color: "text.secondary" }}
        >
          Listen & watch
        </Typography>
        <Typography variant="h3" component="h1" sx={{ mb: 1, fontWeight: 600 }}>
          Profile
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 560 }}>
          A mix of recent uploads, live edits, and performance clips from Wirth_it.
        </Typography>

        <Box component="section" sx={{ mb: 5 }}>
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            SoundCloud
          </Typography>
          {scError ? (
            <Alert severity="warning" sx={{ mb: 2 }}>
              {scError}
            </Alert>
          ) : null}
          {scLoading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
              <CircularProgress size={28} />
              <Typography variant="body2" color="text.secondary">
                Loading tracks…
              </Typography>
            </Box>
          ) : soundcloudUrls.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              {scConfigured === false
                ? "SoundCloud tracks will appear here once the integration is connected."
                : "No SoundCloud tracks are available right now. Please check back soon."}
            </Typography>
          ) : (
            <>
              <Box
                onScroll={handleSoundcloudScroll}
                sx={{
                  maxHeight: { xs: 560, md: 600 },
                  overflowY: "auto",
                  pr: 0.5,
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                }}
              >
                {visibleSoundcloudUrls.map((url) => (
                  <SoundCloudEmbed key={url} trackUrl={url} />
                ))}
              </Box>
              {hasMoreSoundcloud ? (
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: "block" }}>
                  Scroll to load more tracks.
                </Typography>
              ) : null}
            </>
          )}
        </Box>

        <Box component="section">
          <Typography
            variant="subtitle1"
            sx={{ mb: 2, letterSpacing: "0.08em", textTransform: "uppercase" }}
          >
            YouTube
          </Typography>
          {error ? (
            <Alert severity="warning" sx={{ mb: 2 }}>
              We could not load the latest YouTube videos right now.
            </Alert>
          ) : null}
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
              <CircularProgress size={28} />
              <Typography variant="body2" color="text.secondary">
                Loading videos…
              </Typography>
            </Box>
          ) : videoIds.length === 0 && playlistId ? (
            <YouTubePlaylistEmbed
              playlistId={playlistId}
              title="Wirth_it uploads playlist"
            />
          ) : videoIds.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No YouTube videos are available right now. Please check back soon.
            </Typography>
          ) : (
            <Box
              sx={{
                display: "grid",
                gap: 2,
                gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)" },
              }}
            >
              {videoIds.map((id) => (
                <YouTubeEmbed key={id} videoId={id} />
              ))}
            </Box>
          )}
        </Box>
      </Container>
    </PageWrapper>
  );
}
