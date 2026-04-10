import { Box, Container, Grid, Typography } from "@mui/material";

type ImageItem = {
  src: string;
  alt: string;
};

type VideoItem = {
  src: string;
  title: string;
};

const images: ImageItem[] = [
  { src: "/media/images/IMG_2616.png", alt: "DJ setup in a warm indoor venue" },
  { src: "/media/images/IMG_2676.png", alt: "Live event space with stage and speakers" },
  { src: "/media/images/IMG_2650.png", alt: "Dance lighting setup and DJ booth" },
  { src: "/media/images/IMG_3141.png", alt: "Close-up of DJ performance at home setup" },
];

const videos: VideoItem[] = [
  // Add your clips in public/media/videos and list them here.
  // Example: { src: "/media/videos/highlight-reel.mp4", title: "Highlight Reel" },
];

export default function MediaShowcase() {
  return (
    <Box component="section" id="media" sx={{ py: { xs: 6, md: 10 }, px: { xs: 2, sm: 3 } }}>
      <Container maxWidth="lg" sx={{ px: 0 }}>
        <Typography
          variant="overline"
          sx={{ color: "primary.main", letterSpacing: "0.3em", display: "block", mb: 1 }}
        >
          Media
        </Typography>
        <Typography variant="h4" sx={{ mb: 4, letterSpacing: "0.02em" }}>
          Photos and event highlights
        </Typography>

        <Grid container spacing={2.5} sx={{ mb: videos.length ? 4 : 0 }}>
          {images.map((image) => (
            <Grid key={image.src} size={{ xs: 12, sm: 6 }}>
              <Box
                component="img"
                src={image.src}
                alt={image.alt}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: { xs: 240, md: 320 },
                  objectFit: "cover",
                  border: "1px solid",
                  borderColor: "divider",
                }}
              />
            </Grid>
          ))}
        </Grid>

        {videos.length > 0 && (
          <>
            <Typography variant="h5" sx={{ mb: 2 }}>
              Videos
            </Typography>
            <Grid container spacing={2.5}>
              {videos.map((video) => (
                <Grid key={video.src} size={{ xs: 12, md: 6 }}>
                  <Box
                    component="video"
                    controls
                    preload="metadata"
                    aria-label={video.title}
                    sx={{
                      width: "100%",
                      display: "block",
                      border: "1px solid",
                      borderColor: "divider",
                      bgcolor: "black",
                    }}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </Box>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Container>
    </Box>
  );
}
