import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DRIVER_INFO } from "../data/constants";

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us & Vehicle", path: "/about-us-vehicle" },
    { name: "Services & Tours", path: "/services-tours" },
    { name: "Contact & Booking", path: "/contact-booking" },
  ];

  const isCurrent = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      {/* Top Banner Ribbon */}
      <div className="w-full bg-primary-container text-on-primary-fixed border-b border-primary-container/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-between text-center overflow-x-auto scrollbar-none">
          <div className="w-full flex items-center justify-center gap-2 sm:gap-3 text-center whitespace-nowrap">
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-tertiary-fixed font-semibold tracking-wide uppercase">
              <span className="material-symbols-outlined text-sm text-tertiary-fixed">
                verified
              </span>
              Guaranteed Airport Pickup
            </span>
            <span className="text-on-primary-container/40 text-xs hidden sm:inline">
              •
            </span>
            <span className="font-label-sm text-label-sm text-inverse-primary hidden md:inline">
              Fixed All-Inclusive Fares (No Hidden Surcharges)
            </span>
            <span className="text-on-primary-container/40 text-xs hidden md:inline">
              •
            </span>
            <span className="font-label-sm text-label-sm text-surface-bright">
              Fluent English-Speaking Tourist Chauffeur
            </span>
            <span className="text-on-primary-container/40 text-xs hidden lg:inline">
              •
            </span>
            <span className="font-label-sm text-label-sm text-tertiary-fixed-dim hidden lg:inline">
              Eco Hybrid Prius Fleet
            </span>
          </div>
        </div>
      </div>

      {/* Main Navigation Header */}
      <header className="w-full bg-surface-container-lowest/95 backdrop-blur-xl shadow-[0_4px_20px_-2px_rgba(19,27,46,0.06)]">
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Logo & Brand */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <img
              alt="CeylonDrive Logo"
              className="h-8 w-auto object-contain"
              src={DRIVER_INFO.logo}
            />
            <div className="flex flex-col justify-center leading-none">
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary font-bold">
                CeylonDrive
              </span>
              <span className="font-label-sm text-label-sm text-on-surface-variant font-medium tracking-normal">
                Sri Lanka Private Chauffeur
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-xl bg-surface-container-low/70">
            {navLinks.map((link) => {
              const active = isCurrent(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3.5 py-2 rounded-lg font-label-lg text-label-lg transition-all ${
                    active
                      ? "bg-orange-100 text-primary font-bold shadow-sm"
                      : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                  }`}
                  aria-current={active ? "page" : undefined}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action & Status */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Chauffeur Online Pill */}
            <div className="hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-surface-container-low">
              <div className="relative flex items-center justify-center shrink-0">
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover"
                  src={DRIVER_INFO.photo}
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#25D366] ring-2 ring-surface-container-lowest"></span>
              </div>
              <div className="flex flex-col text-left">
                <span className="font-label-sm text-label-sm font-semibold text-on-surface leading-tight">
                  Harindu (Chauffeur)
                </span>
                <span className="font-label-sm text-label-sm text-on-tertiary-container font-medium flex items-center gap-1 leading-tight">
                  Online &amp; Ready
                </span>
              </div>
            </div>

            {/* Book via WhatsApp Button */}
            <a
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#25D366] text-on-primary font-label-lg text-label-lg font-bold shadow-[0_4px_16px_rgba(37,211,102,0.3)] hover:brightness-105 active:scale-95 transition-all"
              href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I%20would%20like%20to%20inquire%20about%20a%20private%20chauffeur%20in%20Sri%20Lanka`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span className="material-symbols-outlined text-lg leading-none">
                chat
              </span>
              <span className="hidden xs:inline">Book via WhatsApp</span>
            </a>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high transition-colors"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-2xl leading-none">
                {mobileMenuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-surface-container-lowest border-t border-surface-container-high px-4 py-4 flex flex-col gap-2 shadow-xl animate-fadeIn">
            {navLinks.map((link) => {
              const active = isCurrent(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl font-label-lg text-label-lg transition-all flex items-center justify-between ${
                    active
                      ? "bg-orange-100 text-primary font-bold"
                      : "text-on-surface-variant hover:bg-surface-container-low hover:text-on-surface"
                  }`}
                >
                  <span>{link.name}</span>
                  {active && (
                    <span className="material-symbols-outlined text-secondary text-base">
                      chevron_right
                    </span>
                  )}
                </Link>
              );
            })}
            <div className="pt-2 border-t border-surface-container-high flex items-center justify-between px-2">
              <div className="flex items-center gap-2">
                <img
                  src={DRIVER_INFO.photo}
                  alt={DRIVER_INFO.name}
                  className="w-7 h-7 rounded-full object-cover"
                />
                <span className="font-label-sm text-on-surface font-semibold">
                  Harindu Available 24/7
                </span>
              </div>
              <a
                href={`tel:${DRIVER_INFO.phone}`}
                className="font-label-sm text-secondary font-bold"
              >
                {DRIVER_INFO.displayPhone}
              </a>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}
