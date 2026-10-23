import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DRIVER_INFO } from "../data/constants";
import Icon from "../components/Icon";

const TESTIMONIALS = [
  {
    quote:
      "Harindu was waiting for us at Colombo Airport at 1:30 AM with a warm smile and cold water. His Prius was immaculate and the drive to Galle Fort was so calm and relaxing after a 12-hour flight. Highly recommended!",
    author: "Charlotte & Oliver M.",
    location: "London, United Kingdom",
    countryCode: "UK",
  },
  {
    quote:
      "We booked Harindu for an 8-day island tour through Sigiriya, Kandy, and Ella. He drove with tremendous care on mountain curves and showed us incredible local food spots we never would have discovered alone.",
    author: "Dr. Markus Weber",
    location: "Munich, Germany",
    countryCode: "DE",
  },
  {
    quote:
      "Super reliable and 100% upfront on price. No surprise toll fees or detours to commission shops. Harindu is a genuine gentleman and the Prius has great AC and comfortable back seats.",
    author: "Liam & Sarah Hughes",
    location: "Melbourne, Australia",
    countryCode: "AU",
  },
  {
    quote:
      "Flawless chauffeur service from start to finish! Harindu arranged our Sigiriya early sunrise hike with zero stress and guided us through the tea estates of Nuwara Eliya. The hybrid ride was whisper quiet and ultra smooth.",
    author: "Elena Rostova",
    location: "Zurich, Switzerland",
    countryCode: "CH",
  },
  {
    quote:
      "Traveling with two young kids and heavy luggage can be daunting, but Harindu made our Sri Lanka trip so effortless. His driving is exceptionally safe and he was always 15 minutes ahead of schedule. Truly 5 stars!",
    author: "David & Rachel Miller",
    location: "Toronto, Canada",
    countryCode: "CA",
  },
  {
    quote:
      "Harindu took us down the Southern coast to Mirissa and Weligama. He knows all the best coconut stands, scenic stops, and avoided all traffic bottlenecks. Booking via WhatsApp was instant and easy.",
    author: "Julien & Chloé Mercier",
    location: "Paris, France",
    countryCode: "FR",
  },
];

