import { useState } from "react";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";

export default function MailingList() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 6, md: 8 },
        borderTop: "1px solid",
        borderColor: "divider",
      }}
    >
      <Container maxWidth="sm">
        <Typography
          variant="h5"
          sx={{
            textAlign: "center",
            mb: 1,
            letterSpacing: "0.04em",
          }}
        >
          Stay in the loop
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ textAlign: "center", mb: 3 }}
        >
          Get updates on availability, promotions, and event ideas.
        </Typography>
        {submitted ? (
          <Alert severity="success" sx={{ justifyContent: "center" }}>
            Thanks for signing up. (No API connected — placeholder.)
          </Alert>
        ) : (
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: 1,
              alignItems: "stretch",
            }}
          >
            <TextField
              fullWidth
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              size="medium"
              sx={{
                "& .MuiOutlinedInput-root": {
                  bgcolor: "background.paper",
                  borderRadius: 0,
                },
              }}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                minWidth: { sm: 140 },
                borderRadius: 0,
              }}
            >
              Sign up
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
