import React, { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { DRIVER_INFO } from "../data/constants";
import Icon from "../components/Icon";

function PunctualMetricChip() {
  const chipRef = useRef(null);
  const [percent, setPercent] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const node = chipRef.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setPercent(100);
      return;
    }

    let animId;
    let startTime = null;
    const DURATION = 1100;
    const DELAY = 200;
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < DELAY) {
        animId = requestAnimationFrame(step);
        return;
      }

      const progress = Math.min((elapsed - DELAY) / DURATION, 1);
      const current = Math.round(easeOutCubic(progress) * 100);
      setPercent(current);

      if (progress < 1) {
        animId = requestAnimationFrame(step);
      } else {
        setPercent(100);
      }
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [hasStarted]);

  return (
    <div
      ref={chipRef}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-1 border border-surface-container transition-all duration-300 group cursor-default"
    >
      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
        <Icon className="text-2xl">verified_user</Icon>
      </div>
      <div className="flex flex-col">
        <span className="font-label-sm text-label-sm text-on-surface-variant">Arrival Assurance</span>
        <span className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary transition-colors tabular-nums">
          {percent}% Punctual
        </span>
      </div>
    </div>
  );
}

export default function Contact() {
  const [guestName, setGuestName] = useState("Sarah Jenkins");
  const [guestCountry, setGuestCountry] = useState("United Kingdom");
  const [countryCode, setCountryCode] = useState("+44");
  const [guestPhone, setGuestPhone] = useState("7984 112233");
  const [pickupLoc, setPickupLoc] = useState("Colombo BIA Airport (UL 504)");
  const [dropoffLoc, setDropoffLoc] = useState("Galle Fort Lighthouse Hotel");
  const [travelDate, setTravelDate] = useState(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  });
  const [pickupTime, setPickupTime] = useState("14:30");
  const [passengerCount, setPassengerCount] = useState("2 Passengers");
  const [luggageCount, setLuggageCount] = useState("2 Large Suitcases + 2 Handbags");
  const [reqChildSeat, setReqChildSeat] = useState(false);
  const [reqCoconut, setReqCoconut] = useState(true);
  const [reqWifi, setReqWifi] = useState(true);
  const [reqSurf, setReqSurf] = useState(false);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  // Scroll reveal observer initialization
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
  }, []);

  const formattedWhatsAppMsg = useMemo(() => {
    const name = guestName.trim() || "Guest";
    const country = guestCountry.trim() ? ` (${guestCountry.trim()})` : "";
    const phone = guestPhone.trim();
    const phoneStr = phone ? `${countryCode} ${phone}` : "Not provided";
    const pickup = pickupLoc.trim() || "Colombo BIA Airport";
    const dropoff = dropoffLoc.trim() || "Destination Hotel";
    const date = travelDate || "Upcoming date";
    const time = pickupTime || "14:30";

    const extras = [];
    if (reqChildSeat) extras.push("Child booster seat");
    if (reqCoconut) extras.push("King coconut stop");
    if (reqWifi) extras.push("Car Wi-Fi");
    if (reqSurf) extras.push("Surfboard rack");
    const extrasStr = extras.length > 0 ? `\n• Special requests: ${extras.join(", ")}` : "";

    return (
      `Hello Harindu, I would like to book a private transfer with CeylonDrive.\n` +
      `• Passenger: ${name}${country}\n` +
      `• Route: ${pickup} ➔ ${dropoff}\n` +
      `• Date & Time: ${date} at ${time}\n` +
      `• Party: ${passengerCount} (${luggageCount})\n` +
      `• Contact WhatsApp: ${phoneStr}${extrasStr}\n\n` +
      `Please confirm your availability and the guaranteed all-inclusive fare!`
    );
  }, [
    guestName,
    guestCountry,
    countryCode,
    guestPhone,
    pickupLoc,
    dropoffLoc,
    travelDate,
    pickupTime,
    passengerCount,
    luggageCount,
    reqChildSeat,
    reqCoconut,
    reqWifi,
    reqSurf,
  ]);

  const handleSendWhatsApp = () => {
    const url = `https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=${encodeURIComponent(
      formattedWhatsAppMsg
    )}`;
    window.open(url, "_blank");
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How and when do I pay? Is an advance deposit required?",
      a: "No advance credit card deposit is needed for standard airport transfers or single-day journeys! You simply pay upon reaching your destination hotel directly to your driver. We welcome cash in USD ($), EUR (€), GBP (£), or Sri Lankan Rupees (LKR). If you prefer cashless payment, instant fee-free transfers via Wise or Revolut can be processed right inside the car.",
    },
    {
      q: "Are highway expressway toll fees and petrol included?",
      a: "Yes, 100% all-inclusive. The agreed fare covers the Katunayake Expressway (E03), the Southern Expressway (E01) to Galle/Mirissa, Central Expressway segments, all petrol/fuel charges, vehicle insurance, and chauffeur allowances. You will never be asked for additional money at toll booths.",
    },
    {
      q: "Does Chauffeur Harindu speak fluent English?",
      a: "Yes, Harindu speaks fluent, conversational English and has guided international guests from the UK, Europe, Australia, and North America for over 12 years. Beyond smooth driving, he is certified by the Sri Lanka Tourism Development Authority (SLTDA) and can share cultural lore, history, botanical facts, and recommend safe, hygienic local restaurants.",
    },
    {
      q: "What happens if my flight into Colombo (CMB) is delayed?",
      a: "We monitor flight statuses continuously via live radar using your flight number. Whether your flight touches down early or is delayed by several hours, your chauffeur will adjust his arrival schedule automatically. Harindu will be waiting directly outside the BIA Katunayake Arrivals Hall holding a clean, printed nameboard with your name. There are no extra wait-time charges for delayed flights.",
    },
    {
      q: "Can we pause along the route for king coconut, food, or photos?",
      a: "Absolutely! A private chauffeur service is tailored entirely to your rhythm. Feel free to ask Harindu to stop at a clean roadside stall for fresh Thambili (sweet king coconut), authentic Ceylon tea, clean highway restroom pavilions, or breathtaking viewpoint photo stops at any moment.",
    },
    {
      q: "What is your cancellation and amendment policy?",
      a: "We offer free cancellation up to 12 hours before your scheduled pickup time. Travel plans change, and flights get rescheduled — just ping us a quick WhatsApp text and we will adjust your date or cancel without penalty or awkwardness.",
    },
  ];

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* =========================================================================
          PAGE HEADER WITH ATMOSPHERIC GLOWS & METRIC CHIPS
          ========================================================================= */}
      <section className="relative w-full px-4 sm:px-6 lg:px-8 py-10 lg:py-14 bg-surface-container-low overflow-hidden">
        {/* Ambient atmospheric glowing pulses */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl pointer-events-none animate-ambient-pulse" />
        <div
          className="absolute -bottom-10 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none animate-ambient-pulse"
          style={{ animationDelay: "3s" }}
        />

        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-6 relative z-10">
          <div className="flex flex-col gap-3.5 max-w-2xl">
            {/* Live reservation badge */}
            <div className="inline-flex items-center gap-2 self-start px-3.5 py-1.5 rounded-full bg-surface-container-high text-secondary border border-surface-container shadow-sm animate-fade-in-down">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#25D366]"></span>
              </span>
              <span className="font-label-sm text-label-sm uppercase tracking-wider font-semibold">
                Immediate Dispatch &amp; Reservation
              </span>
            </div>

            <h1 className="font-headline-lg text-headline-lg text-primary tracking-tight animate-fade-in-up">
              Contact &amp; <span className="text-secondary">Direct Booking</span>
            </h1>

            <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed animate-fade-in-up animation-delay-100">
              Instant 24/7 Response via WhatsApp, Phone, or Booking Form. Direct connection with your licensed tourist chauffeur Harindu.
            </p>
          </div>

          {/* Quick Status Metric Chips with Hover Micro-Interactions */}
          <div className="flex flex-wrap items-center gap-3 animate-fade-in-up animation-delay-200">
            <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md hover:-translate-y-1 border border-surface-container transition-all duration-300 group cursor-default">
              <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                <Icon className="text-2xl">avg_pace</Icon>
              </div>
              <div className="flex flex-col">
                <span className="font-label-sm text-label-sm text-on-surface-variant">Avg. Response Time</span>
                <span className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary transition-colors">
                  &lt; 3 mins
                </span>
              </div>
            </div>

            <PunctualMetricChip />
          </div>
        </div>
      </section>

      {/* =========================================================================
          TRUST & SECURITY GUARANTEE BADGE BAR WITH HOVER & STAGGER
          ========================================================================= */}
      <div className="w-full bg-surface-container-highest/60 py-4 px-4 sm:px-6 lg:px-8 border-y border-surface-container">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6">
          {[
            {
              icon: "shield",
              title: "SLTDA Certified",
              desc: "Official Tourist Chauffeur",
              color: "text-secondary",
            },
            {
              icon: "flight_land",
              title: "Live Flight Tracking",
              desc: "Zero Delay Penalties",
              color: "text-secondary",
            },
            {
              icon: "eco",
              title: "Toyota Prius Hybrid",
              desc: "Pristine & Sanitized",
              color: "text-secondary",
            },
            {
              icon: "policy",
              title: "Fully Insured",
              desc: "Comprehensive Cover",
              color: "text-secondary",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-3 p-2 rounded-xl hover:bg-surface-container-lowest/60 transition-all duration-200 group cursor-default reveal-on-scroll"
              style={{ transitionDelay: `${idx * 60}ms` }}
            >
              <div className="p-2 rounded-xl bg-surface-container text-secondary group-hover:bg-secondary group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0 shadow-sm">
                <Icon className="text-xl leading-none">{item.icon}</Icon>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-md text-label-md text-on-surface font-semibold truncate group-hover:text-secondary transition-colors">
                  {item.title}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant truncate">
                  {item.desc}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTENT GRID: DIRECT CHANNELS & INTERACTIVE BOOKING ENGINE
          ========================================================================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: Direct Contact & Driver Cards */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Card 1: Direct WhatsApp Hotline */}
            <div className="rounded-3xl p-6 sm:p-7 bg-surface-container-lowest shadow-md hover:shadow-xl border border-surface-container transition-all duration-300 flex flex-col gap-5 relative overflow-hidden group reveal-from-left">
              <div className="shine-effect" />
              <div className="flex items-start justify-between gap-4 relative z-10">
                <div className="flex items-center gap-3.5">
                  <div className="relative shrink-0">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden shadow-sm ring-2 ring-surface-container bg-surface-container">
                      <img
                        alt="Chauffeur Harindu Elan"
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-300"
                        src={DRIVER_INFO.photo}
                      />
                    </div>
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-[#25D366] ring-2 ring-surface-container-lowest animate-pulse"></span>
                  </div>
                  <div className="flex flex-col">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
                      Fastest Booking Channel
                    </span>
                    <h3 className="font-headline-sm text-headline-sm text-primary font-bold group-hover:text-secondary transition-colors">
                      {DRIVER_INFO.name}
                    </h3>
                    <span className="font-body-sm text-body-sm text-on-surface-variant">
                      {DRIVER_INFO.role}
                    </span>
                  </div>
                </div>

                <span className="px-3 py-1 rounded-full bg-surface-container text-[#007A3D] font-label-sm text-label-sm font-semibold flex items-center gap-1.5 shrink-0">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-[#25D366]"></span>
                  </span>
                  Online
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-surface-container-low flex flex-col gap-1 relative z-10 border border-surface-container/60">
                <div className="flex items-center justify-between text-on-surface-variant font-label-sm text-label-sm">
                  <span>WhatsApp Direct Line</span>
                  <span className="text-[#007A3D] font-semibold flex items-center gap-1">
                    <Icon className="text-sm animate-pulse-subtle">bolt</Icon>
                    &lt; 3 min reply
                  </span>
                </div>
                <span className="font-headline-sm text-headline-sm text-primary font-bold tracking-tight">
                  {DRIVER_INFO.displayPhone}
                </span>
                <span className="font-body-sm text-body-sm text-on-surface-variant">
                  Direct routing to vehicle phone — no call centers or intermediaries.
                </span>
              </div>

              <a
                className="w-full inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-full bg-[#25D366] text-white font-label-lg text-label-lg font-bold shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:brightness-110 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-center whatsapp-pulse group/btn relative overflow-hidden z-10"
                href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I%20would%20like%20to%20request%20a%20private%20transfer%20quote.`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <div className="shine-effect" />
                <Icon className="text-2xl leading-none group-hover/btn:rotate-12 transition-transform duration-300">chat</Icon>
                <span>Chat on WhatsApp Now</span>
              </a>
            </div>

            {/* Card 2: Voice & Emergency Dispatch */}
            <div
              className="rounded-3xl p-6 bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-1 border border-surface-container transition-all duration-300 flex items-start gap-4 group reveal-from-left"
              style={{ transitionDelay: "100ms" }}
            >
              <div className="p-3.5 rounded-2xl bg-surface-container text-primary group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0 shadow-sm">
                <Icon className="text-2xl leading-none">call</Icon>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center justify-between">
                  <h4 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-secondary transition-colors">
                    24/7 Voice &amp; Flight Emergency
                  </h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                    24/7
                  </span>
                </div>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Immediate assistance for last-minute airport pickups, delayed baggage, or urgent flight gate alterations.
                </p>
                <div className="pt-2 flex flex-wrap gap-2">
                  <a
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-secondary hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                    href={`tel:${DRIVER_INFO.phone}`}
                  >
                    <Icon className="text-base">phone_in_talk</Icon>
                    {DRIVER_INFO.displayPhone}
                  </a>
                  <a
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface-container text-on-surface font-label-md text-label-md font-semibold hover:bg-secondary hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                    href={`tel:${DRIVER_INFO.officePhone.replace(/\s+/g, "")}`}
                  >
                    <Icon className="text-base">deskphone</Icon>
                    {DRIVER_INFO.officePhone}
                  </a>
                </div>
              </div>
            </div>

            {/* Card 3: Email Desk */}
            <div
              className="rounded-3xl p-6 bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-1 border border-surface-container transition-all duration-300 flex items-start gap-4 group reveal-from-left"
              style={{ transitionDelay: "200ms" }}
            >
              <div className="p-3.5 rounded-2xl bg-surface-container text-secondary group-hover:bg-secondary group-hover:text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shrink-0 shadow-sm">
                <Icon className="text-2xl leading-none">mail</Icon>
              </div>
              <div className="flex flex-col gap-1 w-full">
                <h4 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-secondary transition-colors">
                  Email &amp; Multi-Day Tour Itineraries
                </h4>
                <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                  Send full flight PDF schedules, round-trip itineraries, or multi-week tour requests for custom pricing.
                </p>
                <div className="pt-2 flex flex-col gap-1.5 font-label-md text-label-md">
                  <a
                    className="text-secondary hover:text-primary flex items-center gap-1.5 transition-colors group/link"
                    href={`mailto:${DRIVER_INFO.email}`}
                  >
                    <Icon className="text-base group-hover/link:translate-x-0.5 transition-transform">outgoing_mail</Icon>
                    {DRIVER_INFO.email}
                  </a>
                  <a
                    className="text-on-surface-variant hover:text-on-surface flex items-center gap-1.5 transition-colors group/link"
                    href={`mailto:${DRIVER_INFO.infoEmail}`}
                  >
                    <Icon className="text-base group-hover/link:translate-x-0.5 transition-transform">alternate_email</Icon>
                    {DRIVER_INFO.infoEmail}
                  </a>
                </div>
              </div>
            </div>

            {/* Card 4: Operating Hub */}
            <div
              className="rounded-3xl p-6 bg-surface-container-lowest shadow-sm hover:shadow-xl hover:-translate-y-1 border border-surface-container transition-all duration-300 flex flex-col gap-4 group reveal-from-left"
              style={{ transitionDelay: "300ms" }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-secondary/15 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                    <Icon className="text-xl">location_on</Icon>
                  </div>
                  <h4 className="font-title-md text-title-md text-on-surface font-semibold group-hover:text-secondary transition-colors">
                    Operating Hub &amp; Service Coverage
                  </h4>
                </div>
                <span className="font-label-sm text-label-sm text-secondary font-semibold bg-surface-container px-2.5 py-0.5 rounded-full">
                  Island-Wide
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Vehicles stationed 8 minutes from Bandaranaike International Airport (CMB / BIA Katunayake) with secondary staging at Colombo Fort for prompt hotel pickups.
              </p>
              <div className="w-full h-40 rounded-2xl bg-surface-container relative overflow-hidden flex items-end p-3 shadow-inner">
                <div
                  className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700 ease-out"
                  style={{
                    backgroundImage: `url('/images/vehicle-interior.jpg')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="p-2.5 rounded-xl bg-surface-container-lowest/90 backdrop-blur-sm flex items-center gap-2 shadow-sm relative z-10">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary"></span>
                  </span>
                  <span className="font-label-sm text-label-sm font-semibold text-primary">
                    Katunayake Airport Staging Area
                  </span>
                </div>
              </div>
            </div>

            {/* Card 5: Supported Currencies */}
            <div
              className="rounded-3xl p-6 bg-surface-container-low border border-surface-container flex flex-col gap-3.5 shadow-sm reveal-from-left"
              style={{ transitionDelay: "400ms" }}
            >
              <div className="flex items-center gap-2.5">
                <Icon className="text-primary text-2xl">payments</Icon>
                <h4 className="font-title-md text-title-md text-on-surface font-semibold">
                  Zero Prepayment • Pay Upon Arrival
                </h4>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                Pay safely at your final destination directly to Chauffeur Harindu. No card numbers held over the phone.
              </p>
              <div className="flex flex-col gap-2 pt-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Currencies Accepted on Arrival:
                </span>
                <div className="flex flex-wrap gap-2">
                  {["USD ($)", "EUR (€)", "GBP (£)", "AUD ($)", "LKR (Rs)"].map((curr) => (
                    <span
                      key={curr}
                      className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-on-surface font-label-md text-label-md font-bold shadow-sm hover:bg-secondary hover:text-white hover:scale-105 transition-all duration-200 cursor-default"
                    >
                      {curr}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-1">
                <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                  Digital &amp; Bank Alternatives:
                </span>
                <div className="flex flex-wrap gap-2 text-on-surface font-label-sm text-label-sm">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
                    <Icon className="text-sm text-secondary">account_balance_wallet</Icon>
                    Wise Transfer
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
                    <Icon className="text-sm text-secondary">credit_card</Icon>
                    Revolut
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high transition-colors">
                    <Icon className="text-sm text-secondary">contactless</Icon>
                    Visa / Mastercard Terminal
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Booking & WhatsApp Message Generator */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-3xl p-6 sm:p-9 bg-surface-container-lowest shadow-2xl border border-surface-container flex flex-col gap-6 relative overflow-hidden group reveal-from-right">
              <div className="shine-effect" />
              <div className="flex flex-col gap-2 pb-2 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold flex items-center gap-1.5">
                    <Icon className="text-sm animate-pulse-subtle">calculate</Icon>
                    Fast Fare Calculation
                  </span>
                  <span className="font-label-sm text-label-sm text-[#007A3D] font-semibold flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#25D366]/10">
                    <Icon className="text-sm">lock</Icon>SSL Secure Request
                  </span>
                </div>
                <h2 className="font-headline-md text-headline-md text-primary font-bold">
                  Get an Instant Guaranteed Quote
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                  Fill in your trip details below. The system automatically formats your live WhatsApp message for instantaneous confirmation.
                </p>
              </div>

              {/* Form with Micro-Interactions */}
              <form className="flex flex-col gap-5 relative z-10" onSubmit={handleSubmitForm}>
                {/* Field 1: Name & Country */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1" htmlFor="guest-name">
                      <Icon className="text-sm text-secondary">person</Icon>
                      Passenger Full Name *
                    </label>
                    <div className="relative">
                      <input
                        id="guest-name"
                        type="text"
                        required
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Sarah Jenkins"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1" htmlFor="guest-country">
                      <Icon className="text-sm text-secondary">public</Icon>
                      Nationality / Country *
                    </label>
                    <div className="relative">
                      <input
                        id="guest-country"
                        type="text"
                        required
                        value={guestCountry}
                        onChange={(e) => setGuestCountry(e.target.value)}
                        placeholder="e.g. United Kingdom, Germany"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Field 2: WhatsApp Number */}
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1" htmlFor="guest-phone">
                    <Icon className="text-sm text-secondary">phone</Icon>
                    WhatsApp Mobile Number (with country code) *
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                    <select
                      id="country-code"
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="col-span-1 py-3 px-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                    >
                      <option value="+44">🇬🇧 +44 (UK)</option>
                      <option value="+1">🇺🇸 +1 (US/CA)</option>
                      <option value="+49">🇩🇪 +49 (DE)</option>
                      <option value="+33">🇫🇷 +33 (FR)</option>
                      <option value="+61">🇦🇺 +61 (AU)</option>
                      <option value="+94">🇱🇰 +94 (LK)</option>
                      <option value="+91">🇮🇳 +91 (IN)</option>
                      <option value="+971">🇦🇪 +971 (UAE)</option>
                      <option value="+31">🇳🇱 +31 (NL)</option>
                      <option value="+41">🇨🇭 +41 (CH)</option>
                    </select>
                    <div className="col-span-2 sm:col-span-3 relative">
                      <input
                        id="guest-phone"
                        type="tel"
                        required
                        value={guestPhone}
                        onChange={(e) => setGuestPhone(e.target.value)}
                        placeholder="7123 456789"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Field 3: Locations */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1" htmlFor="pickup-loc">
                      <Icon className="text-sm text-secondary">flight_land</Icon>
                      Pick-up Location *
                    </label>
                    <div className="relative">
                      <input
                        id="pickup-loc"
                        type="text"
                        required
                        value={pickupLoc}
                        onChange={(e) => setPickupLoc(e.target.value)}
                        placeholder="BIA Colombo Airport (Flight UL504)"
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {["Colombo BIA Airport", "Colombo Central Hotel", "Negombo Beach Road"].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setPickupLoc(preset)}
                          className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-secondary hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                          {preset.includes("Airport") ? "Airport (BIA)" : preset.includes("Colombo") ? "Colombo" : "Negombo"}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1" htmlFor="dropoff-loc">
                      <Icon className="text-sm text-secondary">location_on</Icon>
                      Drop-off Destination *
                    </label>
                    <div className="relative">
                      <input
                        id="dropoff-loc"
                        type="text"
                        required
                        value={dropoffLoc}
                        onChange={(e) => setDropoffLoc(e.target.value)}
                        placeholder="Hotel in Galle, Kandy, Sigiriya..."
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                      />
                    </div>
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {[
                        { label: "Galle Fort", val: "Galle Fort Hotel" },
                        { label: "Kandy", val: "Kandy City Center" },
                        { label: "Sigiriya", val: "Sigiriya Heritage Resort" },
                        { label: "Mirissa", val: "Mirissa Beach" },
                      ].map((item) => (
                        <button
                          key={item.label}
                          type="button"
                          onClick={() => setDropoffLoc(item.val)}
                          className="px-2.5 py-1 rounded-lg bg-surface-container text-on-surface-variant font-label-sm text-label-sm hover:bg-secondary hover:text-white hover:scale-105 active:scale-95 transition-all duration-200"
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Field 4: Travel Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1" htmlFor="travel-date">
                      <Icon className="text-sm text-secondary">calendar_today</Icon>
                      Pickup Date *
                    </label>
                    <div className="relative">
                      <input
                        id="travel-date"
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1" htmlFor="pickup-time">
                      <Icon className="text-sm text-secondary">schedule</Icon>
                      Flight Arrival / Pickup Time *
                    </label>
                    <div className="relative">
                      <input
                        id="pickup-time"
                        type="time"
                        required
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Field 5: Passengers & Luggage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1" htmlFor="passenger-count">
                      <Icon className="text-sm text-secondary">group</Icon>
                      Adult / Child Passengers
                    </label>
                    <div className="relative">
                      <select
                        id="passenger-count"
                        value={passengerCount}
                        onChange={(e) => setPassengerCount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                      >
                        <option value="1 Passenger">1 Passenger</option>
                        <option value="2 Passengers">2 Passengers (Spacious Coupe)</option>
                        <option value="3 Passengers">3 Passengers</option>
                        <option value="4 Passengers">4 Passengers (Max Capacity)</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-label-md text-on-surface-variant font-medium flex items-center gap-1" htmlFor="luggage-count">
                      <Icon className="text-sm text-secondary">luggage</Icon>
                      Luggage Load
                    </label>
                    <div className="relative">
                      <select
                        id="luggage-count"
                        value={luggageCount}
                        onChange={(e) => setLuggageCount(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-surface-container-low font-body-md text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest border border-transparent focus:border-secondary transition-all"
                      >
                        <option value="1 Suitcase + 1 Handbag">1 Suitcase + 1 Backpack</option>
                        <option value="2 Large Suitcases + 2 Handbags">2 Large Suitcases + 2 Handbags (Fits Prius)</option>
                        <option value="3 Suitcases">3 Medium Suitcases</option>
                        <option value="Bulky Gear (Surfboard / Golf bag)">Bulky (Surfboard or Stroller)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Field 6: Special Requests with Interactive Checkbox Cards */}
                <div className="flex flex-col gap-2 pt-1">
                  <span className="font-label-md text-label-md text-on-surface-variant font-medium">
                    Complimentary In-Car Amenities &amp; Stops:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {[
                      {
                        checked: reqChildSeat,
                        setter: setReqChildSeat,
                        label: "Child Safety / Booster Seat",
                        icon: "child_care",
                      },
                      {
                        checked: reqCoconut,
                        setter: setReqCoconut,
                        label: "King Coconut Roadside Pause",
                        icon: "local_cafe",
                      },
                      {
                        checked: reqWifi,
                        setter: setReqWifi,
                        label: "High-Speed Portable Wi-Fi",
                        icon: "wifi",
                      },
                      {
                        checked: reqSurf,
                        setter: setReqSurf,
                        label: "Surfboard Soft Roof Rack",
                        icon: "surfing",
                      },
                    ].map((amenity, idx) => (
                      <label
                        key={idx}
                        className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer border transition-all duration-200 select-none ${
                          amenity.checked
                            ? "bg-secondary/10 border-secondary/40 text-on-surface shadow-sm"
                            : "bg-surface-container-low border-surface-container hover:bg-surface-container hover:border-secondary/20 text-on-surface-variant"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={amenity.checked}
                          onChange={(e) => amenity.setter(e.target.checked)}
                          className="w-4 h-4 rounded text-secondary focus:ring-secondary accent-secondary"
                        />
                        <Icon className="text-base text-secondary">{amenity.icon}</Icon>
                        <span className="font-body-sm text-body-sm text-on-surface font-medium">{amenity.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Live WhatsApp Message Preview Box with Auto-Update Animation */}
                <div className="rounded-2xl p-5 bg-surface-container-low border border-surface-container flex flex-col gap-3 relative overflow-hidden">
                  <div className="flex items-center justify-between">
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-surface-variant font-semibold flex items-center gap-1.5">
                      <Icon className="text-sm text-[#007A3D]">visibility</Icon>
                      Live WhatsApp Message Preview
                    </span>
                    <span className="font-label-sm text-label-sm text-[#007A3D] font-bold flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#25D366]/10 animate-pulse-subtle">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]"></span>
                      Auto-Updating
                    </span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface-container-lowest text-primary font-body-sm text-body-sm leading-relaxed whitespace-pre-wrap select-all font-mono border border-surface-container shadow-inner">
                    {formattedWhatsAppMsg}
                  </div>
                  <div className="flex items-center justify-between font-label-sm text-label-sm text-on-surface-variant">
                    <span className="flex items-center gap-1">
                      <Icon className="text-xs text-secondary">check</Icon>
                      Includes all Highway Tolls &amp; Petrol
                    </span>
                    <span className="text-[#007A3D] font-medium">Ready to send directly</span>
                  </div>
                </div>

                {/* Action Buttons with Interactive Glows & Tap Feedback */}
                <div className="flex flex-col sm:flex-row items-stretch gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSendWhatsApp}
                    className="flex-1 inline-flex items-center justify-center gap-2.5 py-4 px-6 rounded-2xl bg-[#25D366] text-white font-label-lg text-label-lg font-bold shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:brightness-110 active:scale-95 transition-all whatsapp-pulse group/btn relative overflow-hidden"
                  >
                    <div className="shine-effect" />
                    <Icon className="text-2xl leading-none group-hover/btn:rotate-12 transition-transform duration-300">chat</Icon>
                    <span>Send Booking Request via WhatsApp</span>
                  </button>
                  <button
                    type="submit"
                    className={`inline-flex items-center justify-center gap-2 py-4 px-7 rounded-2xl font-label-lg text-label-lg font-semibold shadow-md active:scale-95 transition-all duration-300 ${
                      formSubmitted
                        ? "bg-[#007A3D] text-white scale-[1.02]"
                        : "bg-primary text-on-primary hover:bg-secondary hover:shadow-lg"
                    }`}
                  >
                    <Icon className="text-xl leading-none">{formSubmitted ? "check" : "send"}</Icon>
                    <span>{formSubmitted ? "Submitted ✓" : "Submit Form"}</span>
                  </button>
                </div>

                {/* Confirmation Message */}
                {formSubmitted && (
                  <div className="p-4 rounded-2xl bg-secondary/10 border border-secondary/30 text-on-surface flex items-start gap-3 animate-fade-in-up">
                    <Icon className="text-secondary text-2xl animate-bounce">check_circle</Icon>
                    <div className="flex flex-col">
                      <span className="font-label-lg text-label-lg font-bold text-secondary">Inquiry Received!</span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        Harindu has received your trip parameters. You will receive an SMS and email voucher with route quote within 10 minutes.
                      </span>
                    </div>
                  </div>
                )}
              </form>
            </div>

            {/* Vehicle Spec Assurance Snapshot with Image Zoom & Arrow Slide */}
            <div className="rounded-3xl p-5 bg-surface-container-low border border-surface-container flex flex-col sm:flex-row items-center justify-between gap-4 group reveal-on-scroll shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-14 rounded-2xl bg-surface-container-highest shrink-0 overflow-hidden relative"
                >
                  <div
                    className="w-full h-full bg-cover bg-center group-hover:scale-115 transition-transform duration-700 ease-out"
                    style={{
                      backgroundImage: `url('/images/vehicle-prius.jpg')`,
                    }}
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-label-md text-label-md text-on-surface font-bold group-hover:text-secondary transition-colors">
                    Standard Fleet: Toyota Prius Hybrid
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant">
                    Dual-zone chilled A/C • Quiet electric drive • Clean leather seats
                  </span>
                </div>
              </div>
              <Link
                className="font-label-md text-label-md text-secondary hover:underline flex items-center gap-1.5 shrink-0 group/link"
                to="/about-us-vehicle"
              >
                <span>Inspect Vehicle Specs</span>
                <Icon className="text-base group-hover/link:translate-x-1 transition-transform">arrow_forward</Icon>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          COMPREHENSIVE FAQ ACCORDION SECTION WITH SMOOTH EXPANSION
          ========================================================================= */}
      <section className="w-full bg-surface-container-low py-14 lg:py-20 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col gap-10">
          <div className="flex flex-col items-center text-center gap-2.5 reveal-on-scroll">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
              Tourist Confidence &amp; Clarity
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary font-bold">
              Frequently Asked Questions
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-xl leading-relaxed">
              Everything you need to know about airport arrivals, cashless options, expressway toll vouchers, and route pacing across Sri Lanka.
            </p>
          </div>

          {/* Accordion List with Staggered Scroll Reveals */}
          <div className="flex flex-col gap-3.5">
            {faqs.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl bg-surface-container-lowest shadow-sm hover:shadow-md border border-surface-container hover:border-secondary/30 overflow-hidden transition-all duration-300 reveal-on-scroll"
                  style={{ transitionDelay: `${index * 70}ms` }}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 group/btn cursor-pointer"
                  >
                    <span className="font-title-md text-title-md text-primary font-semibold flex items-center gap-3 group-hover/btn:text-secondary transition-colors">
                      <span className="w-7 h-7 rounded-lg bg-surface-container text-secondary font-bold text-sm flex items-center justify-center shrink-0">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {faq.q}
                    </span>
                    <Icon
                      className={`text-outline transition-transform duration-300 shrink-0 ${
                        isOpen ? "rotate-180 text-secondary" : "group-hover/btn:text-secondary"
                      }`}
                    >
                      expand_more
                    </Icon>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 pt-1 text-on-surface-variant font-body-md text-body-md leading-relaxed animate-fadeIn border-t border-surface-container/60">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* FAQ Extra Support Note */}
          <div className="p-5 sm:p-6 rounded-2xl bg-surface-container-lowest border border-surface-container shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left reveal-on-scroll group">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-secondary/15 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform shrink-0">
                <Icon className="text-2xl">help_center</Icon>
              </div>
              <span className="font-body-md text-body-md text-on-surface">
                Have a custom question about child seats, itinerary feasibility, or hill country roads?
              </span>
            </div>
            <a
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-secondary text-white font-label-md text-label-md font-bold shadow-sm hover:brightness-110 hover:scale-105 active:scale-95 transition-all shrink-0"
              href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hi%20Harindu,%20I%20have%20a%20specific%20travel%20question%20regarding%20my%20trip.`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <span>Ask Harindu on WhatsApp</span>
              <Icon className="text-base">arrow_forward</Icon>
            </a>
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
                Ready to Confirm Your Sri Lanka Journey?
              </h2>
              <p className="font-body-md text-body-md text-inverse-primary leading-relaxed">
                Connect directly with Chauffeur {DRIVER_INFO.name.split(" ")[0]} on WhatsApp. No booking fees, zero advance credit card required, with transparent fixed pricing.
              </p>
              <div className="flex flex-wrap items-center gap-4 text-white font-label-sm text-label-sm pt-2">
                <span className="flex items-center gap-1.5">
                  <Icon className="text-[#25D366] text-base">timer</Icon>
                  Replies within 3 minutes
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon className="text-[#25D366] text-base">lock_open</Icon>
                  Pay upon arrival safely
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 shrink-0 w-full sm:w-auto relative z-10">
              <a
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#25D366] text-white font-label-lg text-label-lg font-bold shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:brightness-110 active:scale-95 transition-all text-center whatsapp-pulse hover:scale-105 duration-200"
                href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hello%20Harindu,%20I%20would%20like%20to%20confirm%20my%20booking%20or%20ask%20a%20quick%20question.`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon className="text-2xl">chat</Icon>
                <span>Chat with Harindu</span>
              </a>
              <Link
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-surface-container-high/20 hover:bg-surface-container-high/30 text-white font-label-md text-label-md font-semibold transition-all text-center group hover:scale-105 active:scale-95 duration-200 border border-white/10"
                to="/services-tours"
              >
                <Icon className="text-lg">explore</Icon>
                <span>View Tours &amp; Rates</span>
                <Icon className="text-base group-hover:translate-x-1 transition-transform">arrow_forward</Icon>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
