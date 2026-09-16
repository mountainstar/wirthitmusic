import { Box } from "@mui/material";

type YouTubePlaylistEmbedProps = {
  playlistId: string;
  title?: string;
};

export default function YouTubePlaylistEmbed({
  playlistId,
  title = "YouTube uploads playlist",
}: YouTubePlaylistEmbedProps) {
  const src = `https://www.youtube-nocookie.com/embed/videoseries?list=${encodeURIComponent(playlistId)}`;

  return (
    <Box
      sx={{
        width: "100%",
        position: "relative",
        pt: "56.25%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "common.black",
      }}
    >
      <Box
        component="iframe"
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        sx={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: 0,
        }}
      />
    </Box>
  );
}
