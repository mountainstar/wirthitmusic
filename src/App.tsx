import React from "react";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ParallaxProvider } from "react-scroll-parallax";

import theme from "./theme";
import Home from "./Home";
import AdminBlastPage from "./AdminBlastPage";
import ProfilePage from "./pages/ProfilePage";
import ServiceInfoPage from "./pages/ServiceInfoPage";
import ScrollToHash from "./Components/ScrollToHash";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ParallaxProvider>
        <Router>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/weddings" element={<ServiceInfoPage serviceId="weddings" />} />
            <Route path="/corporate" element={<ServiceInfoPage serviceId="corporate" />} />
            <Route path="/parties" element={<ServiceInfoPage serviceId="parties" />} />
            <Route path="/production" element={<ServiceInfoPage serviceId="production" />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/admin/blast" element={<AdminBlastPage />} />
          </Routes>
        </Router>
      </ParallaxProvider>
    </ThemeProvider>
  );
}

export default App;
