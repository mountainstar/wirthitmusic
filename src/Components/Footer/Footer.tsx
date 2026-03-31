import { Box, Tooltip } from "@mui/material";

const FOOTER_LINKS = [
  { label: "About", href: "#about" },
  { label: "Weddings", href: "#weddings" },
  { label: "Corporate", href: "#corporate" },
  { label: "Parties", href: "#celebrations" },
  { label: "Production", href: "#production" },
  { label: "Contact", href: "#contact" },
];

const SOCIAL_LINKS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/Wirthitmusic/61576467311172/",
    viewBox: "0 0 24 24",
    path: "M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCex7epU9ySQqN5dy34gLz8Q",
    viewBox: "0 0 24 24",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/wirthitmusic/",
    viewBox: "0 0 24 24",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.07 1.646.07 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.775.13 4.602.402 3.635 1.37c-.967.967-1.24 2.14-1.298 3.417C2.013 5.668 2 6.077 2 9.333v5.334c0 3.256.013 3.665.072 4.945.058 1.277.331 2.45 1.298 3.417.967.967 2.14 1.24 3.417 1.298C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.277-.058 2.45-.331 3.417-1.298.967-.967 1.24-2.14 1.298-3.417.059-1.28.072-1.689.072-4.945V9.333c0-3.256-.013-3.665-.072-4.945-.058-1.277-.331-2.45-1.298-3.417-.967-.967-2.14-1.24-3.417-1.298C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z",
  },
  {
    label: "SoundCloud",
    href: "https://soundcloud.com/wirth_it",
    viewBox: "0 0 24 24",
    path: "M17.5 17.5c-1.1 0-2-.9-2-2 0-.1 0-.2.1-.3-.2-.1-.4-.2-.6-.2-.2 0-.4.1-.6.2.1.1.1.2.1.3 0 1.1-.9 2-2 2s-2-.9-2-2c0-.1 0-.2.1-.3-.2-.1-.4-.2-.6-.2-.2 0-.4.1-.6.2.1.1.1.2.1.3 0 1.1-.9 2-2 2s-2-.9-2-2c0-.1 0-.2.1-.3-.2-.1-.4-.2-.6-.2-.2 0-.4.1-.6.2.1.1.1.2.1.3 0 1.1-.9 2-2 2s-2-.9-2-2c0-1 .7-1.8 1.7-2 .2-3.3 2.8-6 6.1-6 .7 0 1.4.1 2 .3.2 0 .3.2.3.4v7.3c0 .1.1.2.2.2.1 0 .2-.1.2-.2v-7.3c0-.2.1-.4.3-.4.6-.2 1.3-.3 2-.3 3.3 0 6 2.7 6.1 6 .9.2 1.7 1 1.7 2 0 1.1-.9 2-2 2z",
  },
];

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: { xs: 2, sm: 4 },
        bgcolor: "background.paper",
        borderTop: "1px solid",
        borderColor: "divider",
        color: "text.primary",
      }}
    >
      <Box
        sx={{
          maxWidth: 900,
          margin: "0 auto",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "flex-start", sm: "center" },
          justifyContent: "space-between",
          gap: 3,
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {FOOTER_LINKS.map(({ label, href }) => (
            <Box
              key={label}
              component="a"
              href={href}
              sx={{
                color: "text.primary",
                textDecoration: "none",
                fontSize: "1rem",
                "&:hover": { color: "primary.main" },
              }}
            >
              {label}
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
          }}
        >
          {SOCIAL_LINKS.map(({ label, href, viewBox, path }) => (
            <Tooltip key={label} title={label}>
              <Box
                component="a"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                sx={{
                  color: "text.primary",
                  "&:hover": { color: "primary.main" },
                  display: "inline-flex",
                }}
              >
                <svg width={28} height={28} fill="currentColor" viewBox={viewBox} aria-hidden>
                  <path d={path} />
                </svg>
              </Box>
            </Tooltip>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
