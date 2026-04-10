import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Typography,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PageWrapper from "../Components/PageWrapper/PageWrapper";
import ContactSection from "../Components/ContactSection";

type ServiceId = "weddings" | "corporate" | "parties" | "production";

/** Generic wedding-style stock photos (Unsplash). */
const WEDDING_PAGE_IMAGES = [
  {
    src: "https://images.unsplash.com/photo-1714972383570-44ddc9738355?auto=format&fit=crop&w=1200&q=80",
    alt: "Wedding dance floor with guests dancing under warm lights",
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=80",
    alt: "Outdoor wedding reception with tables, chairs, and floral details",
  },
  {
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    alt: "Outdoor wedding celebration with guests",
  },
  {
    src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
    alt: "Elegant wedding reception with tables and ambient lighting",
  },
] as const;

function WeddingImageGallery() {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="subtitle1"
        sx={{ mb: 2, letterSpacing: "0.06em", textTransform: "uppercase" }}
      >
        The vibe
      </Typography>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)" },
        }}
      >
        {WEDDING_PAGE_IMAGES.map(({ src, alt }, index) => (
          <Box
            key={src}
            component="img"
            src={src}
            alt={alt}
            loading={index === 0 ? "eager" : "lazy"}
            sx={{
              width: "100%",
              height: { xs: 220, sm: 240, md: 260 },
              objectFit: "cover",
              border: "1px solid",
              borderColor: "divider",
              display: "block",
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

const WEDDING_DETAIL = {
  intro: [
    "We help you shape the flow of your day: prelude, ceremony, cocktail hour, introductions, and a reception that keeps the floor moving. Music is curated from your must-plays and do-not-plays, with seamless transitions and clear MCing so guests always know what is happening next.",
    "Tell us your venue size, indoor or outdoor plans, and guest count — we tune levels for speeches, dinner, and the dance floor so nothing feels harsh or thin.",
  ],
  coverage: [
    {
      title: "Ceremony",
      items: [
        "Custom prelude and processional music, timed with your cues",
        "Discrete amplification so vows and readings are heard without overpowering the space",
        "Wireless mic options for officiant and readers when the layout calls for it",
      ],
    },
    {
      title: "Cocktail hour",
      items: [
        "Background music at a comfortable level for conversation",
        "Smooth handoff from ceremony so energy stays consistent into the reception",
      ],
    },
    {
      title: "Reception",
      items: [
        "Grand entrance and key moments coordinated with your timeline",
        "Live announcements and dance sets built from your tastes and real-time crowd reading",
      ],
    },
  ],
  equipment: {
    title: "Gear",
    items: [
      "Pioneer DJ XDJ-AZ all-in-one DJ system",
      "Two 12\" column / sub tower speaker systems — full-range coverage with solid low end for the dance floor",
      "Additional speakers and lighting can be added for larger rooms, outdoor areas, or when you want more impact — we’ll spec it in your quote",
    ],
  },
  packages: [
    {
      name: "Reception celebration",
      blurb: "Ideal when ceremony audio is handled elsewhere or you only need the party.",
      bullets: [
        "DJ / MC for reception: introductions, toasts, and open dancing",
        "XDJ-AZ plus twin 12\" sub towers sized to your room",
        "Planning call for timeline, must-plays, and do-not-plays",
      ],
    },
    {
      name: "Full wedding day",
      blurb: "Ceremony, cocktail, and reception in one seamless arc.",
      bullets: [
        "Everything in Reception celebration, plus ceremony and cocktail coverage",
        "Ceremony sound and music cues coordinated with your planner or officiant",
        "One team, one sonic thread from “seated” to last song",
      ],
    },
    {
      name: "Add-ons",
      blurb: "Ask when you build your quote — we tailor to the venue and program.",
      bullets: [
        "Extra speakers and subs, satellite zones, or battery-powered options for tricky layouts",
        "More lighting: uplighting, dance-floor effects, or accent washes — scoped to your space",
        "Extra wireless mics for speeches and toasts",
        "Backup planning for outdoor or tented events",
      ],
    },
  ],
};

const SERVICE_CONTENT: Record<
  ServiceId,
  { title: string; tagline: string; body: string[] }
> = {
  weddings: {
    title: "Weddings",
    tagline: "Ceremony through last dance — sound and energy tailored to you.",
    body: [],
  },
  corporate: {
    title: "Corporate",
    tagline: "Galas, launches, holiday parties, and company milestones.",
    body: [
      "Corporate events need polish and reliability: punctual setup, appropriate volume for networking, and a flexible plan when schedules shift. We coordinate with your team or AV vendor so awards, speeches, and entertainment land on time.",
      "From background music during dinner to high-energy sets for the after-party, we match tone to your brand and audience while keeping the experience effortless for organizers.",
    ],
  },
  parties: {
    title: "Private parties",
    tagline: "Birthdays, anniversaries, and celebrations that feel personal.",
    body: [
      "Private parties are about your crowd and your vibe. We build playlists across decades and genres, read the room, and adjust on the fly so the energy stays right all night.",
      "Whether you want a themed night, karaoke-adjacent energy, or a straight-up dance party, we work with you upfront on timeline, special moments, and any surprises you want to plan.",
    ],
  },
  production: {
    title: "Sound & experience",
    tagline: "Production support so your event looks and sounds intentional.",
    body: [
      "Beyond DJing, we can help with sound reinforcement, microphone coverage for speeches and performers, and coordination with lighting or venue staff so the technical side stays invisible to guests.",
      "Tell us your space, headcount, and program — we will recommend a setup that fits the room and your budget, from compact systems to larger events that need extra clarity and punch.",
    ],
  },
};

type Props = { serviceId: ServiceId };

function BulletList({ items }: { items: string[] }) {
  return (
    <Box component="ul" sx={{ m: 0, pl: 2.5, mb: 0 }}>
      {items.map((item, index) => (
        <Typography
          key={index}
          component="li"
          variant="body1"
          color="text.secondary"
          sx={{ mb: 1 }}
        >
          {item}
        </Typography>
      ))}
    </Box>
  );
}

export default function ServiceInfoPage({ serviceId }: Props) {
  const { title, tagline, body } = SERVICE_CONTENT[serviceId];

  return (
    <PageWrapper showHero={false}>
      <Box
        component="article"
        sx={{
          bgcolor: "background.paper",
          borderBottom: "1px solid",
          borderColor: "divider",
          py: { xs: 5, md: 8 },
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="overline"
            sx={{ color: "primary.main", letterSpacing: "0.3em", display: "block", mb: 1 }}
          >
            Services
          </Typography>
          <Typography variant="h3" sx={{ mb: 2, letterSpacing: "0.02em" }}>
            {title}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4, fontWeight: 400 }}>
            {tagline}
          </Typography>

          {serviceId === "weddings" ? (
            <>
              <WeddingImageGallery />
              {WEDDING_DETAIL.intro.map((paragraph, index) => (
                <Typography key={index} variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                  {paragraph}
                </Typography>
              ))}

              <Typography
                variant="subtitle1"
                sx={{ mt: 4, mb: 1.5, letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                Ceremony · cocktail · reception
              </Typography>
              {WEDDING_DETAIL.coverage.map((block) => (
                <Box key={block.title} sx={{ mb: 3 }}>
                  <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                    {block.title}
                  </Typography>
                  <BulletList items={block.items} />
                </Box>
              ))}

              <Typography
                variant="subtitle1"
                sx={{ mt: 4, mb: 1.5, letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                {WEDDING_DETAIL.equipment.title}
              </Typography>
              <BulletList items={WEDDING_DETAIL.equipment.items} />

              <Typography
                variant="subtitle1"
                sx={{ mt: 5, mb: 2, letterSpacing: "0.06em", textTransform: "uppercase" }}
              >
                Packages
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Every wedding is different — use these as a starting point, then we finalize scope
                and investment in your quote.
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gap: 2,
                  gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
                }}
              >
                {WEDDING_DETAIL.packages.map((pkg) => (
                  <Card
                    key={pkg.name}
                    elevation={0}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 0,
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
                      <Typography variant="h6" sx={{ mb: 1, color: "primary.main" }}>
                        {pkg.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {pkg.blurb}
                      </Typography>
                      <BulletList items={pkg.bullets} />
                      <Box sx={{ mt: "auto", pt: 2 }}>
                        <Button
                          component={RouterLink}
                          to="/weddings#contact"
                          variant="outlined"
                          color="primary"
                          fullWidth
                          sx={{ borderRadius: 0 }}
                        >
                          Request a quote
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </>
          ) : (
            body.map((paragraph, index) => (
              <Typography key={index} variant="body1" color="text.secondary" sx={{ mb: 2 }}>
                {paragraph}
              </Typography>
            ))
          )}
        </Container>
      </Box>
      <ContactSection />
    </PageWrapper>
  );
}
