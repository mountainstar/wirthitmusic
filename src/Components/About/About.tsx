import { Box, Container, Typography } from "@mui/material";

const PLACEHOLDER_PORTRAIT =
  "https://images.unsplash.com/photo-1571266028243-d220e8d2d420?w=600&q=80";

export default function About() {
  return (
    <Box
      id="about"
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="md">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1.2fr" },
            gap: 4,
            alignItems: "center",
          }}
        >
          <Box
            component="img"
            src={PLACEHOLDER_PORTRAIT}
            alt=""
            sx={{
              width: "100%",
              maxWidth: 400,
              height: "auto",
              objectFit: "cover",
              justifySelf: "center",
            }}
          />
          <Box>
            <Typography
              variant="overline"
              sx={{
                color: "primary.main",
                letterSpacing: "0.3em",
                display: "block",
                mb: 1,
              }}
            >
              About
            </Typography>
            <Typography variant="h4" sx={{ mb: 2, letterSpacing: "0.02em" }}>
              The home of all things Wirth_It Music
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              News, tour dates and music. This is the digital hub for the sound — a place
              to get lost in the energy and excitement of the rave.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Iconic sounds and a lasting legacy. From the studio to the stage, the
              mission is simple: move the crowd and keep the party alive.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
