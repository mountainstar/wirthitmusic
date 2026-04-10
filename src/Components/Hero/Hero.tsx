import { Box, Typography } from "@mui/material";
import { ParallaxBanner } from "react-scroll-parallax";
import type { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";

const PLACEHOLDER_HERO =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1920&q=80";

export default function Hero() {
  const background: BannerLayer = {
    image: PLACEHOLDER_HERO,
    translateY: [0, 50],
    opacity: [1, 0.4],
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const overlay: BannerLayer = {
    opacity: [0.55, 0.92],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.82) 100%)",
          pointerEvents: "none",
        }}
      />
    ),
  };

  const content: BannerLayer = {
    translateY: [0, 25],
    scale: [1, 1.02, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          px: 2,
          zIndex: 2,
        }}
      >
        <Box
          sx={{
            px: { xs: 2, sm: 3 },
            py: { xs: 1.5, sm: 2 },
            bgcolor: "rgba(0,0,0,0.35)",
            border: "1px solid rgba(255,255,255,0.15)",
            backdropFilter: "blur(2px)",
            maxWidth: "900px",
          }}
        >
        <Typography
          component="span"
          variant="h2"
          sx={{
            color: "primary.main",
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            letterSpacing: "0.4em",
            mb: 1,
            textShadow: "0 1px 10px rgba(0,0,0,0.9)",
          }}
        >
          DJ & event services
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: "white",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
            lineHeight: 1.1,
            maxWidth: "800px",
            textShadow: "0 3px 28px rgba(0,0,0,0.95)",
          }}
        >
          Wirth_It Music
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: "grey.300",
            fontWeight: 400,
            mt: 2,
            maxWidth: "620px",
            fontStyle: "normal",
            textShadow: "0 2px 14px rgba(0,0,0,0.95)",
          }}
        >
          Professional sound and mixing for weddings, corporate events, and private
          celebrations — tailored to your crowd and your vibe.
        </Typography>
        </Box>
      </Box>
    ),
  };

  return (
    <ParallaxBanner
      layers={[background, overlay, content]}
      style={{ height: "100vh", minHeight: "500px" }}
    />
  );
}
