import { Box } from "@mui/material";
import { ParallaxBanner } from "react-scroll-parallax";
import { BannerLayer } from "react-scroll-parallax/dist/components/ParallaxBanner/types";

const ParallaxBannerComponent = () => {
    const background: BannerLayer = {
      image:
        '/static/rainbow.jpg',
      translateY: [0, 50],
      opacity: [1, 0.3],
      scale: [1.05, 1, 'easeOutCubic'],
      shouldAlwaysCompleteAnimation: true,
    };
  
    const headline: BannerLayer = {
      translateY: [0, 30],
      scale: [1, 1.05, 'easeOutCubic'],
      shouldAlwaysCompleteAnimation: true,
      expanded: false,
      children: (
        <Box
          sx={{
            color: "#fff",
            fontSize: "3rem",
            fontWeight: "bold",
            textAlign: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "100%",
            zIndex: 2,
            textShadow: "0 2px 8px rgba(0,0,0,0.5)"
          }}
        >
          Wirth_It Music
        </Box>
      )
    };
  
    const foreground: BannerLayer = {
      image:
        'https://s3-us-west-2.amazonaws.com/s.cdpn.io/105988/banner-foreground.png',
      translateY: [0, 15],
      scale: [1, 1.1, 'easeOutCubic'],
      shouldAlwaysCompleteAnimation: true,
    };
  
    const gradientOverlay: BannerLayer = {
      opacity: [0, 0.9],
      shouldAlwaysCompleteAnimation: true,
      expanded: false,
    };
  
    return (
      <ParallaxBanner
        layers={[background, foreground, headline, gradientOverlay]}
        style={{
         height: '100vh',
        }}
      />
    );
  };

export default ParallaxBannerComponent;