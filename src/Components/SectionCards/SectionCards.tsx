import { Link as RouterLink } from "react-router-dom";
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
  weddings:
    "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
  corporate:
    "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80",
  celebrations:
    "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
  production:
    "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
};

const sections = [
  {
    id: "weddings",
    to: "/weddings",
    title: "Weddings",
    subtitle: "Receptions & ceremonies",
    image: PLACEHOLDERS.weddings,
    imageAlt: "Wedding celebration with guests",
  },
  {
    id: "corporate",
    to: "/corporate",
    title: "Corporate",
    subtitle: "Galas, launches & holiday parties",
    image: PLACEHOLDERS.corporate,
    imageAlt: "Corporate event venue with seating",
  },
  {
    id: "celebrations",
    to: "/parties",
    title: "Private parties",
    subtitle: "Birthdays & milestones",
    image: PLACEHOLDERS.celebrations,
    imageAlt: "Colorful birthday party balloons and cake",
  },
  {
    id: "production",
    to: "/production",
    title: "Sound & experience",
    subtitle: "Production & lighting support",
    image: PLACEHOLDERS.production,
    imageAlt: "Concert stage lighting and crowd",
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
        {sections.map(({ id, to, title, subtitle, image, imageAlt }) => (
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
                component={RouterLink}
                to={to}
                sx={{ display: "block", color: "inherit", textDecoration: "none" }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={image}
                  alt={imageAlt}
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
