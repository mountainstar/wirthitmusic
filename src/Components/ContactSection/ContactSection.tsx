import { Box, Container, Typography } from "@mui/material";
import ContactForm from "../ContactForm";

export default function ContactSection() {
  return (
    <Box
      id="contact"
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Tell us about your date, venue, and vibe — we will follow up with next steps.
        </Typography>
        <ContactForm />
      </Container>
    </Box>
  );
}
