import { useState } from "react";
import { Box, Button, Container, TextField, Typography, Alert } from "@mui/material";
import { subscribeEmail } from "../../utils/emailService";

export default function MailingList() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    setAlreadySubscribed(false);

    try {
      const status = await subscribeEmail(email.trim());
      setSubmitted(true);
      setAlreadySubscribed(status === "already_subscribed");
      setEmail("");
    } catch (error: any) {
      setSubmitError(error.message || "Failed to sign up. Please try again later.");
    } finally {
      setSubmitting(false);
    }
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
            {alreadySubscribed
              ? "You're already subscribed. We'll keep you on the list."
              : "Thanks for signing up. Check your inbox for a confirmation email."}
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
              disabled={submitting}
              sx={{
                minWidth: { sm: 140 },
                borderRadius: 0,
              }}
            >
              {submitting ? "Signing up..." : "Sign up"}
            </Button>
          </Box>
        )}
        {!submitted && submitError && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {submitError}
          </Alert>
        )}
      </Container>
    </Box>
  );
}
