import { Box, Typography } from "@mui/material";
import { ParallaxBanner } from "react-scroll-parallax";
import type { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";

const PLACEHOLDER_HERO =
  "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=1920&q=80";

export default function Hero() {
  const background: BannerLayer = {
    image: PLACEHOLDER_HERO,
    translateY: [0, 50],
    opacity: [1, 0.4],
    scale: [1.05, 1, "easeOutCubic"],
    shouldAlwaysCompleteAnimation: true,
  };

  const overlay: BannerLayer = {
    opacity: [0.3, 0.85],
    shouldAlwaysCompleteAnimation: true,
    expanded: false,
    children: (
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.6) 100%)",
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
        <Typography
          component="span"
          variant="h2"
          sx={{
            color: "primary.main",
            fontSize: { xs: "0.75rem", sm: "0.9rem" },
            letterSpacing: "0.4em",
            mb: 1,
          }}
        >
          Welcome
        </Typography>
        <Typography
          variant="h1"
          sx={{
            color: "white",
            fontSize: { xs: "2.5rem", sm: "3.5rem", md: "4.5rem" },
            lineHeight: 1.1,
            maxWidth: "800px",
            textShadow: "0 2px 24px rgba(0,0,0,0.8)",
          }}
        >
          Wirth It Music
        </Typography>
        <Typography
          variant="h5"
          component="p"
          sx={{
            color: "grey.300",
            fontWeight: 400,
            mt: 2,
            maxWidth: "560px",
            fontStyle: "italic",
            textShadow: "0 1px 12px rgba(0,0,0,0.6)",
          }}
        >
          “The rave was built on energy and the excitement of it all — get lost
          in the sound.”
        </Typography>
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
