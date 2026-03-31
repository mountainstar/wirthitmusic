import { Box, Container, Typography } from "@mui/material";

const PLACEHOLDER_PORTRAIT =
  "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=80";

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
            alt="Energetic live event with stage lights"
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
              Event DJ & production for memorable nights
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Wirth_It Music is built around one thing: helping you host an event people
              talk about long after the last song. From ceremony to last dance, we bring
              polished MCing, seamless mixes, and sound that fits the room.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Whether it is a wedding reception, a company gala, or a milestone birthday,
              we work with you on timeline, genre, and energy so the dance floor stays
              full and the night feels effortless.
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