export default function Home() {
  const [pickup, setPickup] = useState("BIA Airport (Katunayake)");
  const [dropoff, setDropoff] = useState("Colombo / Negombo");
  const [travelDate, setTravelDate] = useState("");
  const [passengers, setPassengers] = useState("1-2 Guests (3 Large Bags)");
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch(() => {
        // Safe fallback if browser restricts autoplay
      });
    }
  }, []);

  // Professional minimal scroll-triggered reveal
  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal-on-scroll").forEach((el) => el.classList.add("is-revealed"));
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

    const elements = document.querySelectorAll(".reveal-on-scroll");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const routePricing = useMemo(
    () => ({
      "BIA Airport (Katunayake)-Colombo / Negombo": "$35 (LKR 10,500)",
      "BIA Airport (Katunayake)-Kandy & Peradeniya": "$65 (LKR 19,500)",
      "BIA Airport (Katunayake)-Sigiriya & Dambulla": "$80 (LKR 24,000)",
      "BIA Airport (Katunayake)-Galle & Mirissa": "$75 (LKR 22,500)",
      "BIA Airport (Katunayake)-Ella & Nuwara Eliya": "$95 (LKR 28,500)",
      "BIA Airport (Katunayake)-Custom Island Tour": "From $90/Day",
      "Colombo City / Fort-Sigiriya & Dambulla": "$75 (LKR 22,500)",
      "Colombo City / Fort-Galle & Mirissa": "$65 (LKR 19,500)",
      "Colombo City / Fort-Kandy & Peradeniya": "$60 (LKR 18,000)",
      "Colombo City / Fort-Ella & Nuwara Eliya": "$90 (LKR 27,000)",
      "Colombo City / Fort-Colombo / Negombo": "$30 (LKR 9,000)",
      "Colombo City / Fort-Custom Island Tour": "From $90/Day",
    }),
    []
  );

  const estimatedFare = useMemo(() => {
    const key = `${pickup}-${dropoff}`;
    return routePricing[key] || "$45 – $85 (Route Custom)";
  }, [pickup, dropoff, routePricing]);

  const whatsappHref = useMemo(() => {
    const dateText = travelDate || "Upcoming Date";
    const message = `Hello Harindu, I would like to inquire about a ride with CeylonDrive:
• Pickup: ${pickup}
• Destination: ${dropoff}
• Date: ${dateText}
• Passengers: ${passengers}
• Estimated Fare: ${estimatedFare}`;
    return `https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=${encodeURIComponent(
      message
    )}`;
  }, [pickup, dropoff, travelDate, passengers, estimatedFare]);

  return (
    <div className="flex flex-col w-full">
      {/* HERO SECTION WITH SCENIC OVERLAY & PRIUS SHOWCASE */}
      <section className="relative w-full min-h-[70vh] lg:min-h-[82vh] flex flex-col justify-between overflow-hidden bg-primary-container text-on-primary">
        {/* Background Video with Fallback Poster */}
        <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="/images/vehicle-prius.jpg"
            className="w-full h-full object-cover"
          >
            <source src="/images/hero-scenic.mp4" type="video/mp4" />
          </video>
          {/* Balanced Contrast & Vignette Overlays for Maximum Prius Visibility + Crisp Text Legibility */}
          <div className="absolute inset-0 bg-primary-container/25"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-primary-container/80 via-transparent to-primary-container/90"></div>
        </div>

        {/* Atmospheric Ambient Glows */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none animate-ambient-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-tertiary-fixed-dim/10 blur-3xl pointer-events-none animate-ambient-pulse" style={{ animationDelay: "4s" }}></div>

        {/* Hero Content: Centered Headline & Action Triggers */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-8 flex flex-col items-center text-center my-auto">
          {/* Trust Rating Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-surface-bright shadow-sm mb-6 border border-white/10 animate-fade-in-down animation-delay-100 hover:scale-105 transition-all duration-300">
            <span className="flex items-center text-secondary-container text-sm">
              <Icon className="text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</Icon>
              <Icon className="text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</Icon>
              <Icon className="text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</Icon>
              <Icon className="text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</Icon>
              <Icon className="text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</Icon>
            </span>
            <span className="font-label-md text-label-md font-semibold tracking-wide">
              4.98/5 Rated by 420+ Global Travelers
            </span>
            <span className="hidden sm:inline text-surface-container-highest/40">•</span>
            <span className="hidden sm:inline font-label-sm text-label-sm text-inverse-primary">
              TripAdvisor &amp; Google Verified
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display-lg text-display-lg text-surface-bright max-w-4xl tracking-tight leading-tight drop-shadow-md animate-fade-in-up animation-delay-200">
            Explore Sri Lanka in <span className="text-secondary-fixed">Comfort &amp; Uncompromised Style</span>
          </h1>
          <p className="font-body-lg text-body-lg text-inverse-primary max-w-2xl mt-5 mb-8 leading-relaxed drop-shadow animate-fade-in-up animation-delay-300">
            Private Airport Transfers, Custom Island Tours &amp; Intercity Chauffeur Services in a pristine hybrid vehicle with your trusted local guide.
          </p>

          {/* Quick Hero Actions */}
          <div className="flex flex-wrap items-center justify-center gap-4 animate-fade-in-up animation-delay-400">
            <a
              href="#plan-journey"
              className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-secondary-container text-on-secondary-container hover:bg-secondary-container/90 font-label-lg text-label-lg font-bold shadow-lg hover:shadow-secondary-container/30 transition-all hover:scale-105 active:scale-95 duration-200"
            >
              <Icon className="text-xl">commute</Icon>
              Plan Your Journey
            </a>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-surface-bright border border-white/20 hover:bg-surface-container-lowest/25 font-label-lg text-label-lg font-semibold transition-all hover:scale-105 active:scale-95 duration-200"
            >
              <Icon name="whatsapp" className="text-tertiary-fixed text-lg" />
              Book via WhatsApp
            </a>
          </div>
        </div>

        {/* Scroll Indicator Prompt to Journey Planner */}
        <div className="relative z-10 pb-6 flex justify-center animate-fade-in-up animation-delay-500">
          <a
            href="#plan-journey"
            className="inline-flex flex-col items-center gap-1 text-surface-bright/80 hover:text-surface-bright transition-colors group cursor-pointer"
            aria-label="Scroll to Journey Planner"
          >
            <span className="font-label-sm text-label-sm uppercase tracking-widest text-[11px] font-semibold text-inverse-primary group-hover:text-surface-bright transition-colors">
              Plan Your Journey Below
            </span>
            <Icon className="text-2xl group-hover:translate-y-1.5 transition-transform animate-bounce text-secondary-fixed">keyboard_arrow_down</Icon>
          </a>
        </div>
      </section>

      {/* PLAN YOUR JOURNEY BOOKING SECTION (MOVED DOWN FOR PRIUS VIDEO VISIBILITY) */}
      <section id="plan-journey" className="relative w-full bg-surface-container-low/70 py-12 lg:py-16 border-b border-surface-container-high/60 scroll-mt-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 reveal-on-scroll">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Instant Route Estimator
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1 tracking-tight">
              Plan Your Journey
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto mt-2">
              Select your pickup, drop-off destination, and travel details to get an instant all-inclusive flat quote for your private Prius hybrid ride.
            </p>
          </div>

          {/* Instant Rate Estimation & Booking Form */}
          <div className="w-full bg-surface-container-lowest rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-500 p-4 sm:p-6 lg:p-8 text-on-surface text-left border border-surface-container-high/40 reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
            <div className="flex items-center justify-between pb-4 mb-6 bg-surface-container-low px-4 py-3 rounded-xl">
              <div className="flex items-center gap-2">
                <Icon className="text-secondary font-bold">commute</Icon>
                <span className="font-headline-sm text-headline-sm text-on-surface">Plan Your Journey</span>
              </div>
              <span className="font-label-sm text-label-sm px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-semibold">
                All-Inclusive Flat Quotes
              </span>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4" onSubmit={(e) => e.preventDefault()}>
              {/* Pickup Location */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-semibold" htmlFor="home-pickup">
                  <Icon className="text-xs text-secondary">my_location</Icon> Pick-up Location
                </label>
                <div className="relative">
                  <select
                    id="home-pickup"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:outline-none focus:bg-surface-container-lowest border border-transparent hover:border-secondary/30 focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all duration-200"
                  >
                    <option value="BIA Airport (Katunayake)">BIA Colombo Airport (Katunayake)</option>
                    <option value="Colombo City / Fort">Colombo City Center</option>
                    <option value="Negombo Beach">Negombo Beach</option>
                    <option value="Kandy City">Kandy Cultural Hub</option>
                    <option value="Galle Fort">Galle Fort</option>
                  </select>
                  <Icon className="absolute right-3 top-3.5 text-on-surface-variant pointer-events-none text-base">expand_more</Icon>
                </div>
              </div>

              {/* Drop-off Destination */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-semibold" htmlFor="home-dropoff">
                  <Icon className="text-xs text-secondary">pin_drop</Icon> Drop-off Destination
                </label>
                <div className="relative">
                  <select
                    id="home-dropoff"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:outline-none focus:bg-surface-container-lowest border border-transparent hover:border-secondary/30 focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all duration-200"
                  >
                    <option value="Colombo / Negombo">Colombo Central / Negombo</option>
                    <option value="Sigiriya &amp; Dambulla">Sigiriya &amp; Dambulla (Cultural Triangle)</option>
                    <option value="Kandy &amp; Peradeniya">Kandy &amp; Temple of the Tooth</option>
                    <option value="Galle &amp; Mirissa">Galle, Mirissa &amp; Weligama Coast</option>
                    <option value="Ella &amp; Nuwara Eliya">Ella &amp; Nuwara Eliya (Tea Highlands)</option>
                    <option value="Custom Island Tour">Custom Multi-Day Tour Itinerary</option>
                  </select>
                  <Icon className="absolute right-3 top-3.5 text-on-surface-variant pointer-events-none text-base">expand_more</Icon>
                </div>
              </div>

              {/* Travel Date */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-semibold" htmlFor="home-date">
                  <Icon className="text-xs text-secondary">calendar_month</Icon> Travel Date &amp; Flight
                </label>
                <input
                  id="home-date"
                  type="date"
                  value={travelDate}
                  onChange={(e) => setTravelDate(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest border border-transparent hover:border-secondary/30 focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all duration-200"
                />
              </div>

              {/* Passengers & Luggage */}
              <div className="flex flex-col gap-1.5">
                <label className="font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1 font-semibold" htmlFor="home-passengers">
                  <Icon className="text-xs text-secondary">group</Icon> Travelers &amp; Luggage
                </label>
                <div className="relative">
                  <select
                    id="home-passengers"
                    value={passengers}
                    onChange={(e) => setPassengers(e.target.value)}
                    className="w-full px-3.5 py-3 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md appearance-none focus:outline-none focus:bg-surface-container-lowest border border-transparent hover:border-secondary/30 focus:border-secondary focus:ring-2 focus:ring-secondary/15 transition-all duration-200"
                  >
                    <option value="1-2 Guests (3 Large Bags)">1 - 2 Guests (3 Large Bags)</option>
                    <option value="3 Guests (2 Large + 2 Small)">3 Guests (2 Large + 2 Small)</option>
                    <option value="4 Guests (Light Luggage)">4 Guests (Light Bags)</option>
                  </select>
                  <Icon className="absolute right-3 top-3.5 text-on-surface-variant pointer-events-none text-base">expand_more</Icon>
                </div>
              </div>
            </form>

            {/* CTA & Quick Estimator Ribbon */}
            <div className="mt-6 pt-5 bg-surface-container rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-primary">
                  <Icon className="text-xl">bolt</Icon>
                </div>
                <div>
                  <p className="font-label-md text-label-md text-on-surface font-bold">
                    Estimated Fixed Rate:{" "}
                    <span
                      key={estimatedFare}
                      className="inline-block animate-price-pop text-secondary font-bold"
                    >
                      {estimatedFare}
                    </span>
                  </p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    Includes airport expressway tolls, fuel, vehicle AC &amp; luggage assistance.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <a
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-primary-container text-on-primary hover:bg-primary font-label-lg text-label-lg font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                  href={whatsappHref}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon name="whatsapp" className="text-tertiary-fixed text-lg" />
                  Book via WhatsApp
                </a>
                <Link
                  className="flex-1 md:flex-none inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-full bg-surface-container-high text-on-surface hover:bg-surface-container-highest font-label-lg text-label-lg font-semibold hover:scale-105 active:scale-95 transition-all duration-200"
                  to="/services-tours"
                >
                  <Icon className="text-base">travel_explore</Icon>
                  Tour Packages
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST SIGNALS RIBBON */}
      <section className="w-full bg-surface-container-lowest shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low group hover:bg-surface-container hover:-translate-y-1 hover:shadow-md transition-all duration-300 reveal-on-scroll">
              <div className="p-2.5 rounded-lg bg-surface-container-highest text-secondary shrink-0 group-hover:scale-110 group-hover:bg-secondary/10 transition-all duration-300">
                <Icon className="text-2xl">flight_land</Icon>
              </div>
              <div>
                <h4 className="font-label-lg text-label-lg font-bold text-on-surface">24/7 Airport Meet &amp; Greet</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Flight delays tracked live; personalized placard greeting at arrivals.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low group hover:bg-surface-container hover:-translate-y-1 hover:shadow-md transition-all duration-300 reveal-on-scroll" style={{ transitionDelay: "80ms" }}>
              <div className="p-2.5 rounded-lg bg-surface-container-highest text-secondary shrink-0 group-hover:scale-110 group-hover:bg-secondary/10 transition-all duration-300">
                <Icon className="text-2xl">receipt_long</Icon>
              </div>
              <div>
                <h4 className="font-label-lg text-label-lg font-bold text-on-surface">100% Fixed Transparent Fares</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Zero hidden expressway toll fees, fuel surcharges, or night fees.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low group hover:bg-surface-container hover:-translate-y-1 hover:shadow-md transition-all duration-300 reveal-on-scroll" style={{ transitionDelay: "160ms" }}>
              <div className="p-2.5 rounded-lg bg-surface-container-highest text-secondary shrink-0 group-hover:scale-110 group-hover:bg-secondary/10 transition-all duration-300">
                <Icon className="text-2xl">verified_user</Icon>
              </div>
              <div>
                <h4 className="font-label-lg text-label-lg font-bold text-on-surface">SLTDA Certified Guide</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Fluent English, 12+ years experience in cultural and scenic heritage.</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-xl bg-surface-container-low group hover:bg-surface-container hover:-translate-y-1 hover:shadow-md transition-all duration-300 reveal-on-scroll" style={{ transitionDelay: "240ms" }}>
              <div className="p-2.5 rounded-lg bg-surface-container-highest text-secondary shrink-0 group-hover:scale-110 group-hover:bg-secondary/10 transition-all duration-300">
                <Icon className="text-2xl">energy_savings_leaf</Icon>
              </div>
              <div>
                <h4 className="font-label-lg text-label-lg font-bold text-on-surface">Eco Hybrid Prius Comfort</h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">Smooth, chilled dual-AC cabin fitting up to 3 large suitcases.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US (FEATURE GRID) */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 reveal-on-scroll">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Uncompromising Quality</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 tracking-tight">
              Why Travelers Trust CeylonDrive
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md mt-4 md:mt-0">
            Navigating foreign roads can be stressful. We ensure every kilometer is serene, punctual, and safe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-transparent hover:border-secondary/20 transition-all duration-300 group reveal-on-scroll">
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary/10 transition-all duration-300">
              <Icon className="text-2xl">ac_unit</Icon>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Whisper-Quiet Hybrid</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Pristine 3rd Gen Toyota Prius offering velvet suspension, ice-cold digital climate control, and supreme ride silence through mountain turns.
            </p>
            <div className="mt-6 pt-4 bg-surface-container-low rounded-lg p-3 group-hover:bg-surface-container transition-colors duration-300">
              <span className="font-label-sm text-label-sm font-semibold text-on-surface flex items-center gap-1.5">
                <Icon className="text-xs text-secondary-container">luggage</Icon> 3 Large Suitcases + Carry-ons
              </span>
            </div>
          </div>

          <div className="flex flex-col bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-transparent hover:border-secondary/20 transition-all duration-300 group reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary/10 transition-all duration-300">
              <Icon className="text-2xl">health_and_safety</Icon>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">12+ Years Safe Driving</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Mastery over Sri Lanka's steep hairpins, misty tea plantation passes, and southern expressways. Defensive driving guarantees total passenger relaxation.
            </p>
            <div className="mt-6 pt-4 bg-surface-container-low rounded-lg p-3 group-hover:bg-surface-container transition-colors duration-300">
              <span className="font-label-sm text-label-sm font-semibold text-on-surface flex items-center gap-1.5">
                <Icon className="text-xs text-secondary-container">check_circle</Icon> 100% Incident-Free Record
              </span>
            </div>
          </div>

          <div className="flex flex-col bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-transparent hover:border-secondary/20 transition-all duration-300 group reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary/10 transition-all duration-300">
              <Icon className="text-2xl">price_check</Icon>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Fixed All-Inclusive Fares</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Honest flat pricing agreed beforehand. No meter surprises, sudden tipping obligations, or driver meal/room supplements requested on the route.
            </p>
            <div className="mt-6 pt-4 bg-surface-container-low rounded-lg p-3 group-hover:bg-surface-container transition-colors duration-300">
              <span className="font-label-sm text-label-sm font-semibold text-on-surface flex items-center gap-1.5">
                <Icon className="text-xs text-secondary-container">toll</Icon> Expressway Tickets Included
              </span>
            </div>
          </div>

          <div className="flex flex-col bg-surface-container-lowest p-6 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-transparent hover:border-secondary/20 transition-all duration-300 group reveal-on-scroll" style={{ transitionDelay: "300ms" }}>
            <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-secondary mb-6 group-hover:scale-110 group-hover:bg-secondary/10 transition-all duration-300">
              <Icon className="text-2xl">schedule</Icon>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Guaranteed BIA Pickups</h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
              Late-night or dawn landing? We monitor actual flight arrival times and wait inside Katunayake terminal lobby with your name sign at no penalty.
            </p>
            <div className="mt-6 pt-4 bg-surface-container-low rounded-lg p-3 group-hover:bg-surface-container transition-colors duration-300">
              <span className="font-label-sm text-label-sm font-semibold text-on-surface flex items-center gap-1.5">
                <Icon className="text-xs text-secondary-container">timer</Icon> 60-Minute Free Waiting Window
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* QUICK SERVICES OVERVIEW */}
      <section className="w-full bg-surface-container-low py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 reveal-on-scroll">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Tailored Transport</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 tracking-tight">
              Flexible Chauffeur Services For Every Traveler
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-3">
              Whether you need a swift airport drop, an authentic day trip, or a multi-week expedition across ancient fortresses.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service Card 1 */}
            <div className="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-secondary/15 transition-all duration-400 group reveal-on-scroll">
              <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url('/images/service-airport.jpg')`,
                  }}
                ></div>
                <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full font-label-sm text-label-sm font-bold text-on-surface hover:scale-105 transition-transform duration-200">
                  Airport Transfers
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">BIA Katunayake Transfers</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed flex-1">
                  Direct, air-conditioned express journeys from the airport terminal to Colombo, Negombo, Galle, or central resorts without bargaining or bus hassles.
                </p>
                <ul className="my-5 flex flex-col gap-2 font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-center gap-2">
                    <Icon className="text-secondary text-base">check</Icon> Live Flight Tracking Included
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon className="text-secondary text-base">check</Icon> Direct Expressway Highway Routes
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon className="text-secondary text-base">check</Icon> Bottle of Fresh Water Provided
                  </li>
                </ul>
                <a
                  className="w-full py-3 rounded-xl bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface text-center font-label-md text-label-md font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I%20need%20an%20Airport%20Transfer%20quote`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Inquire Airport Pickup
                </a>
              </div>
            </div>

            {/* Service Card 2 */}
            <div className="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-secondary/15 transition-all duration-400 group reveal-on-scroll" style={{ transitionDelay: "120ms" }}>
              <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url('/images/service-multiday.jpg')`,
                  }}
                ></div>
                <div className="absolute top-4 left-4 bg-secondary text-on-secondary px-3 py-1 rounded-full font-label-sm text-label-sm font-bold hover:scale-105 transition-transform duration-200">
                  Most Popular
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Multi-Day Island Tours</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed flex-1">
                  5 to 14 days of tailor-made Sri Lankan discovery. Explore ancient ruins, lush tea hills, wildlife safaris, and pristine beaches with your private car and driver.
                </p>
                <ul className="my-5 flex flex-col gap-2 font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-center gap-2">
                    <Icon className="text-secondary text-base">check</Icon> Custom Day-by-Day Itineraries
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon className="text-secondary text-base">check</Icon> Driver Room &amp; Meals Covered
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon className="text-secondary text-base">check</Icon> Authentic Curated Food Stops
                  </li>
                </ul>
                <a
                  className="w-full py-3 rounded-xl bg-primary-container text-on-primary hover:bg-primary text-center font-label-md text-label-md font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I'm%20interested%20in%20a%20Multi-Day%20Sri%20Lanka%20Tour`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Plan Multi-Day Trip
                </a>
              </div>
            </div>

            {/* Service Card 3 */}
            <div className="flex flex-col bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-2 border border-transparent hover:border-secondary/15 transition-all duration-400 group reveal-on-scroll" style={{ transitionDelay: "240ms" }}>
              <div className="relative h-56 w-full overflow-hidden bg-surface-container">
                <div
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url('/images/service-daytrips.jpg')`,
                  }}
                ></div>
                <div className="absolute top-4 left-4 bg-surface-container-lowest/90 backdrop-blur-md px-3 py-1 rounded-full font-label-sm text-label-sm font-bold text-on-surface hover:scale-105 transition-transform duration-200">
                  Day Excursions
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Day Trips &amp; Intercity Transit</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed flex-1">
                  Spontaneous day trips to Galle Fort, Sigiriya, Kandy, or relaxed Colombo city loops with freedom to pause for fresh king coconut water along the way.
                </p>
                <ul className="my-5 flex flex-col gap-2 font-body-sm text-body-sm text-on-surface">
                  <li className="flex items-center gap-2">
                    <Icon className="text-secondary text-base">check</Icon> Flexible Photo &amp; Refreshment Pauses
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon className="text-secondary text-base">check</Icon> Direct Door-to-Door Hotel Drop
                  </li>
                  <li className="flex items-center gap-2">
                    <Icon className="text-secondary text-base">check</Icon> Transparent Flat Day Rates
                  </li>
                </ul>
                <a
                  className="w-full py-3 rounded-xl bg-surface-container-high hover:bg-primary hover:text-on-primary text-on-surface text-center font-label-md text-label-md font-bold hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                  href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I%20would%20like%20to%20book%20a%20Day%20Trip`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Book a Day Excursion
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURED TOUR PACKAGES & POPULAR TRANSFERS */}
      <section className="w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 reveal-on-scroll">
          <div>
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Popular Routes</span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-2 tracking-tight">
              Curated Fixed-Fare Itineraries
            </h2>
          </div>
          <div className="flex items-center gap-2 mt-4 md:mt-0 font-label-sm text-label-sm text-on-surface-variant bg-surface-container px-3 py-1.5 rounded-full hover:bg-surface-container-high transition-colors duration-200">
            <Icon className="text-base text-secondary">info</Icon>
            Tolls &amp; Fuel Included in All Prices
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Route A */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1.5 border border-transparent hover:border-secondary/20 transition-all duration-300 group reveal-on-scroll">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold group-hover:bg-surface-container-high transition-colors duration-200">
                  Airport Transfer • 45 - 60 min
                </span>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">From $35</span>
                  <span className="block font-body-sm text-body-sm text-on-surface-variant">LKR 10,500</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">BIA Airport ⇄ Colombo / Negombo</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Smooth transit via the Katunayake Expressway directly to your hotel. Includes personal terminal arrival greeting, luggage help, and zero highway toll extra fees.
              </p>
              <div className="flex flex-wrap gap-2 my-5">
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">BIA Terminal</span>
                <span className="text-on-surface-variant">→</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Expressway</span>
                <span className="text-on-surface-variant">→</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Colombo / Negombo Hotel</span>
              </div>
            </div>
            <div className="pt-4 bg-surface-container-low rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Prius Hybrid (1-4 Guests)</span>
              <a
                className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-bold hover:underline group/btn"
                href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I'd%20like%20to%20book%20the%20Airport-Colombo/Negombo%20Transfer%20($35)`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Reserve Transfer <Icon className="text-sm group-hover/btn:translate-x-1.5 transition-transform duration-200">arrow_forward</Icon>
              </a>
            </div>
          </div>

          {/* Route B */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1.5 border border-transparent hover:border-secondary/20 transition-all duration-300 group reveal-on-scroll" style={{ transitionDelay: "100ms" }}>
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold group-hover:bg-surface-container-high transition-colors duration-200">
                  Cultural Drive • 3h 30m
                </span>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">From $65</span>
                  <span className="block font-body-sm text-body-sm text-on-surface-variant">LKR 19,500</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Airport / Colombo ⇄ Kandy Cultural Capital</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Ascend into the rolling green foothills. Includes optional scenic pauses at Pinnawala Elephant sanctuary and spice gardens before reaching the Temple of the Sacred Tooth.
              </p>
              <div className="flex flex-wrap gap-2 my-5">
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Colombo</span>
                <span className="text-on-surface-variant">→</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Pinnawala</span>
                <span className="text-on-surface-variant">→</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Kandy Lake &amp; Temple</span>
              </div>
            </div>
            <div className="pt-4 bg-surface-container-low rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Scenic Route with Stops</span>
              <a
                className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-bold hover:underline group/btn"
                href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I'd%20like%20to%20book%20the%20Colombo-Kandy%20Transfer%20($65)`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Reserve Transfer <Icon className="text-sm group-hover/btn:translate-x-1.5 transition-transform duration-200">arrow_forward</Icon>
              </a>
            </div>
          </div>

          {/* Route C */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1.5 border border-transparent hover:border-secondary/20 transition-all duration-300 group reveal-on-scroll" style={{ transitionDelay: "200ms" }}>
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                  Multi-Day • Flexible Days
                </span>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">From $90 / day</span>
                  <span className="block font-body-sm text-body-sm text-on-surface-variant">All-Inclusive Car + Chauffeur</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">Sigiriya, Dambulla &amp; Ella Hill Circuit</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                The quintessential island journey. Sigiriya Rock Fortress, Dambulla Cave Temple, Nuwara Eliya tea hills, and Nine Arches Bridge in Ella with dedicated chauffeur guide on demand.
              </p>
              <div className="flex flex-wrap gap-2 my-5">
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Sigiriya</span>
                <span className="text-on-surface-variant">→</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Nuwara Eliya</span>
                <span className="text-on-surface-variant">→</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Ella Train Bridge</span>
              </div>
            </div>
            <div className="pt-4 bg-surface-container-low rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Includes Driver Stays &amp; Fuel</span>
              <a
                className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-bold hover:underline group/btn"
                href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I'm%20interested%20in%20the%20Cultural%20Triangle%20&%20Hill%20Country%20Circuit%20($90/day)`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Build Itinerary <Icon className="text-sm group-hover/btn:translate-x-1.5 transition-transform duration-200">arrow_forward</Icon>
              </a>
            </div>
          </div>

          {/* Route D */}
          <div className="bg-surface-container-lowest rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-sm hover:shadow-lg hover:-translate-y-1.5 border border-transparent hover:border-secondary/20 transition-all duration-300 group reveal-on-scroll" style={{ transitionDelay: "300ms" }}>
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-label-sm text-label-sm font-semibold group-hover:bg-surface-container-high transition-colors duration-200">
                  Southern Express • 2h - 2h 30m
                </span>
                <div className="text-right">
                  <span className="font-headline-sm text-headline-sm text-secondary font-bold">From $75</span>
                  <span className="block font-body-sm text-body-sm text-on-surface-variant">LKR 22,500</span>
                </div>
              </div>
              <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2">BIA / Colombo ⇄ Galle, Mirissa &amp; Weligama</h3>
              <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                Swift transit directly along the Southern Expressway to historic Galle Fort, whale-watching harbors in Mirissa, or surf retreats in Weligama and Ahangama.
              </p>
              <div className="flex flex-wrap gap-2 my-5">
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Airport (BIA)</span>
                <span className="text-on-surface-variant">→</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Southern Highway</span>
                <span className="text-on-surface-variant">→</span>
                <span className="px-2.5 py-1 rounded-md bg-surface-container-low text-on-surface font-label-sm text-label-sm hover:bg-surface-container transition-colors duration-200">Galle / Mirissa Coast</span>
              </div>
            </div>
            <div className="pt-4 bg-surface-container-low rounded-xl px-4 py-3 flex items-center justify-between">
              <span className="font-label-sm text-label-sm text-on-surface-variant">Express Tolls Fully Included</span>
              <a
                className="inline-flex items-center gap-1 font-label-md text-label-md text-secondary font-bold hover:underline group/btn"
                href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I'd%20like%20to%20book%20the%20Down%20South%20Coastal%20Express%20($75)`}
                rel="noopener noreferrer"
                target="_blank"
              >
                Reserve Transfer <Icon className="text-sm group-hover/btn:translate-x-1.5 transition-transform duration-200">arrow_forward</Icon>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* MEET YOUR CHAUFFEUR TEASER SECTION */}
      <section className="w-full bg-surface-container-low py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-surface-container-lowest rounded-3xl p-8 sm:p-12 shadow-md hover:shadow-xl transition-shadow duration-500 reveal-on-scroll">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Profile Image */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative group">
                <div className="w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden shadow-lg bg-surface-container">
                  <img
                    alt="Chauffeur Harindu Elan"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    src={DRIVER_INFO.photo}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-surface-container-lowest shadow-md px-4 py-2 rounded-xl flex items-center gap-2 animate-gentle-float">
                  <Icon className="text-secondary text-xl">verified</Icon>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm font-bold text-on-surface">SLTDA Certified</span>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">Govt. Registered Guide</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bio & Experience */}
            <div className="lg:col-span-7 flex flex-col items-start">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">Your Dedicated Host</span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">Ayubowan, I'm Harindu Elan</h2>
              <p className="font-body-md text-body-md text-on-surface-variant mt-4 leading-relaxed">
                With over 12 years of driving across every nook and corner of Sri Lanka, I welcome you not just as a chauffeur, but as your local guardian, itinerary advisor, and island storyteller.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 my-6 w-full">
                <div className="bg-surface-container-low hover:bg-surface-container hover:-translate-y-1 hover:shadow-sm p-3.5 rounded-xl transition-all duration-200 cursor-default">
                  <span className="block font-headline-sm text-headline-sm text-on-surface font-bold">12+</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Years Island Experience</span>
                </div>
                <div className="bg-surface-container-low hover:bg-surface-container hover:-translate-y-1 hover:shadow-sm p-3.5 rounded-xl transition-all duration-200 cursor-default">
                  <span className="block font-headline-sm text-headline-sm text-on-surface font-bold">1,800+</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Safe Trips Handled</span>
                </div>
                <div className="bg-surface-container-low hover:bg-surface-container hover:-translate-y-1 hover:shadow-sm p-3.5 rounded-xl col-span-2 sm:col-span-1 transition-all duration-200 cursor-default">
                  <span className="block font-headline-sm text-headline-sm text-on-surface font-bold">100%</span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">Punctuality Score</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-primary-container text-on-primary hover:bg-primary font-label-md text-label-md font-bold transition-all shadow-md hover:scale-105 active:scale-95 duration-200"
                  href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I'm%20planning%20a%20trip%20to%20Sri%20Lanka%20and%20would%20love%20to%20chat!`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <Icon className="text-tertiary-fixed">chat</Icon>
                  Message Harindu Directly
                </a>
                <Link
                  className="inline-flex items-center gap-1.5 font-label-md text-label-md text-on-surface font-semibold hover:text-secondary hover:translate-x-1 transition-all duration-200"
                  to="/about-us-vehicle"
                >
                  Vehicle &amp; Chauffeur Profile <Icon className="text-sm">arrow_forward</Icon>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CUSTOMER REVIEWS & INTERNATIONAL TESTIMONIALS (NON-STOP ROTATING MARQUEE) */}
      <section className="w-full py-20 overflow-hidden bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 text-center reveal-on-scroll">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high/70 text-secondary text-label-sm font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-secondary-container animate-pulse"></span>
            Guest Experiences
          </div>
          <h2 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            Loved By International Travelers
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mx-auto mt-3">
            Real firsthand impressions from guests who explored Sri Lanka in our Toyota Prius hybrid with Harindu.
          </p>
          <div className="inline-flex items-center gap-1.5 mt-4 text-xs font-label-sm text-on-surface-variant/80 bg-surface-container-low px-3 py-1 rounded-full">
            <Icon className="text-sm text-secondary">pan_tool</Icon>
            <span>Hover on any card to pause rotation</span>
          </div>
        </div>

        {/* Seamless Infinite Rotating Marquee Track */}
        <div className="relative w-full overflow-hidden py-4">
          {/* Left & Right gradient edge fades for smooth infinite entry & exit */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-36 bg-gradient-to-r from-surface via-surface/80 to-transparent z-10"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-36 bg-gradient-to-l from-surface via-surface/80 to-transparent z-10"></div>

          {/* Marquee Track with 2x duplicated array for zero-glitch continuous loop */}
          <div className="animate-marquee-left flex gap-6 px-4">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((review, idx) => (
              <div
                key={idx}
                className="w-[320px] sm:w-[420px] shrink-0 bg-surface-container-lowest rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-xl hover:-translate-y-1.5 border border-surface-container-high/60 hover:border-secondary/25 transition-all duration-300 group cursor-default"
              >
                <div>
                  {/* Star Rating & Verified Pill */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-secondary-container group-hover:scale-105 transition-transform duration-300">
                      {[...Array(5)].map((_, i) => (
                        <Icon key={i} className="text-base" style={{ fontVariationSettings: "'FILL' 1" }}>star</Icon>
                      ))}
                    </div>
                    <span className="text-[11px] font-semibold text-tertiary-fixed-dim bg-tertiary-container/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Icon className="text-xs">verified</Icon> Verified Guest
                    </span>
                  </div>

                  {/* Review Quote */}
                  <p className="font-body-md text-body-md text-on-surface leading-relaxed italic">
                    “{review.quote}”
                  </p>
                </div>

                {/* Reviewer Details */}
                <div className="pt-5 mt-6 border-t border-surface-container-high/60 flex items-center justify-between group-hover:bg-surface-container-low/40 rounded-b-xl transition-colors duration-200">
                  <div>
                    <h4 className="font-label-md text-label-md font-bold text-on-surface group-hover:text-secondary transition-colors duration-200">
                      {review.author}
                    </h4>
                    <span className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-0.5">
                      <Icon className="text-xs text-on-surface-variant">location_on</Icon>
                      {review.location}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-bold border border-surface-container-highest/60 group-hover:bg-secondary/10 group-hover:text-secondary group-hover:border-secondary/20 transition-all duration-200">
                    {review.countryCode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DIRECT WHATSAPP INSTANT BOOKING BANNER */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-12 max-w-7xl mx-auto">
        <div className="relative w-full rounded-3xl bg-primary-container text-on-primary overflow-hidden p-8 sm:p-12 lg:p-16 shadow-2xl reveal-on-scroll">
          {/* Decorative Backdrop Circles */}
          <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none animate-ambient-pulse"></div>
          <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-tertiary-fixed-dim/10 blur-2xl pointer-events-none animate-ambient-pulse" style={{ animationDelay: "4s" }}></div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-surface-container-lowest/10 backdrop-blur-md text-tertiary-fixed text-label-sm font-label-sm font-semibold mb-4">
                <span className="w-2 h-2 rounded-full bg-tertiary-fixed"></span> Quick Response Guarantee (Under 10 Mins)
              </div>
              <h2 className="font-headline-lg text-headline-lg text-surface-bright tracking-tight">
                Ready to Plan Your Sri Lanka Journey?
              </h2>
              <p className="font-body-lg text-body-lg text-inverse-primary mt-3 leading-relaxed">
                Get an instant all-inclusive fare quote or discuss custom itinerary ideas directly with Harindu on WhatsApp. No booking fees required.
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-surface-bright font-label-md text-label-md">
                <span className="flex items-center gap-1.5">
                  <Icon className="text-sm text-secondary-fixed">check_circle</Icon> Flight Tracker Setup
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon className="text-sm text-secondary-fixed">check_circle</Icon> Luggage Advice
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon className="text-sm text-secondary-fixed">check_circle</Icon> Free Cancellation
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-center gap-3 shrink-0 w-full sm:w-auto">
              <a
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-tertiary text-on-primary hover:scale-105 active:scale-95 transition-all duration-300 font-label-lg text-label-lg font-bold shadow-xl"
                href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I%20would%20like%20to%20get%20a%20quick%20quote%20for%20my%20Sri%20Lanka%20trip.`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon className="text-2xl text-tertiary-fixed">chat</Icon>
                <span>Instant WhatsApp Chat</span>
              </a>
              <span className="text-on-primary-container font-label-sm text-label-sm">
                Direct Line: {DRIVER_INFO.displayPhone}
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
