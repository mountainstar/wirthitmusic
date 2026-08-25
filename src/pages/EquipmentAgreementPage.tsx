import { useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import PageWrapper from "../Components/PageWrapper/PageWrapper";
import TextField from "../Components/TextField";
import SignaturePad, { type SignaturePadHandle } from "../Components/SignaturePad";
import { submitEquipmentAgreement } from "../utils/emailService";

const AGREEMENT_SECTIONS = [
  {
    title: "Overview",
    body: `I, the undersigned DJ, will use audio and DJ equipment owned by Christopher Wirth ("Owner") at the event above. Owner will be present. I am not borrowing or taking the equipment off site.`,
  },
  {
    title: "1. No liquids",
    body: "No drinks, bottles, ice, or other liquids on, above, or next to the equipment. If a spill happens, I will stop and tell Owner immediately.",
  },
  {
    title: "2. Care",
    body: "I will use the equipment only as intended and with reasonable care. I will not open, modify, or remove parts without Owner's approval.",
  },
  {
    title: "3. Damage",
    body: "If I break, damage, or make the equipment unusable — including by spill, drop, overload, or misuse — I am responsible for repair or replacement, at Owner's reasonable choice, at current replacement value or a qualified repair shop's actual cost. Normal wear from proper use is not my responsibility.",
  },
  {
    title: "4. Governing law",
    body: "This agreement is governed by the laws of the State of Colorado.",
  },
];

const schema = yup.object({
  event: yup.string().required("Event is required"),
  eventDate: yup.string().required("Date is required"),
  venue: yup.string().required("Venue is required"),
  djName: yup.string().required("DJ name is required"),
  contact: yup
    .string()
    .required("Phone or email is required")
    .test("contact", "Enter a valid phone number or email", (value) => {
      if (!value) return false;
      const trimmed = value.trim();
      if (trimmed.includes("@")) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
      }
      return trimmed.replace(/\D/g, "").length >= 7;
    }),
  djPrintName: yup.string().required("Print name is required"),
  agreedToTerms: yup.boolean().oneOf([true], "You must agree to the terms"),
});

type FormValues = yup.InferType<typeof schema>;

export default function EquipmentAgreementPage() {
  const signatureRef = useRef<SignaturePadHandle>(null);
  const [signatureEmpty, setSignatureEmpty] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [agreementId, setAgreementId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues: {
      agreedToTerms: false,
    },
  });

  const onSubmit = async (data: FormValues) => {
    if (signatureRef.current?.isEmpty()) {
      setSubmitError("Please sign the agreement before submitting.");
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    setSubmitSuccess(false);

    try {
      const result = await submitEquipmentAgreement({
        event: data.event,
        eventDate: data.eventDate,
        venue: data.venue,
        djName: data.djName,
        contact: data.contact,
        djPrintName: data.djPrintName,
        djSignatureDate: new Date().toLocaleDateString("en-US"),
        djSignatureDataUrl: signatureRef.current?.toDataUrl() ?? "",
        agreedToTerms: true,
      });
      setSubmitSuccess(true);
      setAgreementId(result.id);
      reset();
      signatureRef.current?.clear();
      setSignatureEmpty(true);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Failed to submit agreement. Please try again.";
      setSubmitError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageWrapper showHero={false}>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          DJ Equipment Use Agreement
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Complete this form before using Christopher Wirth&apos;s DJ equipment at an event.
        </Typography>

        <Box
          component="section"
          sx={{
            mb: 4,
            p: { xs: 2, md: 3 },
            border: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Stack spacing={2}>
            {AGREEMENT_SECTIONS.map((section) => (
              <Box key={section.title}>
                <Typography variant="h6">{section.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {section.body}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {submitSuccess && (
          <Alert severity="success" sx={{ mb: 3 }}>
            Agreement submitted successfully
            {agreementId ? ` (ID: ${agreementId})` : ""}. Christopher Wirth has been notified.
          </Alert>
        )}
        {submitError && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {submitError}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Stack spacing={1}>
            <TextField
              label="Event"
              {...register("event")}
              error={!!errors.event}
              helperText={errors.event?.message}
              fullWidth
            />
            <TextField
              label="Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("eventDate")}
              error={!!errors.eventDate}
              helperText={errors.eventDate?.message}
              fullWidth
            />
            <TextField
              label="Venue"
              {...register("venue")}
              error={!!errors.venue}
              helperText={errors.venue?.message}
              fullWidth
            />
            <TextField
              label="DJ name"
              {...register("djName")}
              error={!!errors.djName}
              helperText={errors.djName?.message}
              fullWidth
            />
            <TextField
              label="Phone / email"
              {...register("contact")}
              error={!!errors.contact}
              helperText={errors.contact?.message}
              fullWidth
            />
          </Stack>

          <Divider sx={{ my: 3 }} />

          <FormControlLabel
            control={<Checkbox {...register("agreedToTerms")} color="primary" />}
            label="I have read this agreement, understand it, and agree to it."
          />
          {errors.agreedToTerms && (
            <Typography variant="caption" color="error" display="block">
              {errors.agreedToTerms.message}
            </Typography>
          )}

          <TextField
            label="Print name"
            {...register("djPrintName")}
            error={!!errors.djPrintName}
            helperText={errors.djPrintName?.message}
            fullWidth
          />

          <SignaturePad
            ref={signatureRef}
            label="DJ signature"
            onChange={(isEmpty) => setSignatureEmpty(isEmpty)}
          />

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Signature date will be recorded automatically on submission.
          </Typography>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={submitting || signatureEmpty}
            sx={{ mt: 3 }}
          >
            {submitting ? "Submitting..." : "Submit agreement"}
          </Button>
        </Box>
      </Container>
    </PageWrapper>
  );
}
