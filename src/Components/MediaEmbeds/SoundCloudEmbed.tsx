import { Box } from "@mui/material";

type SoundCloudEmbedProps = {
  /** Full SoundCloud track URL (permalink). */
  trackUrl: string;
  height?: number;
};

export default function SoundCloudEmbed({ trackUrl, height = 166 }: SoundCloudEmbedProps) {
  const src = `https://w.soundcloud.com/player/?url=${encodeURIComponent(
    trackUrl,
  )}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`;

  return (
    <Box
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: "divider",
        borderRadius: 1,
        overflow: "hidden",
        bgcolor: "background.paper",
      }}
    >
      <iframe
        title={`SoundCloud: ${trackUrl}`}
        width="100%"
        height={height}
        loading="lazy"
        scrolling="no"
        style={{ border: 0, display: "block" }}
        allow="autoplay"
        src={src}
      />
    </Box>
  );
}
