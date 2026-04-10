import type { ReactNode } from "react";
import { Container } from "@mui/material";
import Footer from "../Footer";
import AppBar from "../AppBar";
import Hero from "../Hero";

type PageWrapperProps = { children: ReactNode; showHero?: boolean };

export default function PageWrapper({ children, showHero = true }: PageWrapperProps) {
  return (
    <>
      <AppBar />
      {showHero ? <Hero /> : null}
      <Container maxWidth={false} disableGutters>
        {children}
      </Container>
      <Footer />
    </>
  );
}
