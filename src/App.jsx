import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FloatingWhatsApp from "./components/FloatingWhatsApp";
import MobileBottomBar from "./components/MobileBottomBar";
import ScrollToTop from "./components/ScrollToTop";

import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-surface font-body-md text-body-md text-on-surface antialiased">
        <Header />
        <main className="w-full pt-28 bg-surface flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about-us-vehicle" element={<About />} />
            <Route path="/services-tours" element={<Services />} />
            <Route path="/contact-booking" element={<Contact />} />
            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <FloatingWhatsApp />
        <MobileBottomBar />
        <Footer />
      </div>
    </BrowserRouter>
  );
}
