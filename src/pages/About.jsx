import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { DRIVER_INFO } from "../data/constants";
import Icon from "../components/Icon";

export default function About() {
  const [activeVehicleView, setActiveVehicleView] = useState("exterior"); // 'exterior' | 'interior'
  const [highlightedLuggage, setHighlightedLuggage] = useState(null); // 'checked' | 'carryon' | 'daypack' | null

  // Scroll-triggered reveal animations via IntersectionObserver
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
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
  }, []);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* =========================================================================
          TOP BREADCRUMB & PAGE BANNER WITH ATMOSPHERIC GLOW
          ========================================================================= */}
      <section className="relative w-full bg-surface-container-low py-8 md:py-14 overflow-hidden border-b border-surface-container">
        {/* Ambient Animated Glows */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-secondary-container/10 blur-3xl pointer-events-none animate-ambient-pulse" />
        <div
          className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-[#25D366]/10 blur-3xl pointer-events-none animate-ambient-pulse"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col gap-3">
            {/* Breadcrumb Navigation */}
            <nav className="flex items-center gap-2 text-on-surface-variant font-label-sm text-label-sm animate-fade-in-down">
              <Link className="hover:text-primary transition-colors flex items-center gap-1" to="/">
                <Icon className="text-sm">home</Icon>
                <span>Home</span>
              </Link>
              <Icon className="text-xs text-outline">chevron_right</Icon>
              <span className="text-primary font-semibold">About Us &amp; Vehicle</span>
            </nav>

            {/* Banner Main Title Row */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pt-2">
              <div className="animate-fade-in-up animation-delay-100">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold mb-3 shadow-sm hover:scale-105 transition-transform duration-200">
                  <Icon className="text-sm animate-pulse-subtle">verified_user</Icon>
                  Authentic Island Hospitality &amp; Fleet Excellence
                </span>
                <h1 className="font-display-lg text-display-lg text-primary tracking-tight">
                  About Us &amp; Vehicle
                </h1>
                <p className="font-headline-sm text-headline-sm text-on-surface-variant font-normal mt-2 max-w-2xl">
                  Your Trusted Private Travel Companion Across the Wonder of Asia
                </p>
              </div>

              {/* Fleet Live Status Pill with Radar Ping */}
              <div className="flex items-center gap-3 shrink-0 animate-fade-in-up animation-delay-200">
                <div className="flex flex-col items-start md:items-end bg-surface-container-lowest/80 backdrop-blur-sm p-3.5 rounded-2xl shadow-sm border border-surface-container hover:shadow-md transition-shadow">
                  <span className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                    <Icon className="text-xs">local_shipping</Icon>
                    Dedicated Fleet Status
                  </span>
                  <span className="font-label-lg text-label-lg font-bold text-on-tertiary-container flex items-center gap-2 mt-0.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-radar-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-[#25D366]"></span>
                    </span>
                    Toyota Prius Hybrid Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          DRIVER PROFILE & STORY SECTION (STAGGERED SLIDE REVEALS)
          ========================================================================= */}
      <section className="py-14 md:py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Chauffeur Portrait, Verification Badges, Quote */}
            <div className="lg:col-span-5 flex flex-col gap-6 reveal-from-left">
              {/* Profile Card with Photo */}
              <div className="relative bg-surface-container-lowest rounded-3xl shadow-xl overflow-hidden p-3 border border-surface-container group">
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-surface-container">
                  <img
                    alt={`${DRIVER_INFO.name} - CeylonDrive Private Chauffeur`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    src={DRIVER_INFO.photo}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                  {/* Floating Driver Info Bar */}
                  <div className="absolute bottom-3 left-3 right-3 bg-surface-container-lowest/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-lg flex items-center justify-between border border-white/40">
                    <div>
                      <h3 className="font-title-md text-title-md text-primary font-bold">{DRIVER_INFO.name}</h3>
                      <p className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <Icon className="text-xs text-secondary">verified</Icon>
                        {DRIVER_INFO.role}
                      </p>
                    </div>
                    <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-[#25D366]/15 text-[#006622] font-label-sm text-label-sm font-bold shadow-sm hover:scale-105 transition-transform">
                      <Icon className="text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>stars</Icon>
                      {DRIVER_INFO.rating} ({DRIVER_INFO.reviewsCount} Reviews)
                    </span>
                  </div>
                </div>

                {/* 4 Trust Grid Badges with Micro Hover-Lifts */}
                <div className="grid grid-cols-2 gap-2.5 pt-3">
                  <div className="bg-surface-container-low p-3 rounded-xl flex items-center gap-2.5 hover:bg-surface-container hover:-translate-y-1 hover:shadow-md transition-all duration-300 group/badge relative overflow-hidden">
                    <div className="shine-effect" />
                    <Icon className="text-secondary text-2xl group-hover/badge:scale-110 group-hover/badge:rotate-6 transition-transform">badge</Icon>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">SLTDA Certified</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Official Tourist Guide</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-3 rounded-xl flex items-center gap-2.5 hover:bg-surface-container hover:-translate-y-1 hover:shadow-md transition-all duration-300 group/badge relative overflow-hidden">
                    <div className="shine-effect" />
                    <Icon className="text-secondary text-2xl group-hover/badge:scale-110 group-hover/badge:rotate-6 transition-transform">history_edu</Icon>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">12+ Years Exp.</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Islandwide Routes</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-3 rounded-xl flex items-center gap-2.5 hover:bg-surface-container hover:-translate-y-1 hover:shadow-md transition-all duration-300 group/badge relative overflow-hidden">
                    <div className="shine-effect" />
                    <Icon className="text-secondary text-2xl group-hover/badge:scale-110 group-hover/badge:rotate-6 transition-transform">record_voice_over</Icon>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">Fluent English</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Clear Communication</span>
                    </div>
                  </div>

                  <div className="bg-surface-container-low p-3 rounded-xl flex items-center gap-2.5 hover:bg-surface-container hover:-translate-y-1 hover:shadow-md transition-all duration-300 group/badge relative overflow-hidden">
                    <div className="shine-effect" />
                    <Icon className="text-secondary text-2xl group-hover/badge:scale-110 group-hover/badge:rotate-6 transition-transform">no_crash</Icon>
                    <div className="flex flex-col">
                      <span className="font-label-sm text-label-sm font-bold text-on-surface">1,800+ Trips</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Accident-Free Record</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Founder Personal Quote Box */}
              <div className="bg-primary-container text-on-primary-fixed p-6 sm:p-7 rounded-3xl shadow-xl relative overflow-hidden border border-white/10 group hover:shadow-2xl transition-all duration-500">
                <Icon className="text-primary-fixed-dim/20 text-8xl absolute -right-3 -bottom-3 pointer-events-none animate-slow-float">format_quote</Icon>
                <p className="font-body-md text-body-md text-surface-bright leading-relaxed italic relative z-10">
                  “My grandfather drove visitors through the central tea hills in the 1970s. For me, driving is not just transport—it is about welcoming friends to my homeland, protecting their peace of mind, and ensuring every single mile is safe, relaxed, and genuinely memorable.”
                </p>
                <div className="mt-5 flex items-center gap-3 relative z-10">
                  <span className="w-10 h-0.5 bg-secondary-container rounded-full group-hover:w-14 transition-all duration-300"></span>
                  <span className="font-label-sm text-label-sm text-primary-fixed font-semibold tracking-wide">
                    {DRIVER_INFO.name}, CeylonDrive Founder
                  </span>
                </div>
              </div>
            </div>

            {/* Right Column: Biography, 5-Point Charter & Key Metrics */}
            <div className="lg:col-span-7 flex flex-col gap-8 reveal-from-right">
              <div>
                <span className="font-label-lg text-label-lg text-secondary font-bold tracking-wider uppercase inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  Meet Your Chauffeur
                </span>
                <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1.5">
                  Born &amp; Raised in Sri Lanka with an Intimate Knowledge of Every Hill, Coast, and Passage
                </h2>
                <div className="w-20 h-1 bg-secondary-container rounded-full mt-3 mb-6 transition-all duration-500 hover:w-28"></div>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed mb-4">
                  Navigating Sri Lanka is an art form. From the sharp hairpin bends of the Knuckles mountain range and misty switchbacks of Nuwara Eliya, to quiet wildlife bypasses bordering Yala and Udawalawe, Harindu brings over a decade of defensive driving expertise and rich cultural context.
                </p>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Unlike commercial tour operators who herd guests toward aggressive sales traps, Harindu founded CeylonDrive with a distinct ethos: genuine, client-focused hospitality. Whether you wish to pause by an unmapped roadside king coconut stand, adjust your day's pacing for an evening sunset by Kandalama Lake, or need insider tips on Colombo's culinary gems, you have a trusted local ally at the wheel.
                </p>
              </div>

              {/* Core 5-Point Guest Charter (Interactive Hover Cards) */}
              <div className="bg-surface-container-lowest p-6 md:p-8 rounded-3xl shadow-sm border border-surface-container hover:shadow-md transition-shadow">
                <h3 className="font-title-md text-title-md text-primary font-bold mb-5 flex items-center gap-2">
                  <Icon className="text-secondary animate-gentle-float">handshake</Icon>
                  {DRIVER_INFO.name}’s 5-Point Guest Charter
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-all duration-300 group/charter">
                    <Icon className="text-[#25D366] text-xl shrink-0 mt-0.5 group-hover/charter:scale-125 transition-transform">check_circle</Icon>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-primary font-bold group-hover/charter:text-secondary transition-colors">
                        100% Zero-Commission Policy
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                        No unwanted stops at overpriced tourist souvenir shops, tea centers, or high-pressure gem workshops.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-all duration-300 group/charter">
                    <Icon className="text-[#25D366] text-xl shrink-0 mt-0.5 group-hover/charter:scale-125 transition-transform">check_circle</Icon>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-primary font-bold group-hover/charter:text-secondary transition-colors">
                        Uncompromising Safety
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                        Defensive driving protocols, strict speed limit adherence, zero aggressive overtaking, and full passenger care.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-all duration-300 group/charter">
                    <Icon className="text-[#25D366] text-xl shrink-0 mt-0.5 group-hover/charter:scale-125 transition-transform">check_circle</Icon>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-primary font-bold group-hover/charter:text-secondary transition-colors">
                        Total Schedule Flexibility
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                        Spontaneous photo pauses, scenic tea viewpoints, and flexible morning departure times tuned to your cadence.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-all duration-300 group/charter">
                    <Icon className="text-[#25D366] text-xl shrink-0 mt-0.5 group-hover/charter:scale-125 transition-transform">check_circle</Icon>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-primary font-bold group-hover/charter:text-secondary transition-colors">
                        Impeccable Punctuality
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                        Stationed at your hotel lobby or airport arrival lounge 15 minutes before agreed pickup times, guaranteed.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-surface-container-low transition-all duration-300 group/charter sm:col-span-2">
                    <Icon className="text-[#25D366] text-xl shrink-0 mt-0.5 group-hover/charter:scale-125 transition-transform">check_circle</Icon>
                    <div>
                      <h4 className="font-label-lg text-label-lg text-primary font-bold group-hover/charter:text-secondary transition-colors">
                        Transparent Local Insight &amp; Support
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-0.5 leading-relaxed">
                        Honest advice on authentic dining spots, fair ticket prices, elephant safari ethics, and currency exchange navigation.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Stats Row with Hover Pop */}
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container hover:bg-surface-container-lowest hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group">
                  <span className="font-display-lg text-headline-lg text-primary font-bold block group-hover:scale-110 transition-transform text-[#008A4B]">
                    100%
                  </span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1.5 font-medium">
                    Verified Solo &amp; Family Friendly
                  </p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container hover:bg-surface-container-lowest hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group">
                  <span className="font-display-lg text-headline-lg text-primary font-bold block group-hover:scale-110 transition-transform text-secondary">
                    45+
                  </span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1.5 font-medium">
                    Nationalities Hosted
                  </p>
                </div>
                <div className="p-4 sm:p-5 rounded-2xl bg-surface-container-low border border-surface-container hover:bg-surface-container-lowest hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 group">
                  <span className="font-display-lg text-headline-lg text-primary font-bold block group-hover:scale-110 transition-transform text-primary">
                    0
                  </span>
                  <p className="font-label-sm text-label-sm text-on-surface-variant mt-1.5 font-medium">
                    Hidden Surcharges Ever
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          INTERACTIVE VEHICLE SHOWCASE: TOYOTA PRIUS 3RD GEN HYBRID
          ========================================================================= */}
      <section className="py-14 md:py-24 bg-surface-container-low relative border-y border-surface-container">
        {/* Background Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#25D366]/5 blur-3xl pointer-events-none animate-ambient-pulse" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Intro */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 reveal-on-scroll">
            <div>
              <span className="font-label-lg text-label-lg text-secondary font-bold tracking-wider uppercase inline-flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Our Dedicated Fleet
              </span>
              <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1.5">
                Toyota Prius 3rd Gen (Hybrid Synergized)
              </h2>
              <p className="font-body-lg text-body-lg text-on-surface-variant mt-2 max-w-2xl leading-relaxed">
                Why our guests love touring Sri Lanka in our flagship Prius: Whisper-quiet performance, advanced passenger climate stability, and eco-conscious travel across sensitive ecological parks.
              </p>
            </div>

            {/* View Switcher Pills */}
            <div className="flex items-center gap-2 p-1.5 bg-surface-container-lowest rounded-full shadow-sm border border-surface-container shrink-0">
              <button
                type="button"
                onClick={() => setActiveVehicleView("exterior")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-label-md font-semibold transition-all duration-300 ${
                  activeVehicleView === "exterior"
                    ? "bg-primary-container text-surface-bright shadow-sm"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <Icon className="text-base">directions_car</Icon>
                <span>Prius Exterior</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveVehicleView("interior")}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-label-md font-semibold transition-all duration-300 ${
                  activeVehicleView === "interior"
                    ? "bg-primary-container text-surface-bright shadow-sm"
                    : "text-on-surface-variant hover:text-primary"
                }`}
              >
                <Icon className="text-base">airline_seat_recline_normal</Icon>
                <span>Pristine Cabin</span>
              </button>
            </div>
          </div>

          {/* Interactive Vehicle Showcase Hero Card */}
          <div className="bg-surface-container-lowest rounded-3xl shadow-xl overflow-hidden mb-12 border border-surface-container reveal-scale">
            <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
              {/* Vehicle Image Gallery View with Smooth Transition */}
              <div className="lg:col-span-7 relative aspect-[16/10] sm:aspect-[16/9] lg:aspect-auto lg:h-[460px] overflow-hidden bg-primary-container group">
                <img
                  key={activeVehicleView}
                  src={
                    activeVehicleView === "exterior"
                      ? "/images/vehicle-prius.jpg"
                      : "/images/vehicle-interior.jpg"
                  }
                  alt={
                    activeVehicleView === "exterior"
                      ? "Toyota Prius 3rd Gen Hybrid - CeylonDrive Fleet"
                      : "Toyota Prius Interior Cabin & Rear Legroom"
                  }
                  className="w-full h-full object-cover animate-fadeIn group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-container/80 via-transparent to-black/20 pointer-events-none" />

                {/* Floating Micro Feature Badges on Vehicle */}
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-md">
                    <Icon className="text-sm text-[#008A4B]">bolt</Icon>
                    Hybrid Synergy 1.8L
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-primary font-label-sm text-label-sm font-bold shadow-md">
                    <Icon className="text-sm text-[#0369A1]">ac_unit</Icon>
                    Continuous Dual AC
                  </span>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-surface-bright">
                  <div>
                    <p className="font-label-sm text-label-sm text-inverse-primary">
                      {activeVehicleView === "exterior"
                        ? "Aerodynamic Exterior & Smooth Highway Stability"
                        : "Deep Cleaned & Sanitized Cabin with Plush Upholstery"}
                    </p>
                    <h4 className="font-title-md text-title-md font-bold text-surface-bright">
                      {activeVehicleView === "exterior"
                        ? "Flagship Hybrid Model 2015/2016"
                        : "Silent Ride with Ample Passenger Space"}
                    </h4>
                  </div>
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-bold shadow-lg">
                    <Icon className="text-sm">airline_seat_recline_extra</Icon>
                    Max 3 Adults
                  </span>
                </div>
              </div>

              {/* Highlights & Quick Specs Sidebar */}
              <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8F8F0] text-[#008A4B] font-label-sm text-label-sm font-bold mb-3">
                    <Icon className="text-sm">eco</Icon>
                    Zero Engine Idle Noise in Towns
                  </div>
                  <h3 className="font-headline-md text-headline-md text-primary font-bold">
                    Engineered for Sri Lanka’s Mountain Curves &amp; Coastal Heat
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                    Unlike standard noisy diesel vans or cramped small hatchbacks, the Toyota Prius combines an advanced petrol-electric synergy powertrain with full independent rear suspension, guaranteeing buttery smooth long-distance travel.
                  </p>
                </div>

                {/* Quick Spec Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 my-6">
                  <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center gap-3 hover:bg-surface-container transition-colors">
                    <Icon className="text-secondary text-2xl">volume_off</Icon>
                    <div>
                      <span className="font-label-sm text-label-sm font-bold text-primary block">Whisper Quiet</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">EV Stealth Mode</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center gap-3 hover:bg-surface-container transition-colors">
                    <Icon className="text-secondary text-2xl">speed</Icon>
                    <div>
                      <span className="font-label-sm text-label-sm font-bold text-primary block">Expressway 100km/h</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">E01 / E02 Approved</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center gap-3 hover:bg-surface-container transition-colors">
                    <Icon className="text-secondary text-2xl">wifi</Icon>
                    <div>
                      <span className="font-label-sm text-label-sm font-bold text-primary block">Free 4G Wi-Fi</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Fast Onboard Hotspot</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-surface-container-low border border-surface-container flex items-center gap-3 hover:bg-surface-container transition-colors">
                    <Icon className="text-secondary text-2xl">local_drink</Icon>
                    <div>
                      <span className="font-label-sm text-label-sm font-bold text-primary block">Chilled Bottles</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Fresh Spring Water</span>
                    </div>
                  </div>
                </div>

                {/* Quick Switch Prompt */}
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-4 border-t border-surface-container">
                  <span className="flex items-center gap-1.5">
                    <Icon className="text-base text-[#25D366]">check_circle</Icon>
                    Meticulously detailed daily
                  </span>
                  <a
                    href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hi%20Harindu,%20I%20want%20to%20inquire%20about%20booking%20your%20Toyota%20Prius`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-primary hover:text-secondary inline-flex items-center gap-1 transition-colors"
                  >
                    <span>Reserve Prius</span>
                    <Icon className="text-sm">arrow_forward</Icon>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* 6 Core Vehicle Feature Cards (Staggered Scroll Reveals & Micro-Elevations) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
            {/* Feature 1 */}
            <div
              className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-[#008A4B]/20 transition-all duration-300 group reveal-on-scroll relative overflow-hidden"
              style={{ transitionDelay: "0ms" }}
            >
              <div className="shine-effect" />
              <div>
                <div className="w-13 h-13 rounded-2xl bg-[#E8F8F0] text-[#008A4B] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                  <Icon className="text-2xl">eco</Icon>
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors">
                  Eco-Friendly &amp; Whisper Quiet
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Minimizes carbon footprint across Sri Lanka's pristine wildlife sanctuaries like Horton Plains and Sinharaja. Electric EV stealth mode allows for peaceful wildlife viewing near jungle roads without engine roar.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>EV / Hybrid Synergy</span>
                <span className="font-semibold text-[#008A4B] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#008A4B]" />
                  Ultra Low Emission
                </span>
              </div>
            </div>

            {/* Feature 2 */}
            <div
              className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-[#0369A1]/20 transition-all duration-300 group reveal-on-scroll relative overflow-hidden"
              style={{ transitionDelay: "100ms" }}
            >
              <div className="shine-effect" />
              <div>
                <div className="w-13 h-13 rounded-2xl bg-[#E0F2FE] text-[#0369A1] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                  <Icon className="text-2xl">ac_unit</Icon>
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors">
                  Ice-Cold Dual Climate Control
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Equipped with heavy-duty Japanese automatic air conditioning. Guaranteed immediate rapid cabin cooling whether arriving under hot coastal humidity in Bentota or transitioning through high-altitude Nuwara Eliya.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Fast Multi-Zone Venting</span>
                <span className="font-semibold text-[#0369A1] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0369A1]" />
                  Always Frosty
                </span>
              </div>
            </div>

            {/* Feature 3 */}
            <div
              className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-[#B45309]/20 transition-all duration-300 group reveal-on-scroll relative overflow-hidden"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="shine-effect" />
              <div>
                <div className="w-13 h-13 rounded-2xl bg-[#FEF3C7] text-[#B45309] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                  <Icon className="text-2xl">airline_seat_recline_extra</Icon>
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors">
                  Plush Seating &amp; Generous Legroom
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  High-contour ergonomic seats engineered to reduce fatigue during multi-hour transfers. Smooth independent suspension absorbs road unevenness along hill-country curves with ample rear leg space.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Optimal Posture Support</span>
                <span className="font-semibold text-primary flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                  Max 3 Adults
                </span>
              </div>
            </div>

            {/* Feature 4 */}
            <div
              className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-[#7E22CE]/20 transition-all duration-300 group reveal-on-scroll relative overflow-hidden"
              style={{ transitionDelay: "300ms" }}
            >
              <div className="shine-effect" />
              <div>
                <div className="w-13 h-13 rounded-2xl bg-[#F3E8FF] text-[#7E22CE] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                  <Icon className="text-2xl">power</Icon>
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors">
                  USB Power &amp; Wi-Fi Onboard
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Multiple high-speed USB charging cables (Type-C, Lightning, Micro-USB) available at all times. Complimentary 4G portable Wi-Fi hotspot upon request to keep your maps, chats, and cameras connected.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Fast Fast-Charge Hub</span>
                <span className="font-semibold text-[#7E22CE] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#7E22CE]" />
                  Free Mobile Wi-Fi
                </span>
              </div>
            </div>

            {/* Feature 5 */}
            <div
              className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-[#15803D]/20 transition-all duration-300 group reveal-on-scroll relative overflow-hidden"
              style={{ transitionDelay: "400ms" }}
            >
              <div className="shine-effect" />
              <div>
                <div className="w-13 h-13 rounded-2xl bg-[#DCFCE7] text-[#15803D] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                  <Icon className="text-2xl">sanitizer</Icon>
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors">
                  Pristine Hygiene &amp; Amenities
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Deep sanitized interior prior to every guest journey. Fresh sealed chilled mineral water bottles, sanitizing wipes, hand gel, and umbrella coverage for unexpected monsoon drizzles included with compliments.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>Daily Ozone Sanitized</span>
                <span className="font-semibold text-[#15803D] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#15803D]" />
                  Chilled Water Included
                </span>
              </div>
            </div>

            {/* Feature 6 */}
            <div
              className="bg-surface-container-lowest p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-[#B91C1C]/20 transition-all duration-300 group reveal-on-scroll relative overflow-hidden"
              style={{ transitionDelay: "500ms" }}
            >
              <div className="shine-effect" />
              <div>
                <div className="w-13 h-13 rounded-2xl bg-[#FEE2E2] text-[#B91C1C] flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-sm">
                  <Icon className="text-2xl">shield</Icon>
                </div>
                <h3 className="font-title-md text-title-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors">
                  Full Comprehensive Insurance
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Complete commercial passenger travel insurance with top Sri Lankan underwriter. 8 dual SRS airbags, electronic stability control, and ABS brake assist maintained to rigorous manufacturer schedule.
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-surface-container flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                <span>8 Active SRS Airbags</span>
                <span className="font-semibold text-[#B91C1C] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B91C1C]" />
                  Full Commercial Cover
                </span>
              </div>
            </div>
          </div>

          {/* =========================================================================
              LUGGAGE SPACE DIAGRAM & INTERACTIVE VISUAL BREAKDOWN
              ========================================================================= */}
          <div className="bg-surface-container-lowest rounded-3xl p-6 sm:p-8 lg:p-12 shadow-sm border border-surface-container reveal-on-scroll">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Interactive Luggage Items */}
              <div className="lg:col-span-5">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold mb-3">
                  <Icon className="text-sm text-secondary">luggage</Icon>
                  Smart Cargo Management
                </span>
                <h3 className="font-headline-md text-headline-md text-primary font-bold">
                  Illustrated Luggage Capacity
                </h3>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
                  The hatchback architecture of the Toyota Prius provides remarkable cargo flexibility. Hover or tap each luggage category to see how it fits into our 445L trunk.
                </p>

                {/* Interactive Luggage List Items */}
                <div className="mt-6 flex flex-col gap-3">
                  <button
                    type="button"
                    onMouseEnter={() => setHighlightedLuggage("checked")}
                    onMouseLeave={() => setHighlightedLuggage(null)}
                    onClick={() => setHighlightedLuggage(highlightedLuggage === "checked" ? null : "checked")}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl text-left border transition-all duration-300 ${
                      highlightedLuggage === "checked"
                        ? "bg-[#E8F8F0] border-[#008A4B] shadow-md -translate-x-1"
                        : "bg-surface-container-low border-transparent hover:bg-surface-container hover:border-secondary/20"
                    }`}
                  >
                    <Icon className="text-secondary text-2xl">luggage</Icon>
                    <div className="flex-1">
                      <span className="font-label-md text-label-md font-bold text-primary block">
                        2 x Large Suitcases (28” – 30”)
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Lays flat across the wide trunk base</p>
                    </div>
                    <span className="font-label-sm text-label-sm font-bold text-[#008A4B] px-2.5 py-1 rounded-full bg-white shadow-sm">
                      Fits Easy
                    </span>
                  </button>

                  <button
                    type="button"
                    onMouseEnter={() => setHighlightedLuggage("carryon")}
                    onMouseLeave={() => setHighlightedLuggage(null)}
                    onClick={() => setHighlightedLuggage(highlightedLuggage === "carryon" ? null : "carryon")}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl text-left border transition-all duration-300 ${
                      highlightedLuggage === "carryon"
                        ? "bg-[#E0F2FE] border-[#0369A1] shadow-md -translate-x-1"
                        : "bg-surface-container-low border-transparent hover:bg-surface-container hover:border-secondary/20"
                    }`}
                  >
                    <Icon className="text-secondary text-2xl">backpack</Icon>
                    <div className="flex-1">
                      <span className="font-label-md text-label-md font-bold text-primary block">
                        2 x Carry-On Bags (20” – 22”)
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Placed neatly above primary suitcases</p>
                    </div>
                    <span className="font-label-sm text-label-sm font-bold text-[#008A4B] px-2.5 py-1 rounded-full bg-white shadow-sm">
                      Fits Easy
                    </span>
                  </button>

                  <button
                    type="button"
                    onMouseEnter={() => setHighlightedLuggage("daypack")}
                    onMouseLeave={() => setHighlightedLuggage(null)}
                    onClick={() => setHighlightedLuggage(highlightedLuggage === "daypack" ? null : "daypack")}
                    className={`flex items-center gap-3 p-3.5 rounded-2xl text-left border transition-all duration-300 ${
                      highlightedLuggage === "daypack"
                        ? "bg-[#FEF3C7] border-[#B45309] shadow-md -translate-x-1"
                        : "bg-surface-container-low border-transparent hover:bg-surface-container hover:border-secondary/20"
                    }`}
                  >
                    <Icon className="text-secondary text-2xl">work</Icon>
                    <div className="flex-1">
                      <span className="font-label-md text-label-md font-bold text-primary block">
                        2-3 x Daypacks / Camera Totes
                      </span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Underseat or cabin footwell spacing</p>
                    </div>
                    <span className="font-label-sm text-label-sm font-bold text-secondary px-2.5 py-1 rounded-full bg-white shadow-sm">
                      Flexible
                    </span>
                  </button>
                </div>
              </div>

              {/* Right Column: Luggage Visual Illustration (Animated Reactive Schematic) */}
              <div className="lg:col-span-7 bg-surface-container-low rounded-2xl p-6 md:p-8 flex flex-col items-center justify-center border border-surface-container">
                <div className="w-full max-w-md bg-surface-container-lowest rounded-2xl p-5 shadow-sm border border-surface-container flex flex-col justify-between relative overflow-hidden">
                  <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface-variant flex items-center gap-1.5">
                      <Icon className="text-base text-secondary">directions_car</Icon>
                      Toyota Prius 3rd Gen Hatch
                    </span>
                    <span className="font-label-sm text-label-sm font-bold bg-[#E8F8F0] text-[#008A4B] px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#008A4B] animate-pulse" />
                      445 Liters Boot Volume
                    </span>
                  </div>

                  {/* Trunk Schematic Visualization with Reactive Highlighting */}
                  <div className="grid grid-cols-2 gap-3.5 my-5">
                    {/* Checked Luggage Slot 1 */}
                    <div
                      className={`rounded-xl p-3.5 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${
                        highlightedLuggage === "checked"
                          ? "bg-[#E8F8F0] border-[#008A4B] scale-105 shadow-md"
                          : "bg-surface-container border-dashed border-outline-variant hover:border-secondary"
                      }`}
                    >
                      <Icon className="text-3xl text-secondary mb-1">luggage</Icon>
                      <span className="font-label-sm text-label-sm font-bold text-primary">Checked Luggage 1</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Up to 28” Heavy</span>
                    </div>

                    {/* Checked Luggage Slot 2 */}
                    <div
                      className={`rounded-xl p-3.5 flex flex-col items-center justify-center text-center transition-all duration-300 border-2 ${
                        highlightedLuggage === "checked"
                          ? "bg-[#E8F8F0] border-[#008A4B] scale-105 shadow-md"
                          : "bg-surface-container border-dashed border-outline-variant hover:border-secondary"
                      }`}
                    >
                      <Icon className="text-3xl text-secondary mb-1">luggage</Icon>
                      <span className="font-label-sm text-label-sm font-bold text-primary">Checked Luggage 2</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">Up to 28” Heavy</span>
                    </div>

                    {/* Carry-on and Personal Bags Layer */}
                    <div
                      className={`col-span-2 rounded-xl p-3 flex items-center justify-around text-center transition-all duration-300 border-2 ${
                        highlightedLuggage === "carryon"
                          ? "bg-[#E0F2FE] border-[#0369A1] scale-102 shadow-md"
                          : highlightedLuggage === "daypack"
                          ? "bg-[#FEF3C7] border-[#B45309] scale-102 shadow-md"
                          : "bg-surface-container-high/60 border-transparent hover:border-surface-container-high"
                      }`}
                    >
                      <div className="flex items-center gap-1.5">
                        <Icon className="text-secondary text-lg">backpack</Icon>
                        <span className="font-label-sm text-label-sm font-semibold">Carry-on 1</span>
                      </div>
                      <span className="text-on-surface-variant text-xs">+</span>
                      <div className="flex items-center gap-1.5">
                        <Icon className="text-secondary text-lg">backpack</Icon>
                        <span className="font-label-sm text-label-sm font-semibold">Carry-on 2</span>
                      </div>
                      <span className="text-on-surface-variant text-xs">+</span>
                      <div className="flex items-center gap-1.5">
                        <Icon className="text-secondary text-lg">photo_camera</Icon>
                        <span className="font-label-sm text-label-sm font-semibold">Daypack</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm pt-3 border-t border-surface-container">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-secondary"></span> 60/40 Split Seats fold for extra gear
                    </span>
                    <span className="text-primary font-bold">Max 3 Passengers + Chauffeur</span>
                  </div>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-center mt-4">
                  Need to transport surfboards, foldable wheelchairs, or baby prams? Mention it on WhatsApp for customized loading configurations.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SPECIFICATION & FEATURE COMPARISON TABLE (CEYLONDRIVE VS TAXI VS TUK-TUK)
          ========================================================================= */}
      <section className="py-14 md:py-24 bg-surface relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12 reveal-on-scroll">
            <span className="font-label-lg text-label-lg text-secondary font-bold tracking-wider uppercase inline-flex items-center gap-1.5">
              <Icon className="text-sm">balance</Icon>
              Transparent Standards
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1.5">
              Why Tour with CeylonDrive Instead of Standard Taxis?
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 leading-relaxed">
              Compare the realities of Sri Lankan transport options for long-distance international holiday travel.
            </p>
          </div>

          {/* Comparison Matrix Card with Highlighted Column */}
          <div className="bg-surface-container-lowest rounded-3xl shadow-xl overflow-hidden border border-surface-container reveal-on-scroll">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container-low text-on-surface border-b border-surface-container">
                    <th className="p-4 sm:p-6 font-title-md text-title-md font-bold w-1/4">
                      Feature &amp; Standard
                    </th>
                    <th className="p-4 sm:p-6 font-title-md text-title-md font-bold bg-primary-container text-on-primary w-1/3 relative shadow-inner">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <Icon className="text-[#25D366]">star</Icon>
                          CeylonDrive (Toyota Prius)
                        </span>
                        <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-[11px] font-bold">
                          Premium Choice
                        </span>
                      </div>
                    </th>
                    <th className="p-4 sm:p-6 font-title-md text-title-md font-semibold text-on-surface-variant w-1/4">
                      Standard Public Taxi (Sedan/Wagon)
                    </th>
                    <th className="p-4 sm:p-6 font-title-md text-title-md font-semibold text-on-surface-variant w-1/4">
                      Tuk-Tuk (Three-Wheeler)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-surface-container">
                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="p-4 sm:p-5">
                      <div className="font-label-lg text-label-lg text-primary font-bold group-hover:text-secondary transition-colors">
                        Luggage Capacity
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Space for full-size holiday suitcases</div>
                    </td>
                    <td className="p-4 sm:p-5 bg-primary-container/5 font-semibold text-primary border-x border-primary-container/10">
                      <div className="flex items-center gap-2.5">
                        <Icon className="text-[#25D366] text-xl">check_circle</Icon>
                        <span>2 Large Suitcases + 2 Carry-ons</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      Often restricted by CNG cylinders or small trunks (1 suitcase max)
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      Extremely limited (1 backpack / tight foot space)
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="p-4 sm:p-5">
                      <div className="font-label-lg text-label-lg text-primary font-bold group-hover:text-secondary transition-colors">
                        Air-Conditioning Reliability
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Climate comfort during peak noon sun</div>
                    </td>
                    <td className="p-4 sm:p-5 bg-primary-container/5 font-semibold text-primary border-x border-primary-container/10">
                      <div className="flex items-center gap-2.5">
                        <Icon className="text-[#25D366] text-xl">check_circle</Icon>
                        <span>Continuous Dual Digital AC Guaranteed</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      Inconsistent cooling; some charge extra fees for continuous AC
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      No AC (Exposed to traffic exhaust, dust &amp; rain)
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="p-4 sm:p-5">
                      <div className="font-label-lg text-label-lg text-primary font-bold group-hover:text-secondary transition-colors">
                        Expressway &amp; Highway Cruise
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Permitted on E01 / E02 expressways</div>
                    </td>
                    <td className="p-4 sm:p-5 bg-primary-container/5 font-semibold text-primary border-x border-primary-container/10">
                      <div className="flex items-center gap-2.5">
                        <Icon className="text-[#25D366] text-xl">check_circle</Icon>
                        <span>100 km/h Smooth Expressway Tolls Included</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      Permitted, but highway toll tickets often demanded in extra cash
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      <span className="text-error font-semibold flex items-center gap-1">
                        <Icon className="text-base">cancel</Icon> Strictly Forbidden on Expressways
                      </span>
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="p-4 sm:p-5">
                      <div className="font-label-lg text-label-lg text-primary font-bold group-hover:text-secondary transition-colors">
                        Safety &amp; Airbag Protection
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Defensive engineering &amp; passenger safety</div>
                    </td>
                    <td className="p-4 sm:p-5 bg-primary-container/5 font-semibold text-primary border-x border-primary-container/10">
                      <div className="flex items-center gap-2.5">
                        <Icon className="text-[#25D366] text-xl">check_circle</Icon>
                        <span>8 Airbags + ABS + VSC Stability</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      Typically 1–2 airbags only; varying maintenance levels
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      Zero safety cabin / high rollover vulnerability
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="p-4 sm:p-5">
                      <div className="font-label-lg text-label-lg text-primary font-bold group-hover:text-secondary transition-colors">
                        Driver English &amp; Guide Certified
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Communication, history &amp; seamless routing</div>
                    </td>
                    <td className="p-4 sm:p-5 bg-primary-container/5 font-semibold text-primary border-x border-primary-container/10">
                      <div className="flex items-center gap-2.5">
                        <Icon className="text-[#25D366] text-xl">check_circle</Icon>
                        <span>Fluent English + SLTDA Chauffeur Guide</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      Basic phrases; often requires translation apps
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      Unpredictable; risk of high-pressure tourist shops
                    </td>
                  </tr>

                  <tr className="hover:bg-surface-container-low/60 transition-colors group">
                    <td className="p-4 sm:p-5">
                      <div className="font-label-lg text-label-lg text-primary font-bold group-hover:text-secondary transition-colors">
                        Pricing Transparency
                      </div>
                      <div className="font-body-sm text-body-sm text-on-surface-variant">Fuel, parking &amp; driver accommodation</div>
                    </td>
                    <td className="p-4 sm:p-5 bg-primary-container/5 font-semibold text-primary border-x border-primary-container/10">
                      <div className="flex items-center gap-2.5">
                        <Icon className="text-[#25D366] text-xl">check_circle</Icon>
                        <span>100% Fixed (All Tolls, Parking &amp; Fuel Included)</span>
                      </div>
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      Frequent requests for fuel adjustments or extra tip claims
                    </td>
                    <td className="p-4 sm:p-5 text-on-surface-variant font-body-md">
                      Meters often “broken” or inflated tourist rates
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR SERVICE COMMITMENTS (4 PILLARS WITH HOVER LIFTS & ICON POPS)
          ========================================================================= */}
      <section className="py-14 md:py-20 bg-surface-container-low border-b border-surface-container">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 reveal-on-scroll">
            <span className="font-label-lg text-label-lg text-secondary font-bold tracking-wider uppercase inline-flex items-center gap-1.5">
              <Icon className="text-sm">verified</Icon>
              Our Unwavering Standards
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary tracking-tight mt-1.5">
              The 4 Pillars of CeylonDrive
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div
              className="bg-surface-container-lowest p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col items-start hover:-translate-y-2.5 hover:shadow-xl hover:border-secondary/20 border border-transparent transition-all duration-300 group reveal-on-scroll relative overflow-hidden"
              style={{ transitionDelay: "0ms" }}
            >
              <div className="shine-effect" />
              <div className="w-13 h-13 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                <Icon className="text-2xl">health_and_safety</Icon>
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors">
                1. Safety First
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Defensive driving discipline at every mile. We strictly avoid high-risk maneuvers, aggressive bus chases, or driving while fatigued.
              </p>
            </div>

            {/* Pillar 2 */}
            <div
              className="bg-surface-container-lowest p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col items-start hover:-translate-y-2.5 hover:shadow-xl hover:border-secondary/20 border border-transparent transition-all duration-300 group reveal-on-scroll relative overflow-hidden"
              style={{ transitionDelay: "100ms" }}
            >
              <div className="shine-effect" />
              <div className="w-13 h-13 rounded-2xl bg-secondary-container text-on-secondary-container flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                <Icon className="text-2xl">receipt_long</Icon>
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors">
                2. Zero Hidden Fees
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Your agreed price covers everything: expressway tokens, chauffeur food/quarters, petrol, and parking permits without surprise additions.
              </p>
            </div>

            {/* Pillar 3 */}
            <div
              className="bg-surface-container-lowest p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col items-start hover:-translate-y-2.5 hover:shadow-xl hover:border-secondary/20 border border-transparent transition-all duration-300 group reveal-on-scroll relative overflow-hidden"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="shine-effect" />
              <div className="w-13 h-13 rounded-2xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                <Icon className="text-2xl">alt_route</Icon>
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors">
                3. Fluid Itineraries
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Spontaneous travel creates the best memories. You decide when to sleep in, when to stop for fresh papaya juice, or where to admire the view.
              </p>
            </div>

            {/* Pillar 4 */}
            <div
              className="bg-surface-container-lowest p-6 sm:p-7 rounded-3xl shadow-sm flex flex-col items-start hover:-translate-y-2.5 hover:shadow-xl hover:border-secondary/20 border border-transparent transition-all duration-300 group reveal-on-scroll relative overflow-hidden"
              style={{ transitionDelay: "300ms" }}
            >
              <div className="shine-effect" />
              <div className="w-13 h-13 rounded-2xl bg-surface-container-high text-on-surface flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-md">
                <Icon className="text-2xl">support_agent</Icon>
              </div>
              <h3 className="font-title-md text-title-md text-primary font-bold mb-2 group-hover:text-secondary transition-colors">
                4. 24/7 Availability
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Midnight airport arrival or pre-dawn Sigiriya Lion Rock hike departure? {DRIVER_INFO.name.split(" ")[0]} is always reachable directly via WhatsApp with zero intermediaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAUFFEUR DIRECT WHATSAPP CONSULTATION CARD (HERO CTA WITH GLOW)
          ========================================================================= */}
      <section className="py-14 md:py-24 bg-surface relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-primary-container text-on-primary-fixed rounded-3xl p-8 md:p-14 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-white/10 reveal-scale">
            {/* Atmospheric Animated Background Glows */}
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
                <span className="font-label-sm text-label-sm text-tertiary-fixed font-bold uppercase tracking-wider">
                  Direct WhatsApp Access
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-surface-bright tracking-tight leading-tight">
                Have Questions About Mountain Road Times or Luggage Fit?
              </h2>
              <p className="font-body-md text-body-md text-inverse-primary leading-relaxed">
                Skip bureaucratic email booking forms. Send your flight details, travel dates, or questions straight to Chauffeur {DRIVER_INFO.name.split(" ")[0]} on WhatsApp for an immediate, customized quote and expert local advice.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-surface-bright font-label-sm text-label-sm pt-2">
                <span className="flex items-center gap-1.5">
                  <Icon className="text-[#25D366] text-base">timer</Icon> Reply within 10 minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon className="text-[#25D366] text-base">lock_open</Icon> No credit card pre-payment needed
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 w-full sm:w-auto relative z-10">
              <a
                className="inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-full bg-[#25D366] text-white font-label-lg text-label-lg font-bold shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:brightness-110 active:scale-95 transition-all text-center whatsapp-pulse hover:scale-105 duration-200"
                href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I%20have%20a%20question%20about%20your%20Toyota%20Prius%20and%20Sri%20Lanka%20itinerary`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon className="text-2xl">chat</Icon>
                <span>Text {DRIVER_INFO.name.split(" ")[0]} on WhatsApp</span>
              </a>
              <Link
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-high/20 hover:bg-surface-container-high/30 text-surface-bright font-label-md text-label-md font-semibold transition-all text-center group hover:scale-105 active:scale-95 duration-200 border border-white/10"
                to="/contact-booking"
              >
                <Icon className="text-lg">calculate</Icon>
                <span>Calculate Route Fare First</span>
                <Icon className="text-base group-hover:translate-x-1 transition-transform">arrow_forward</Icon>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
