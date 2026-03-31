import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { Box, Button, Divider, Stack, Typography, Alert } from "@mui/material";
import { FC } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import TextField from "../TextField";
import { sendEmail } from "../../utils/emailService";

interface IProps {}

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  message: yup.string().required("Message is required"),
});

const ContactForm: FC<IProps> = (props) => {
  const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    if (!recaptchaValue) {
      alert("Please verify you are not a robot");
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await sendEmail({
        name: data.name,
        email: data.email,
        message: data.message,
      });

      if (result && !(result instanceof Error)) {
        setSubmitSuccess(true);
        reset();
        setRecaptchaValue(null);
      } else {
        setSubmitError("Failed to send message. Please try again later.");
      }
    } catch (error: any) {
      console.error("Email sending error:", error);
      setSubmitError(error.message || "Failed to send message. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4">Contact</Typography>
        <Divider sx={{ width: "10%", margin: "10px 0" }} />
        <Typography variant="h5">Drop us a line!</Typography>
        <Stack spacing={2}>
          {submitSuccess && (
            <Alert severity="success">Thank you! Your message has been sent.</Alert>
          )}
          {submitError && <Alert severity="error">{submitError}</Alert>}
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              label="Name"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message as string}
              fullWidth
            />

            <TextField
              label="Email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message as string}
              fullWidth
            />
            <TextField
              label="Message"
              {...register("message")}
              multiline
              rows={4}
              error={!!errors.message}
              helperText={errors.message?.message as string}
              fullWidth
            />
            <Box sx={{ my: 2 }}>
              <Box
                id="recaptcha-container"
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <ReCAPTCHA
                  sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY ?? ""}
                  onChange={(value: any) => {
                    setRecaptchaValue(value);
                  }}
                />
              </Box>
            </Box>
            <Button
              disabled={!recaptchaValue || submitting}
              type="submit"
              variant="contained"
              color="primary"
            >
              {submitting ? "Sending..." : "Submit"}
            </Button>
          </form>
        </Stack>
      </Box>
      <Divider />
    </>
  );
};
export default ContactForm;
