import { useState } from "react";
import {
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Music", href: "#music" },
  { label: "Tour", href: "#tour" },
  { label: "Shop", href: "#merch" },
  { label: "Contact", href: "#contact" },
];

export default function AppBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);

  const navContent = (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: { xs: 0, md: 1 },
        flexWrap: "wrap",
      }}
    >
      {NAV_LINKS.map(({ label, href }) => (
        <Typography
          key={label}
          component="a"
          href={href}
          variant="body2"
          sx={{
            color: "inherit",
            textDecoration: "none",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            px: { md: 1.5 },
            py: 1,
            "&:hover": {
              color: "primary.main",
            },
          }}
        >
          {label}
        </Typography>
      ))}
    </Box>
  );

  return (
    <>
      <MuiAppBar position="sticky" elevation={0}>
        <Toolbar
          sx={{
            justifyContent: "space-between",
            minHeight: { xs: 56, sm: 64 },
            px: { xs: 1, sm: 2 },
          }}
        >
          <Box
            component="a"
            href="#"
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Box
              component="img"
              src="/logo.png"
              alt="Wirth It Music"
              sx={{
                height: { xs: 40, sm: 48 },
                width: "auto",
                display: "block",
              }}
            />
          </Box>

          <Box sx={{ display: { xs: "none", md: "block" } }}>{navContent}</Box>

          <Tooltip title="Open menu">
            <IconButton
              color="inherit"
              aria-label="open menu"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </MuiAppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            boxSizing: "border-box",
            bgcolor: "background.default",
            borderLeft: "1px solid",
            borderColor: "divider",
          },
        }}
      >
        <Box sx={{ py: 2, px: 2, display: "flex", justifyContent: "flex-end" }}>
          <Tooltip title="Close menu">
            <IconButton
              onClick={handleDrawerToggle}
              color="inherit"
              size="large"
              aria-label="close menu"
            >
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
        <List>
          {NAV_LINKS.map(({ label, href }) => (
            <ListItem key={label} disablePadding>
              <ListItemButton
                component="a"
                href={href}
                onClick={handleDrawerToggle}
                sx={{
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                <ListItemText primary={label} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
}
