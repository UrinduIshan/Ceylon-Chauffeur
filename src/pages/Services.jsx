import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { DRIVER_INFO } from "../data/constants";

export default function Services() {
  const [activeTab, setActiveTab] = useState("tours");

  // Calculator state
  const [calcService, setCalcService] = useState("tour");
  const [calcPickup, setCalcPickup] = useState("BIA Airport (Katunayake)");
  const [calcDestination, setCalcDestination] = useState("Multi-Day Custom Circuit");
  const [calcDays, setCalcDays] = useState(8);
  const [calcDate, setCalcDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split("T")[0];
  });
  const [calcPassengers, setCalcPassengers] = useState("1-2 Guests");
  const [calcLuggage, setCalcLuggage] = useState("1-2 Large Bags");
  const [calcFlight, setCalcFlight] = useState("");

  // IntersectionObserver to trigger reveal animations across all components & tab changes
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (!("IntersectionObserver" in window)) {
      document
        .querySelectorAll(".reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-scale")
        .forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const elements = document.querySelectorAll(
      ".reveal-on-scroll, .reveal-from-left, .reveal-from-right, .reveal-scale"
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [activeTab]);

  const destinationRates = useMemo(
    () => ({
      "Colombo City Center": { usd: 35, lkr: "10,500" },
      "Negombo": { usd: 25, lkr: "7,500" },
      "Bentota / Hikkaduwa": { usd: 65, lkr: "19,500" },
      "Galle Fort / Unawatuna": { usd: 75, lkr: "22,500" },
      "Mirissa / Weligama": { usd: 85, lkr: "25,500" },
      "Kandy Cultural Center": { usd: 65, lkr: "19,500" },
      "Sigiriya / Dambulla": { usd: 80, lkr: "24,000" },
      "Ella / Nuwara Eliya": { usd: 110, lkr: "33,000" },
      "Multi-Day Custom Circuit": { usd: 85, lkr: "25,500" },
    }),
    []
  );

  const priceCalculation = useMemo(() => {
    if (calcService === "tour") {
      const days = parseInt(calcDays) || 8;
      const ratePerDay = 85;
      const totalUsd = days * ratePerDay;
      const totalLkr = totalUsd * 300;
      return {
        usd: `$${totalUsd}`,
        lkr: `(LKR ${totalLkr.toLocaleString()})`,
        note: "Full vehicle, fuel, highway tolls & driver stay included",
      };
    }

    if (calcService === "daytrip") {
      return {
        usd: "$75 - $90",
        lkr: "(LKR 22,500 - 27,000)",
        note: "10-12 hr round-trip excursion with return",
      };
    }

    const sel = destinationRates[calcDestination] || { usd: 40, lkr: "12,000" };
    return {
      usd: `$${sel.usd}`,
      lkr: `(LKR ${sel.lkr})`,
      note: "Includes express tolls, vehicle fuel & driver services",
    };
  }, [calcService, calcDestination, calcDays, destinationRates]);

  const handlePrefillTour = (_tourName) => {
    setCalcService("tour");
    setCalcDestination("Multi-Day Custom Circuit");
    const el = document.getElementById("booking-engine");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handlePrefillDayTrip = (_tripName) => {
    setCalcService("daytrip");
    const el = document.getElementById("booking-engine");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const sendToWhatsApp = () => {
    const message =
      `Hello Harindu! I would like to inquire about CeylonDrive services:\n\n` +
      `• Service: ${calcService.toUpperCase()}\n` +
      `• Pickup: ${calcPickup}\n` +
      `• Destination: ${calcDestination}\n` +
      (calcService === "tour" ? `• Duration: ${calcDays} Days\n` : "") +
      `• Date: ${calcDate || "Flexible"}\n` +
      `• Flight No: ${calcFlight || "Not provided yet"}\n` +
      `• Travelers: ${calcPassengers} | ${calcLuggage}\n` +
      `• Estimated Rate: ${priceCalculation.usd} (All-Inclusive)\n\n` +
      `Could you please confirm your availability? Thank you!`;

    window.open(
      `https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=${encodeURIComponent(
        message
      )}`,
      "_blank"
    );
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* =========================================================================
          HERO BANNER WITH ATMOSPHERIC ANIMATIONS & TRUST PILLS
          ========================================================================= */}
      <section className="relative w-full overflow-hidden pb-16 pt-8 bg-surface">
        {/* Ambient atmospheric background glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none animate-ambient-pulse" />
        <div
          className="absolute -top-12 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-ambient-pulse"
          style={{ animationDelay: "3.5s" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {/* Verified Pill Badge with Radar Pulse */}
              <div className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full bg-surface-container-high text-on-surface-variant shadow-sm border border-surface-container animate-fade-in-down">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold text-secondary">
                  Verified Chauffeur Services
                </span>
                <span className="font-label-sm text-label-sm text-outline">•</span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Katunayake &amp; Island-wide
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight animate-fade-in-up">
                Our Services &amp;{" "}
                <span className="text-secondary relative inline-block">
                  Island Tours
                  <span className="absolute bottom-1.5 left-0 w-full h-1 bg-secondary/20 rounded-full"></span>
                </span>
              </h1>

              {/* Subheading */}
              <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed max-w-2xl animate-fade-in-up animation-delay-100">
                From swift, climate-controlled BIA airport pickups to bespoke multi-week explorations across Sri Lanka's misty highlands, ancient fortresses, and golden southern coastlines.
              </p>

              {/* Feature Badges with Hover Micro-Interactions */}
              <div className="flex flex-wrap items-center gap-3 pt-2 animate-fade-in-up animation-delay-200">
                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-secondary/30 border border-surface-container transition-all duration-300 group cursor-default">
                  <span
                    className="material-symbols-outlined text-base text-secondary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    eco
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-medium">
                    Toyota Hybrid Fleet
                  </span>
                </div>

                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-secondary/30 border border-surface-container transition-all duration-300 group cursor-default">
                  <span
                    className="material-symbols-outlined text-base text-secondary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    format_image_left
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-medium">
                    100% Fixed Rates
                  </span>
                </div>

                <div className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-secondary/30 border border-surface-container transition-all duration-300 group cursor-default">
                  <span
                    className="material-symbols-outlined text-base text-secondary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    support_agent
                  </span>
                  <span className="font-label-md text-label-md text-on-surface font-medium">
                    Chauffeur Harindu On-Call
                  </span>
                </div>
              </div>
            </div>

            {/* Right Decorative Floating Card */}
            <div className="lg:col-span-4 hidden lg:flex justify-end animate-fade-in-up animation-delay-300">
              <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-xl border border-surface-container max-w-sm w-full animate-gentle-float relative overflow-hidden group">
                <div className="shine-effect" />
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary">
                    <span className="material-symbols-outlined text-2xl">verified_user</span>
                  </div>
                  <div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                      Guaranteed Excellence
                    </span>
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">
                      Sri Lanka Private Chauffeur
                    </h3>
                  </div>
                </div>
                <div className="space-y-2.5 text-body-sm font-body-sm text-on-surface-variant pt-2 border-t border-surface-container">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-secondary">star</span>
                      Guest Rating
                    </span>
                    <span className="font-bold text-on-surface">5.0 / 5.0 (TripAdvisor)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-secondary">timer</span>
                      Punctuality
                    </span>
                    <span className="font-bold text-on-surface">100% On-Time Guarantee</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm text-secondary">luggage</span>
                      Vehicle Class
                    </span>
                    <span className="font-bold text-on-surface">Spacious Toyota Prius</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CATEGORY TABS & DYNAMIC PANELS WITH ENTRANCE ANIMATIONS
          ========================================================================= */}
      <section className="w-full pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs Navigation */}
          <div className="flex justify-center sm:justify-start mb-12 reveal-on-scroll">
            <div
              className="flex flex-wrap sm:flex-nowrap gap-1.5 p-1.5 rounded-2xl bg-surface-container-high max-w-xl w-full shadow-inner border border-surface-container"
              role="tablist"
            >
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "airport"}
                onClick={() => setActiveTab("airport")}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-label-lg text-label-lg transition-all duration-300 group ${
                  activeTab === "airport"
                    ? "bg-surface-container-lowest text-on-surface shadow-md font-bold scale-[1.02] border border-surface-container"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 active:scale-95"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-base transition-transform duration-300 ${
                    activeTab === "airport"
                      ? "text-secondary scale-110"
                      : "group-hover:scale-110 group-hover:-translate-y-0.5"
                  }`}
                >
                  flight_land
                </span>
                <span>BIA Transfers</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "tours"}
                onClick={() => setActiveTab("tours")}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-label-lg text-label-lg transition-all duration-300 group ${
                  activeTab === "tours"
                    ? "bg-surface-container-lowest text-on-surface shadow-md font-bold scale-[1.02] border border-surface-container"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 active:scale-95"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-base transition-transform duration-300 ${
                    activeTab === "tours"
                      ? "text-secondary scale-110"
                      : "group-hover:scale-110 group-hover:-translate-y-0.5"
                  }`}
                >
                  explore
                </span>
                <span>Multi-Day Tours</span>
              </button>

              <button
                type="button"
                role="tab"
                aria-selected={activeTab === "daytrips"}
                onClick={() => setActiveTab("daytrips")}
                className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-label-lg text-label-lg transition-all duration-300 group ${
                  activeTab === "daytrips"
                    ? "bg-surface-container-lowest text-on-surface shadow-md font-bold scale-[1.02] border border-surface-container"
                    : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container/50 active:scale-95"
                }`}
              >
                <span
                  className={`material-symbols-outlined text-base transition-transform duration-300 ${
                    activeTab === "daytrips"
                      ? "text-secondary scale-110"
                      : "group-hover:scale-110 group-hover:-translate-y-0.5"
                  }`}
                >
                  qr_code_2
                </span>
                <span>Day Excursions</span>
              </button>
            </div>
          </div>

          {/* TAB 1: AIRPORT TRANSFERS */}
          {activeTab === "airport" && (
            <div className="flex flex-col gap-10 animate-fadeIn">
              {/* Spotlight Banner Card */}
              <div className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest shadow-lg flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between border border-surface-container relative overflow-hidden reveal-scale group">
                <div className="shine-effect" />
                <div className="flex flex-col gap-3 max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-radar-ping"></span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold text-secondary">
                      Terminal Gate Meet &amp; Greet
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    Bandaranaike International Airport (BIA) Pickups
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Touch down in Colombo without travel stress. Chauffeur Harindu tracks your flight inbound, meets you inside the air-conditioned arrival lobby with a personalized name card, and assists with luggage straight to our modern hybrid vehicle.
                  </p>
                  <div className="flex flex-wrap items-center gap-y-2 gap-x-5 pt-2 text-on-surface">
                    <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined text-base text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Free flight delay waiting
                    </span>
                    <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined text-base text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      All highway expressway tolls included
                    </span>
                    <span className="inline-flex items-center gap-2 font-label-sm text-label-sm text-on-surface-variant group-hover:text-on-surface transition-colors">
                      <span className="material-symbols-outlined text-base text-secondary" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                      Complimentary chilled Ceylon water
                    </span>
                  </div>
                </div>

                <a
                  className="shrink-0 inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-primary-container text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-xl hover:bg-on-surface hover:scale-105 active:scale-95 transition-all duration-300 group/btn relative z-10"
                  href="#booking-engine"
                >
                  <span>Calculate Transfer Fare</span>
                  <span className="material-symbols-outlined text-lg group-hover/btn:translate-y-1 transition-transform">
                    arrow_downward
                  </span>
                </a>
              </div>

              {/* 8 Transfer Cards Grid with Staggered Entrance & Interactive Hover */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[
                  { route: "BIA → Negombo", time: "20 Minutes", tag: "Coastal", desc: "Fast transfer to seaside resorts, boutique villas, and Dutch canals.", usd: "$25", lkr: "LKR 7,500" },
                  { route: "BIA → Colombo City", time: "40 Minutes", tag: "Expressway", desc: "Direct transfer via CKE highway straight to Fort, Galle Face, or Cinnamon Gardens.", usd: "$35", lkr: "LKR 10,500" },
                  { route: "BIA → Bentota / Hikka", time: "2 Hours", tag: "Southern HWY", desc: "Southwest beach strip, water sports hubs, and tranquil river lagoon sanctuaries.", usd: "$65", lkr: "LKR 19,500" },
                  { route: "BIA → Galle Fort", time: "2.5 Hours", tag: "Southern HWY", desc: "UNESCO World Heritage ramparts, Unawatuna bay, and boutique colonial stays.", usd: "$75", lkr: "LKR 22,500" },
                  { route: "BIA → Kandy", time: "3 Hours", tag: "Hill Country", desc: "Upcountry climb past Kadugannawa pass directly into the Sacred Tooth Relic city.", usd: "$65", lkr: "LKR 19,500" },
                  { route: "BIA → Sigiriya / Dambulla", time: "3.5 Hours", tag: "Cultural Triangle", desc: "Direct drive to the Ancient Lion Rock fortress hotels and scenic jungle eco-resorts.", usd: "$80", lkr: "LKR 24,000" },
                  { route: "BIA → Mirissa / Weligama", time: "2.5 Hours", tag: "Southern Coast", desc: "Surf points, sandy bays, and whale watching ports reached via smooth Southern Expressway.", usd: "$85", lkr: "LKR 25,500" },
                  { route: "BIA → Ella / Nuwara Eliya", time: "5-6 Hours", tag: "Highlands", desc: "Climbing high into cool tea estates, tumbling waterfalls, and mist-covered mountain valleys.", usd: "$110", lkr: "LKR 33,000" },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-2 border border-surface-container hover:border-secondary/40 transition-all duration-300 flex flex-col justify-between gap-4 cursor-pointer group relative overflow-hidden active:scale-[0.98] reveal-on-scroll"
                    style={{ transitionDelay: `${idx * 60}ms` }}
                    onClick={() => {
                      const cleanDest = item.route.replace("BIA → ", "");
                      setCalcService("airport");
                      setCalcPickup("BIA Airport (Katunayake)");
                      if (cleanDest.includes("Colombo")) setCalcDestination("Colombo City Center");
                      else if (cleanDest.includes("Negombo")) setCalcDestination("Negombo");
                      else if (cleanDest.includes("Bentota")) setCalcDestination("Bentota / Hikkaduwa");
                      else if (cleanDest.includes("Galle")) setCalcDestination("Galle Fort / Unawatuna");
                      else if (cleanDest.includes("Mirissa")) setCalcDestination("Mirissa / Weligama");
                      else if (cleanDest.includes("Kandy")) setCalcDestination("Kandy Cultural Center");
                      else if (cleanDest.includes("Sigiriya")) setCalcDestination("Sigiriya / Dambulla");
                      else if (cleanDest.includes("Ella")) setCalcDestination("Ella / Nuwara Eliya");
                      const el = document.getElementById("booking-engine");
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    {/* Top hover indicator line */}
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-secondary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="shine-effect" />

                    <div className="flex flex-col gap-2 relative z-10">
                      <div className="flex items-center justify-between">
                        <span className="font-label-sm text-label-sm text-secondary font-semibold flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          {item.time}
                        </span>
                        <span className="font-label-sm text-label-sm px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant group-hover:bg-secondary/10 group-hover:text-secondary transition-colors">
                          {item.tag}
                        </span>
                      </div>
                      <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-secondary transition-colors duration-200">
                        {item.route}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {item.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-surface-container flex items-baseline justify-between relative z-10">
                      <div className="flex items-baseline gap-1">
                        <span className="font-headline-md text-headline-md text-on-surface font-bold group-hover:text-secondary group-hover:scale-105 transition-all duration-200 origin-left">
                          {item.usd}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline">USD</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="font-label-sm text-label-sm text-on-surface-variant">
                          {item.lkr}
                        </span>
                        <span className="material-symbols-outlined text-sm text-secondary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200">
                          arrow_forward
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 2: MULTI-DAY TOURS */}
          {activeTab === "tours" && (
            <div className="flex flex-col gap-10 animate-fadeIn">
              {/* Highlight Hero Card with Atmospheric Background Glow */}
              <div className="p-8 sm:p-10 rounded-3xl bg-primary-container text-on-primary shadow-xl flex flex-col lg:flex-row gap-8 items-start lg:items-center justify-between relative overflow-hidden border border-white/10 reveal-scale group">
                {/* Atmospheric Glow */}
                <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#25D366]/15 blur-3xl pointer-events-none animate-ambient-pulse" />
                <div
                  className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none animate-ambient-pulse"
                  style={{ animationDelay: "3s" }}
                />

                <div className="flex flex-col gap-3 max-w-2xl relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary-container"></span>
                    </span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold text-secondary-container">
                      Guest Favorite • Private Round Island Hire
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-primary">
                    Custom Multi-Day Island Chauffeur Hire
                  </h2>
                  <p className="font-body-md text-body-md text-inverse-primary leading-relaxed">
                    Travel at your individual pace without the rigidity of tour bus schedules. Chauffeur Harindu acts as your dedicated tourist driver, logistics coordinator, and local culture insider from start to finish.
                  </p>
                  <div className="flex items-baseline gap-2 pt-2">
                    <span className="font-display-lg text-display-lg text-secondary-container font-bold animate-pulse-subtle">
                      $80 - $95
                    </span>
                    <span className="font-body-md text-body-md text-inverse-primary">
                      / day (All-Inclusive)
                    </span>
                  </div>
                  <p className="font-body-sm text-body-sm text-inverse-primary/80">
                    Includes hybrid vehicle, 100% fuel, driver meals &amp; accommodation, highway tickets, and flexible photo stops.
                  </p>
                </div>

                <button
                  type="button"
                  className="shrink-0 inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-secondary-container text-on-secondary-container font-label-lg text-label-lg font-bold shadow-lg hover:shadow-2xl hover:brightness-110 hover:scale-105 active:scale-95 transition-all duration-300 relative z-10 group/cta overflow-hidden"
                  onClick={() => handlePrefillTour("8-Day Classic Ceylon Circuit")}
                >
                  <div className="shine-effect" />
                  <span>Book Tour Chauffeur</span>
                  <span className="material-symbols-outlined text-lg group-hover/cta:translate-x-1.5 transition-transform">
                    arrow_forward
                  </span>
                </button>
              </div>

              {/* 3 Tour Cards with Enhanced Hover Zoom & Step Indicators */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* 5-Day Highlights */}
                <div
                  className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-md hover:shadow-2xl hover:-translate-y-2.5 border border-surface-container hover:border-secondary/30 transition-all duration-400 overflow-hidden group reveal-on-scroll relative"
                  style={{ transitionDelay: "0ms" }}
                >
                  <div className="shine-effect" />
                  <div className="w-full h-56 relative overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage: `url('/images/tour-classic-circuit.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-sm text-label-sm font-bold text-on-surface shadow-sm">
                      5 Days • Express
                    </span>
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Highlights of Sri Lanka
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        The ideal itinerary for travelers with limited time seeking ancient heritage and tea hills.
                      </p>
                      <div className="flex flex-col gap-2.5 pt-2 font-label-sm text-label-sm text-on-surface">
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D1-2
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Colombo / BIA → Sigiriya Lion Rock &amp; Dambulla Caves
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D3
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Spice garden trail to Kandy &amp; Temple of the Tooth
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D4
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Scenic Ramboda waterfalls &amp; Nuwara Eliya tea estate
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D5
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Highland descent return to Colombo or BIA Airport
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95 shadow-sm"
                      onClick={() => handlePrefillTour("5-Day Highlights of Sri Lanka")}
                    >
                      <span>Select 5-Day Plan</span>
                      <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1.5 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>

                {/* 8-Day Classic (Recommended) */}
                <div
                  className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-lg hover:shadow-2xl hover:-translate-y-2.5 border-2 border-secondary/40 transition-all duration-400 overflow-hidden relative group reveal-on-scroll"
                  style={{ transitionDelay: "150ms" }}
                >
                  <div className="shine-effect" />
                  <div className="absolute top-4 right-4 z-20 px-3.5 py-1.5 rounded-full bg-secondary text-white font-label-sm text-label-sm font-bold shadow-md flex items-center gap-1.5 animate-pulse-subtle">
                    <span className="material-symbols-outlined text-xs">star</span>
                    Recommended
                  </div>
                  <div className="w-full h-56 relative overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage: `url('/images/tour-cultural-triangle.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-sm text-label-sm font-bold text-on-surface shadow-sm">
                      8 Days • Complete
                    </span>
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Classic Ceylon Circuit
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        The quintessential mix of wildlife safari, scenic mountain railway, and southern coast charm.
                      </p>
                      <div className="flex flex-col gap-2.5 pt-2 font-label-sm text-label-sm text-on-surface">
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D1-2
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Negombo to Cultural Triangle (Sigiriya &amp; Minneriya)
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D3
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Kandy Royal Botanical Gardens &amp; Evening Cultural Show
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D4-5
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Scenic train link to Ella, Nine Arch Bridge &amp; Little Adam's Peak
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D6
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Yala National Park 4x4 Leopard &amp; Elephant Safari
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D7-8
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Galle Fort Dutch Ramparts &amp; Mirissa coastal beach relax
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="w-full py-3.5 rounded-xl bg-primary-container text-on-primary font-label-md text-label-md font-bold hover:bg-secondary hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95 shadow-md"
                      onClick={() => handlePrefillTour("8-Day Classic Ceylon Circuit")}
                    >
                      <span>Select 8-Day Classic</span>
                      <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1.5 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>

                {/* 12-Day Grand Island */}
                <div
                  className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-md hover:shadow-2xl hover:-translate-y-2.5 border border-surface-container hover:border-secondary/30 transition-all duration-400 overflow-hidden group reveal-on-scroll relative"
                  style={{ transitionDelay: "300ms" }}
                >
                  <div className="shine-effect" />
                  <div className="w-full h-56 relative overflow-hidden">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage: `url('/images/tour-southern-coast.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
                    <span className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-sm text-label-sm font-bold text-on-surface shadow-sm">
                      12 Days • Deep Explorer
                    </span>
                  </div>
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between gap-6">
                    <div className="flex flex-col gap-3">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Grand Island Expedition
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        The comprehensive Sri Lanka route stretching from northern Tamil culture to southern surf towns.
                      </p>
                      <div className="flex flex-col gap-2.5 pt-2 font-label-sm text-label-sm text-on-surface">
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D1-3
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Wilpattu wilderness &amp; Northern Jaffna Peninsula
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D4-5
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Trincomalee Nilaveli beaches &amp; Pigeon Island reefs
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D6-7
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Sigiriya Rock, Polonnaruwa ruins &amp; Dambulla
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D8-10
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Kandy, Nuwara Eliya misty hills, and Ella gap
                          </span>
                        </div>
                        <div className="flex items-start gap-2.5 group/item">
                          <span className="px-1.5 py-0.5 rounded bg-secondary/15 font-bold text-secondary text-xs shrink-0">
                            D11-12
                          </span>
                          <span className="text-on-surface-variant group-hover/item:text-on-surface transition-colors">
                            Yala Safari, Weligama Bay &amp; Historic Galle Fort
                          </span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group/btn active:scale-95 shadow-sm"
                      onClick={() => handlePrefillTour("12-Day Grand Island Expedition")}
                    >
                      <span>Select 12-Day Grand</span>
                      <span className="material-symbols-outlined text-base group-hover/btn:translate-x-1.5 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DAY EXCURSIONS */}
          {activeTab === "daytrips" && (
            <div className="flex flex-col gap-8 animate-fadeIn">
              <div className="p-8 sm:p-10 rounded-3xl bg-surface-container-lowest shadow-md flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between border border-surface-container reveal-scale relative overflow-hidden group">
                <div className="shine-effect" />
                <div className="flex flex-col gap-2.5 max-w-2xl relative z-10">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-secondary animate-radar-ping"></span>
                    <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold text-secondary">
                      Same-Day Explorations
                    </span>
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface">
                    Curated Day Excursions with Private Return
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    Base yourself in Colombo, Negombo, or southern resorts while spending the day touring legendary ruins, safari gatherings, and ocean ports with no hotel luggage shifts.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Day Trip 1 */}
                <div
                  className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-md hover:shadow-2xl hover:-translate-y-2.5 border border-surface-container hover:border-secondary/30 transition-all duration-300 overflow-hidden group reveal-on-scroll relative"
                  style={{ transitionDelay: "0ms" }}
                >
                  <div className="shine-effect" />
                  <div className="w-full h-52 overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage: `url('/images/daytrip-galle-bentota.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-sm text-label-sm font-bold text-secondary shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      10-12 Hours
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Galle Fort &amp; Southern Coast
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Witness traditional stilt fishermen in Ahangama, tour the Kosgoda sea turtle sanctuary, and walk the historic 17th-century cobblestone alleys of Galle Dutch Fort.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 group/btn active:scale-95 shadow-sm"
                      onClick={() => handlePrefillDayTrip("Galle Fort & Southern Coast Day Trip")}
                    >
                      <span>Book This Excursion</span>
                      <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>

                {/* Day Trip 2 */}
                <div
                  className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-md hover:shadow-2xl hover:-translate-y-2.5 border border-surface-container hover:border-secondary/30 transition-all duration-300 overflow-hidden group reveal-on-scroll relative"
                  style={{ transitionDelay: "120ms" }}
                >
                  <div className="shine-effect" />
                  <div className="w-full h-52 overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage: `url('/images/daytrip-sigiriya-dambulla.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-sm text-label-sm font-bold text-secondary shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      12-14 Hours
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Sigiriya &amp; Minneriya Gathering
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Early morning summit of Sigiriya Rock Fortress, authentic village lunch cooked in clay pots, followed by an afternoon open-top 4x4 safari amidst wild elephant herds.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 group/btn active:scale-95 shadow-sm"
                      onClick={() => handlePrefillDayTrip("Sigiriya & Minneriya Day Excursion")}
                    >
                      <span>Book This Excursion</span>
                      <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>

                {/* Day Trip 3 */}
                <div
                  className="flex flex-col rounded-3xl bg-surface-container-lowest shadow-md hover:shadow-2xl hover:-translate-y-2.5 border border-surface-container hover:border-secondary/30 transition-all duration-300 overflow-hidden group reveal-on-scroll relative"
                  style={{ transitionDelay: "240ms" }}
                >
                  <div className="shine-effect" />
                  <div className="w-full h-52 overflow-hidden relative">
                    <div
                      className="w-full h-full bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                      style={{
                        backgroundImage: `url('/images/daytrip-kandy-pinnawala.jpg')`,
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm font-label-sm text-label-sm font-bold text-secondary shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      10-11 Hours
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between gap-5">
                    <div className="flex flex-col gap-2">
                      <h3 className="font-headline-sm text-headline-sm text-on-surface group-hover:text-secondary transition-colors">
                        Kandy Cultural Heritage Tour
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        Scenic drive to Pinnawala, exploration of the sprawling Royal Botanical Gardens of Peradeniya, and an auspicious visit to the Temple of the Sacred Tooth Relic.
                      </p>
                    </div>
                    <button
                      type="button"
                      className="w-full py-3 rounded-xl bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold hover:bg-secondary hover:text-white transition-all duration-300 flex items-center justify-center gap-1.5 group/btn active:scale-95 shadow-sm"
                      onClick={() => handlePrefillDayTrip("Kandy Cultural Heritage Tour")}
                    >
                      <span>Book This Excursion</span>
                      <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-1 transition-transform">
                        arrow_forward
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* =========================================================================
          THE CEYLONDRIVE GUARANTEE (6 STANDARD BADGES WITH INTERACTIVE ICONS)
          ========================================================================= */}
      <section className="w-full py-20 bg-surface-container-low relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 reveal-on-scroll">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-secondary font-label-sm text-label-sm font-semibold uppercase tracking-wider mb-2">
              <span className="material-symbols-outlined text-sm">verified</span>
              Standard on Every Journey
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
              The CeylonDrive Guarantee
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              Every kilometer in Sri Lanka is handled with executive care, modern amenities, and genuine Sinhalese warmth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: "wifi",
                title: "High-Speed 4G Hotspot",
                desc: "Stay seamlessly connected for navigation, business calls, and social updates throughout your road trip.",
              },
              {
                icon: "water_bottle",
                title: "Chilled Bottled Water",
                desc: "Fresh, sealed mineral water stocked inside the vehicle at all times to keep you refreshed in tropical heat.",
              },
              {
                icon: "mode_fan",
                title: "Dual-Zone AC Guaranteed",
                desc: "Meticulously serviced air conditioning keeps the cabin crisp and clean, whether cruising along the beach or climbing mountain passes.",
              },
              {
                icon: "photo_camera",
                title: "Flexible Photo Stops",
                desc: "Spot a roadside tea vendor or a viewpoint? Harindu stops whenever you want for spontaneous photography.",
              },
              {
                icon: "schedule",
                title: "Flight Delay Protection",
                desc: "If your flight into Bandaranaike International is delayed, our chauffeur waits without penalty or extra waiting charges.",
              },
              {
                icon: "support_agent",
                title: "24/7 Dedicated Care",
                desc: "Direct phone and WhatsApp access to Chauffeur Harindu for route advice, restaurant tips, and live assistance.",
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-2 border border-surface-container hover:border-secondary/30 transition-all duration-300 flex items-start gap-4.5 group relative overflow-hidden cursor-default reveal-on-scroll"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <div className="shine-effect" />
                <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center shrink-0 text-secondary group-hover:bg-secondary group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
                </div>
                <div className="flex flex-col gap-1.5 relative z-10">
                  <h3 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-secondary transition-colors duration-200">
                    {feature.title}
                  </h3>
                  <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          INSTANT FARE CALCULATOR & WHATSAPP BOOKING ENGINE
          ========================================================================= */}
      <section className="w-full py-20 bg-surface relative overflow-hidden" id="booking-engine">
        {/* Ambient atmospheric background glows */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none animate-ambient-pulse" />
        <div
          className="absolute bottom-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-ambient-pulse"
          style={{ animationDelay: "4s" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* Left description */}
            <div className="lg:col-span-5 flex flex-col gap-6 reveal-from-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high text-on-surface self-start font-label-sm text-label-sm font-semibold border border-surface-container">
                <span className="material-symbols-outlined text-sm text-secondary animate-pulse-subtle">calculate</span>
                <span>Real-Time Estimation</span>
              </div>
              <h2 className="font-display-lg text-display-lg text-on-surface tracking-tight">
                Instant Fare Calculator &amp; Inquiry
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Configure your journey parameters below to generate an estimated fare. When ready, click to send a structured inquiry directly to Harindu's WhatsApp with no registration required.
              </p>

              {/* Transparent pricing guarantee box */}
              <div className="p-6 rounded-3xl bg-surface-container-lowest shadow-md hover:shadow-xl border border-surface-container transition-all duration-300 flex flex-col gap-5 group relative overflow-hidden">
                <div className="shine-effect" />
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary shrink-0 group-hover:scale-110 transition-transform">
                    <span className="material-symbols-outlined text-2xl">verified</span>
                  </div>
                  <div>
                    <h3 className="font-title-md text-title-md text-on-surface font-bold">100% Transparent Pricing</h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">No fuel surcharges or driver meal supplements added later.</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-2.5 font-body-sm text-body-sm text-on-surface-variant">
                  <div className="flex justify-between items-center py-1 border-b border-surface-container/60">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-xs text-secondary">check</span>
                      Expressway Tolls:
                    </span>
                    <span className="font-semibold text-on-surface">100% Included</span>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-surface-container/60">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-xs text-secondary">check</span>
                      Driver Accommodation:
                    </span>
                    <span className="font-semibold text-on-surface">Included on Tours</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-xs text-secondary">payments</span>
                      Currencies Accepted:
                    </span>
                    <span className="font-semibold text-on-surface">USD, EUR, GBP, LKR</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right form container */}
            <div className="lg:col-span-7 p-6 sm:p-9 rounded-3xl bg-surface-container-lowest shadow-2xl border border-surface-container flex flex-col gap-6 reveal-from-right relative overflow-hidden group">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant flex items-center gap-1" htmlFor="calc-service">
                    <span className="material-symbols-outlined text-sm text-secondary">commute</span>
                    Service Type
                  </label>
                  <select
                    id="calc-service"
                    value={calcService}
                    onChange={(e) => setCalcService(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                  >
                    <option value="airport">BIA Airport Transfer</option>
                    <option value="tour">Multi-Day Round Island Tour</option>
                    <option value="daytrip">Day Excursion &amp; Sightseeing</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant flex items-center gap-1" htmlFor="calc-pickup">
                    <span className="material-symbols-outlined text-sm text-secondary">pin_drop</span>
                    Pickup Location
                  </label>
                  <select
                    id="calc-pickup"
                    value={calcPickup}
                    onChange={(e) => setCalcPickup(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                  >
                    <option value="BIA Airport (Katunayake)">BIA Airport (Katunayake)</option>
                    <option value="Colombo City Center">Colombo City Center</option>
                    <option value="Negombo Beach">Negombo Beach</option>
                    <option value="Galle Fort">Galle Fort</option>
                    <option value="Kandy">Kandy</option>
                    <option value="Sigiriya">Sigiriya</option>
                    <option value="Ella">Ella</option>
                    <option value="Other Location">Other (Custom Request)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant flex items-center gap-1" htmlFor="calc-destination">
                    <span className="material-symbols-outlined text-sm text-secondary">location_on</span>
                    Drop-off / Main Destination
                  </label>
                  <select
                    id="calc-destination"
                    value={calcDestination}
                    onChange={(e) => setCalcDestination(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                  >
                    <option value="Colombo City Center">Colombo City Center ($35)</option>
                    <option value="Negombo">Negombo Beach Resort ($25)</option>
                    <option value="Bentota / Hikkaduwa">Bentota / Hikkaduwa ($65)</option>
                    <option value="Galle Fort / Unawatuna">Galle Fort / Unawatuna ($75)</option>
                    <option value="Mirissa / Weligama">Mirissa / Weligama ($85)</option>
                    <option value="Kandy Cultural Center">Kandy Cultural Center ($65)</option>
                    <option value="Sigiriya / Dambulla">Sigiriya / Dambulla ($80)</option>
                    <option value="Ella / Nuwara Eliya">Ella / Nuwara Eliya ($110)</option>
                    <option value="Multi-Day Custom Circuit">Multi-Day Custom Circuit ($85/day)</option>
                  </select>
                </div>

                {calcService === "tour" ? (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant flex items-center gap-1" htmlFor="calc-days">
                      <span className="material-symbols-outlined text-sm text-secondary">calendar_today</span>
                      Number of Tour Days
                    </label>
                    <select
                      id="calc-days"
                      value={calcDays}
                      onChange={(e) => setCalcDays(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                    >
                      <option value="3">3 Days Island Tour</option>
                      <option value="5">5 Days Highlights Tour</option>
                      <option value="7">7 Days Classic Tour</option>
                      <option value="8">8 Days Complete Island</option>
                      <option value="10">10 Days Grand Tour</option>
                      <option value="12">12 Days Full Island Expedition</option>
                      <option value="14">14 Days Extended Vacation</option>
                    </select>
                  </div>
                ) : (
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant flex items-center gap-1" htmlFor="calc-date">
                      <span className="material-symbols-outlined text-sm text-secondary">event</span>
                      Travel Date
                    </label>
                    <input
                      id="calc-date"
                      type="date"
                      value={calcDate}
                      onChange={(e) => setCalcDate(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                    />
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant flex items-center gap-1" htmlFor="calc-passengers">
                    <span className="material-symbols-outlined text-sm text-secondary">group</span>
                    Passengers
                  </label>
                  <select
                    id="calc-passengers"
                    value={calcPassengers}
                    onChange={(e) => setCalcPassengers(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary"
                  >
                    <option value="1-2 Guests">1-2 Guests</option>
                    <option value="3 Guests">3 Guests</option>
                    <option value="4 Guests">4 Guests (Max Prius)</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant flex items-center gap-1" htmlFor="calc-luggage">
                    <span className="material-symbols-outlined text-sm text-secondary">luggage</span>
                    Luggage Pieces
                  </label>
                  <select
                    id="calc-luggage"
                    value={calcLuggage}
                    onChange={(e) => setCalcLuggage(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary"
                  >
                    <option value="1-2 Large Bags">1-2 Large Bags</option>
                    <option value="3 Large Bags">3 Large Bags</option>
                    <option value="4 Bags + Hand Carry">4 Bags + Hand Carry</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="font-label-sm text-label-sm font-semibold text-on-surface-variant flex items-center gap-1" htmlFor="calc-flight">
                    <span className="material-symbols-outlined text-sm text-secondary">flight</span>
                    Flight Number
                  </label>
                  <input
                    id="calc-flight"
                    type="text"
                    value={calcFlight}
                    onChange={(e) => setCalcFlight(e.target.value)}
                    placeholder="e.g. UL 504 / EK 652"
                    className="w-full px-4 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary"
                  />
                </div>
              </div>

              {/* Price summary row with animated price pop badge */}
              <div
                key={`${priceCalculation.usd}-${calcService}-${calcDestination}-${calcDays}`}
                className="p-6 rounded-2xl bg-surface-container-high border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-5 animate-price-pop"
              >
                <div className="flex flex-col">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider font-semibold">
                    Estimated All-Inclusive Rate
                  </span>
                  <div className="flex items-baseline gap-2.5 my-0.5">
                    <span className="font-display-lg text-display-lg text-on-surface font-bold">
                      {priceCalculation.usd}
                    </span>
                    <span className="font-title-md text-title-md text-on-surface-variant font-medium">
                      {priceCalculation.lkr}
                    </span>
                  </div>
                  <span className="font-body-sm text-body-sm text-secondary font-medium flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">info</span>
                    {priceCalculation.note}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={sendToWhatsApp}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-white font-label-lg text-label-lg font-bold shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:brightness-110 active:scale-95 transition-all duration-300 whatsapp-pulse group/btn relative overflow-hidden shrink-0"
                >
                  <div className="shine-effect" />
                  <span className="material-symbols-outlined text-2xl group-hover/btn:rotate-12 transition-transform duration-300">
                    chat
                  </span>
                  <span>Inquire on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          FREQUENTLY ASKED PRICING QUESTIONS (ACCORDION WITH SMOOTH EXPANSION)
          ========================================================================= */}
      <section className="w-full py-20 bg-surface-container-low relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center mb-12 reveal-on-scroll">
            <span className="font-label-sm text-label-sm uppercase tracking-widest font-semibold text-secondary">
              Peace of Mind
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2">
              Frequently Asked Pricing Questions
            </h2>
          </div>

          <div className="flex flex-col gap-4">
            {[
              {
                q: "Are there any hidden costs or surprise tolls?",
                a: "Zero hidden costs. All quoted transfer fares include expressway tolls (such as the Katunayake Airport Expressway and Southern Expressway), parking entrance charges, and vehicle fuel. For multi-day tours, driver meals and driver accommodation are fully covered in the daily rate.",
              },
              {
                q: "What happens if my flight into BIA Colombo is delayed?",
                a: "We track all inbound flights live via international flight tracking radars. Whether your flight lands 30 minutes early or 3 hours late due to weather, Harindu will be inside the terminal waiting for you with your name placard. There are no wait-time penalty fees.",
              },
              {
                q: "How do I pay for my transfer or tour?",
                a: "We accept cash payment upon arrival directly to the chauffeur in USD, Euros, British Pounds, or Sri Lankan Rupees (LKR) at fair bank mid-market rates. For multi-day tours, guests can pay in convenient installments throughout the journey.",
              },
              {
                q: "Can we adjust the tour itinerary on the go?",
                a: "Yes, complete flexibility is the single greatest advantage of private chauffeur hire with CeylonDrive. If you wish to spend an extra hour at a scenic tea factory, detour to an herbal garden, or take sunset photos, Harindu accommodates your pace effortlessly.",
              },
            ].map((faq, idx) => (
              <details
                key={idx}
                className="group p-6 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-surface-container hover:border-secondary/30 transition-all duration-300 [&_summary::-webkit-details-marker]:hidden reveal-on-scroll cursor-pointer"
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                <summary className="flex items-center justify-between font-title-md text-title-md text-on-surface font-semibold group-open:text-secondary group-hover:text-secondary transition-colors duration-200">
                  <span>{faq.q}</span>
                  <span className="material-symbols-outlined transition-transform duration-300 group-open:rotate-180 text-secondary shrink-0 ml-4">
                    expand_more
                  </span>
                </summary>
                <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed border-t border-surface-container/60 pt-4">
                  {faq.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          BOTTOM DIRECT CHAUFFEUR CALL-TO-ACTION (COHESIVE EXECUTIVE FINISH)
          ========================================================================= */}
      <section className="w-full py-16 bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-container text-on-primary rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10 reveal-scale group">
            {/* Atmospheric Background Glows */}
            <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-[#25D366]/15 blur-3xl pointer-events-none animate-ambient-pulse" />
            <div
              className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none animate-ambient-pulse"
              style={{ animationDelay: "3s" }}
            />

            <div className="flex flex-col gap-3.5 max-w-xl text-left relative z-10">
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
                </span>
                <span className="font-label-sm text-label-sm text-secondary-container font-bold uppercase tracking-wider">
                  Direct WhatsApp Access • Harindu Online
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-white tracking-tight leading-tight">
                Need a Custom Itinerary or Quick Route Advice?
              </h2>
              <p className="font-body-md text-body-md text-inverse-primary leading-relaxed">
                Connect directly with Chauffeur {DRIVER_INFO.name.split(" ")[0]} on WhatsApp. Share your dates, preferred destinations, or flight details for a tailored recommendation and immediate fixed quote.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-white font-label-sm text-label-sm pt-2">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#25D366] text-base">timer</span>
                  Replies within 10 minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#25D366] text-base">lock_open</span>
                  No credit card pre-payment needed
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 w-full sm:w-auto relative z-10">
              <a
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-white font-label-lg text-label-lg font-bold shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:brightness-110 active:scale-95 transition-all text-center whatsapp-pulse hover:scale-105 duration-200"
                href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I%20would%20like%20to%20plan%20a%20private%20Sri%20Lanka%20transfer%20or%20tour`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-2xl">chat</span>
                <span>Chat with Harindu</span>
              </a>
              <Link
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-high/20 hover:bg-surface-container-high/30 text-white font-label-md text-label-md font-semibold transition-all text-center group hover:scale-105 active:scale-95 duration-200 border border-white/10"
                to="/contact-booking"
              >
                <span className="material-symbols-outlined text-lg">calendar_month</span>
                <span>Go to Booking &amp; Contact</span>
                <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
