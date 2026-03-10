import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const PLACEHOLDERS = {
  merch: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  vinyl: "https://images.unsplash.com/photo-1611339555312-e607a835f912?w=800&q=80",
  tour: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80",
  discography:
    "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&q=80",
};

const sections = [
  {
    id: "merch",
    title: "Merchandise",
    subtitle: "Official Online Store",
    image: PLACEHOLDERS.merch,
  },
  {
    id: "music",
    title: "Vinyl Sessions",
    subtitle: "Music & Mixes",
    image: PLACEHOLDERS.vinyl,
  },
  {
    id: "tour",
    title: "Tour Dates",
    subtitle: "& Tickets",
    image: PLACEHOLDERS.tour,
  },
  {
    id: "discography",
    title: "Discography",
    subtitle: "Releases & Labels",
    image: PLACEHOLDERS.discography,
  },
] as const;

export default function SectionCards() {
  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, sm: 3 },
      }}
    >
      <Grid container spacing={3} sx={{ maxWidth: 1400, mx: "auto" }}>
        {sections.map(({ id, title, subtitle, image }) => (
          <Grid key={id} size={{ xs: 12, sm: 6, md: 6 }} id={id}>
            <Card
              elevation={0}
              sx={{
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 0,
                overflow: "hidden",
                transition: "transform 0.25s ease, border-color 0.25s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  borderColor: "primary.main",
                },
              }}
            >
              <CardActionArea
                component="div"
                onClick={() => {}}
                sx={{ display: "block" }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={image}
                  alt=""
                  sx={{
                    objectFit: "cover",
                    filter: "grayscale(20%)",
                    transition: "filter 0.25s ease",
                    ".MuiCardActionArea-root:hover &": {
                      filter: "grayscale(0%)",
                    },
                  }}
                />
                <CardContent sx={{ py: 3, px: 3 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      color: "primary.main",
                      letterSpacing: "0.08em",
                      mb: 0.5,
                    }}
                  >
                    {title.toUpperCase()}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      letterSpacing: "0.06em",
                      textTransform: "uppercase",
                    }}
                  >
                    {subtitle}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
