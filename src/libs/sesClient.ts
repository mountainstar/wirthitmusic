import { SESClient } from "@aws-sdk/client-ses";

// Configure AWS SES Client
const sesClient = new SESClient({
  region: import.meta.env.VITE_AWS_REGION ?? "us-east-1",
  credentials: {
    accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID ?? "",
    secretAccessKey: import.meta.env.VITE_AWS_SECRET_ACCESS_KEY ?? "",
  },
});

export { sesClient };
