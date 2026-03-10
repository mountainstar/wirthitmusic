import { SESClient } from "@aws-sdk/client-ses";

// Configure AWS SES Client
const sesClient = new SESClient({
  region: process.env.REACT_APP_AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY || "",
  },
});

export { sesClient };
