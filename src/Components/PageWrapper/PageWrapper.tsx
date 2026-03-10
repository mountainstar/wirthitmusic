import type { ReactNode } from "react";
import { Container } from "@mui/material";
import Footer from "../Footer";
import AppBar from "../AppBar";
import Hero from "../Hero";

type PageWrapperProps = { children: ReactNode };

export default function PageWrapper({ children }: PageWrapperProps) {
  return (
    <>
      <AppBar />
      <Hero />
      <Container maxWidth={false} disableGutters>
        {children}
      </Container>
      <Footer />
    </>
  );
}
