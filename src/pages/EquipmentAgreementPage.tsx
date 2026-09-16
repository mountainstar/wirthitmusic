import { useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useLocation, useNavigate } from "react-router-dom";
import * as yup from "yup";
import PageWrapper from "../Components/PageWrapper/PageWrapper";
import TextField from "../Components/TextField";
import SignaturePad, { type SignaturePadHandle } from "../Components/SignaturePad";
import { submitEquipmentAgreement } from "../utils/emailService";

export type AgreementType = "use" | "borrow";

const USE_SECTIONS = [
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

const BORROW_SECTIONS = [
  {
    title: "Overview",
    body: `I, the undersigned DJ, am borrowing or renting audio and DJ equipment owned by Christopher Wirth ("Owner"). I take custody of the equipment for the period covered by this agreement. Owner may be absent. The equipment may leave the venue with me.`,
  },
  {
    title: "1. No liquids",
    body: "No drinks, bottles, ice, or other liquids on, above, or next to the equipment. If a spill happens, I will stop using the equipment and notify Owner as soon as reasonably possible.",
  },
  {
    title: "2. Care",
    body: "I will use the equipment only as intended and with reasonable care. I will not open, modify, or remove parts without Owner's approval. I will keep the equipment secure while it is in my custody.",
  },
  {
    title: "3. Return",
    body: "I will return all equipment by the return date stated below, complete and in the same condition as received, except for normal wear from proper use.",
  },
  {
    title: "4. Late or failure to return",
    body: "If I return the equipment late, or do not return it, I am responsible for any resulting loss to Owner, including rental value for the overrun period and, if the equipment is not returned, full replacement at current replacement value.",
  },
  {
    title: "5. Damage",
    body: "If I break, damage, or make the equipment unusable — including by spill, drop, overload, or misuse — I am responsible for repair or replacement, at Owner's reasonable choice, at current replacement value or a qualified repair shop's actual cost. Normal wear from proper use is not my responsibility.",
  },
  {
    title: "6. Governing law",
    body: "This agreement is governed by the laws of the State of Colorado.",
  },
];

function parseAgreementType(hash: string): AgreementType {
  const value = hash.replace(/^#/, "").toLowerCase();
  return value === "borrow" ? "borrow" : "use";
}

function buildSchema(agreementType: AgreementType) {
  return yup.object({
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
    returnDate:
      agreementType === "borrow"
        ? yup.string().required("Return date is required")
        : yup.string().optional().default(""),
    equipmentList: yup.string().optional().default(""),
    djPrintName: yup.string().required("Print name is required"),
    agreedToTerms: yup.boolean().oneOf([true], "You must agree to the terms"),
  });
}

type FormValues = yup.InferType<ReturnType<typeof buildSchema>>;

export default function EquipmentAgreementPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const agreementType = parseAgreementType(location.hash);
  const agreementTypeRef = useRef(agreementType);
  agreementTypeRef.current = agreementType;

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
    resolver: (values, context, options) =>
      yupResolver(buildSchema(agreementTypeRef.current))(values, context, options),
    defaultValues: {
      agreedToTerms: false,
      equipmentList: "",
      returnDate: "",
    },
  });

  useEffect(() => {
    const normalized = parseAgreementType(location.hash);
    const expectedHash = `#${normalized}`;
    if (location.hash !== expectedHash) {
      navigate({ pathname: location.pathname, hash: expectedHash }, { replace: true });
    }
  }, [location.hash, location.pathname, navigate]);

  const sections = useMemo(
    () => (agreementType === "borrow" ? BORROW_SECTIONS : USE_SECTIONS),
    [agreementType],
  );

  const setAgreementType = (next: AgreementType) => {
    navigate({ pathname: location.pathname, hash: `#${next}` }, { replace: true });
  };

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
        agreementType,
        event: data.event,
        eventDate: data.eventDate,
        venue: data.venue,
        djName: data.djName,
        contact: data.contact,
        returnDate: agreementType === "borrow" ? data.returnDate : undefined,
        equipmentList:
          agreementType === "borrow" && data.equipmentList?.trim()
            ? data.equipmentList.trim()
            : undefined,
        djPrintName: data.djPrintName,
        djSignatureDate: new Date().toLocaleDateString("en-US"),
        djSignatureDataUrl: signatureRef.current?.toDataUrl() ?? "",
        agreedToTerms: true,
      });
      setSubmitSuccess(true);
      setAgreementId(result.id);
      reset({
        agreedToTerms: false,
        equipmentList: "",
        returnDate: "",
        event: "",
        eventDate: "",
        venue: "",
        djName: "",
        contact: "",
        djPrintName: "",
      });
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

  const isBorrow = agreementType === "borrow";

  return (
    <PageWrapper showHero={false}>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 }, px: { xs: 2, md: 4 } }}>
        <Typography variant="h3" component="h1" gutterBottom>
          {isBorrow ? "DJ Equipment Borrow / Rent Agreement" : "DJ Equipment Use Agreement"}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {isBorrow
            ? "Complete this form before borrowing or renting Christopher Wirth\u2019s DJ equipment."
            : "Complete this form before using Christopher Wirth\u2019s DJ equipment at an event."}
        </Typography>

        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <FormLabel component="legend">Agreement type</FormLabel>
          <RadioGroup
            row
            value={agreementType}
            onChange={(event) => setAgreementType(event.target.value as AgreementType)}
          >
            <FormControlLabel value="use" control={<Radio />} label="Use" />
            <FormControlLabel value="borrow" control={<Radio />} label="Borrow / rent" />
          </RadioGroup>
        </FormControl>

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
            {sections.map((section) => (
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
            {isBorrow && (
              <>
                <TextField
                  label="Return date"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  {...register("returnDate")}
                  error={!!errors.returnDate}
                  helperText={errors.returnDate?.message}
                  fullWidth
                />
                <TextField
                  label="Equipment list (optional)"
                  {...register("equipmentList")}
                  error={!!errors.equipmentList}
                  helperText={errors.equipmentList?.message ?? "Brief list of what you are borrowing"}
                  fullWidth
                  multiline
                  minRows={2}
                />
              </>
            )}
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
