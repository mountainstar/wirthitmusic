import * as React from 'react';
import {Container} from '@mui/material';
import Footer from '../Footer';
import AppBarComponent from '../AppBar/AppBar';
import ParallaxBannerComponent from '../ParallaxBanner';

export default function SimpleContainer({ children }: { children: React.ReactNode }) {
  return (
    <>
     <AppBarComponent />
     <ParallaxBannerComponent />
      <Container  maxWidth={false} >
        {children}
      </Container>
      <Footer />
    </>
  );
}