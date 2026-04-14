import { useMemo } from "react";
import { Alert, Box, CircularProgress, Container, Typography } from "@mui/material";
import PageWrapper from "../Components/PageWrapper/PageWrapper";
import SoundCloudEmbed from "../Components/MediaEmbeds/SoundCloudEmbed";
import YouTubeEmbed from "../Components/MediaEmbeds/YouTubeEmbed";
import { PROFILE_SOUNDCLOUD_TRACK_URLS } from "../config/profileMedia";
import { useProfileYoutubeVideos } from "../hooks/useProfileYoutubeVideos";
import { useSoundcloudTracks } from "../hooks/useSoundcloudTracks";

export default function ProfilePage() {
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
          SoundCloud uploads load from your mail API when credentials are set in Terraform; otherwise use manual track
          URLs in{" "}
          <Box component="span" sx={{ fontFamily: "monospace", fontSize: "0.9em" }}>
            profileMedia.ts
          </Box>
          . YouTube can use{" "}
          <Box component="span" sx={{ fontFamily: "monospace", fontSize: "0.9em" }}>
            .env
          </Box>{" "}
          (see{" "}
          <Box component="span" sx={{ fontFamily: "monospace", fontSize: "0.9em" }}>
            .env.example
          </Box>
          ).
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
                ? "Add soundcloud_client_id and soundcloud_client_secret to terraform.tfvars (see terraform.tfvars.example), deploy, and set VITE_MAIL_API_BASE_URL — or add URLs to PROFILE_SOUNDCLOUD_TRACK_URLS."
                : "No playable uploads found for this profile, or listing is empty — add fallback URLs in PROFILE_SOUNDCLOUD_TRACK_URLS."}
            </Typography>
          ) : (
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {soundcloudUrls.map((url) => (
                <SoundCloudEmbed key={url} trackUrl={url} />
              ))}
            </Box>
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
              {error} Showing any fallback IDs from config.
            </Alert>
          ) : null}
          {loading ? (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, py: 2 }}>
              <CircularProgress size={28} />
              <Typography variant="body2" color="text.secondary">
                Loading videos…
              </Typography>
            </Box>
          ) : videoIds.length === 0 ? (
            <Typography variant="body2" color="text.secondary">
              No videos yet — add YouTube video IDs to{" "}
              <Box component="span" sx={{ fontFamily: "monospace" }}>
                PROFILE_YOUTUBE_VIDEO_IDS
              </Box>{" "}
              or set{" "}
              <Box component="span" sx={{ fontFamily: "monospace" }}>
                VITE_YOUTUBE_API_KEY
              </Box>{" "}
              +{" "}
              <Box component="span" sx={{ fontFamily: "monospace" }}>
                VITE_YOUTUBE_CHANNEL_ID
              </Box>{" "}
              (or{" "}
              <Box component="span" sx={{ fontFamily: "monospace" }}>
                VITE_YOUTUBE_PLAYLIST_ID
              </Box>
              ).
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
