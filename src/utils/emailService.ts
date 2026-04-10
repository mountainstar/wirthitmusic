interface EmailData {
  name: string;
  email: string;
  message: string;
}

type SubscribeStatus = "subscribed" | "already_subscribed";

interface SubscribeResponse {
  ok?: boolean;
  status?: SubscribeStatus;
}

interface BlastPayload {
  subject: string;
  message: string;
  adminKey: string;
}

function getMailApiBaseUrl(): string {
  const baseUrl = import.meta.env.VITE_MAIL_API_BASE_URL?.trim();
  if (!baseUrl) {
    throw new Error("Mail API is not configured. Set VITE_MAIL_API_BASE_URL.");
  }
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

export async function sendEmail(emailData: EmailData): Promise<void> {
  const response = await fetch(`${getMailApiBaseUrl()}/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(emailData),
  });

  if (!response.ok) {
    throw new Error("Failed to send message. Please try again later.");
  }
}

export async function subscribeEmail(email: string): Promise<SubscribeStatus> {
  const response = await fetch(`${getMailApiBaseUrl()}/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error("Failed to sign up. Please try again later.");
  }

  const payload = (await response.json()) as SubscribeResponse;
  if (payload.status === "already_subscribed") {
    return "already_subscribed";
  }
  return "subscribed";
}

export async function sendBlastEmail(payload: BlastPayload): Promise<{
  total: number;
  sent: number;
  failed: number;
}> {
  const response = await fetch(`${getMailApiBaseUrl()}/blast`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-admin-key": payload.adminKey,
    },
    body: JSON.stringify({
      subject: payload.subject,
      message: payload.message,
    }),
  });

  if (response.status === 401) {
    throw new Error("Unauthorized: check your admin key.");
  }

  if (!response.ok) {
    throw new Error("Failed to send blast. Please try again later.");
  }

  const result = (await response.json()) as {
    total?: number;
    sent?: number;
    failed?: number;
  };
  return {
    total: result.total ?? 0,
    sent: result.sent ?? 0,
    failed: result.failed ?? 0,
  };
}
