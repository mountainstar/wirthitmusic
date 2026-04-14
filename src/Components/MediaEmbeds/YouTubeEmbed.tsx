import { Box } from "@mui/material";

type YouTubeEmbedProps = {
  videoId: string;
  title?: string;
};

export default function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}`;

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
        title={title || `YouTube video ${videoId}`}
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
