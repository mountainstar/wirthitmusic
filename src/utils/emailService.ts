import { SendEmailCommand } from "@aws-sdk/client-ses";
import { sesClient } from "../libs/sesClient";

interface EmailData {
  name: string;
  email: string;
  message: string;
}

const createSendEmailCommand = (
  toAddress: string,
  fromAddress: string,
  emailData: EmailData
) => {
  const htmlBody = `
    <html>
      <body>
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${emailData.name}</p>
        <p><strong>Email:</strong> ${emailData.email}</p>
        <p><strong>Message:</strong></p>
        <p>${emailData.message.replace(/\n/g, "<br>")}</p>
      </body>
    </html>
  `;

  const textBody = `
New Contact Form Submission

Name: ${emailData.name}
Email: ${emailData.email}
Message: ${emailData.message}
  `;

  return new SendEmailCommand({
    Destination: {
      ToAddresses: [toAddress],
      CcAddresses: [],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: htmlBody,
        },
        Text: {
          Charset: "UTF-8",
          Data: textBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: `New Contact Form Submission from ${emailData.name}`,
      },
    },
    Source: fromAddress,
    ReplyToAddresses: [emailData.email],
  });
};

export const sendEmail = async (emailData: EmailData) => {
  const toAddress = process.env.REACT_APP_SES_TO_EMAIL || "";
  const fromAddress = process.env.REACT_APP_SES_FROM_EMAIL || "";

  if (!toAddress || !fromAddress) {
    throw new Error("Email addresses not configured");
  }

  const sendEmailCommand = createSendEmailCommand(toAddress, fromAddress, emailData);

  try {
    return await sesClient.send(sendEmailCommand);
  } catch (caught) {
    if (caught instanceof Error && caught.name === "MessageRejected") {
      const messageRejectedError = caught;
      return messageRejectedError;
    }
    throw caught;
  }
};
