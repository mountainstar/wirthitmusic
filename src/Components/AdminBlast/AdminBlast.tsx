import { useState } from "react";
import { Alert, Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { sendBlastEmail } from "../../utils/emailService";

export default function AdminBlast() {
  const [adminKey, setAdminKey] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<{
    total: number;
    sent: number;
    failed: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminKey.trim() || !subject.trim() || !message.trim()) return;

    setSending(true);
    setResult(null);
    setError(null);
    try {
      const response = await sendBlastEmail({
        adminKey: adminKey.trim(),
        subject: subject.trim(),
        message: message.trim(),
      });
      setResult(response);
    } catch (caught: any) {
      setError(caught?.message ?? "Failed to send blast.");
    } finally {
      setSending(false);
    }
  };

  return (
    <Box sx={{ py: { xs: 5, md: 8 } }}>
      <Container maxWidth="sm">
        <Typography variant="h4" sx={{ mb: 1 }}>
          Admin Email Blast
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Sends to all subscribers stored in DynamoDB.
        </Typography>

        <Box component="form" onSubmit={onSubmit}>
          <Stack spacing={2}>
            <TextField
              label="Admin key"
              type="password"
              value={adminKey}
              onChange={(e) => setAdminKey(e.target.value)}
              fullWidth
            />
            <TextField
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              fullWidth
            />
            <TextField
              label="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              multiline
              minRows={6}
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={sending}>
              {sending ? "Sending..." : "Send blast"}
            </Button>
          </Stack>
        </Box>

        {result && (
          <Alert severity={result.failed > 0 ? "warning" : "success"} sx={{ mt: 3 }}>
            Blast finished. Total: {result.total}, Sent: {result.sent}, Failed: {result.failed}
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mt: 3 }}>
            {error}
          </Alert>
        )}
      </Container>
    </Box>
  );
}
