import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';

import theme from './theme';
import Home from './Home';


function App() {
  return (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <ParallaxProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </ParallaxProvider>
  </ThemeProvider>
  );
}

export default App;
