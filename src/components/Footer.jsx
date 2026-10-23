import React from "react";
import { Link } from "react-router-dom";
import { DRIVER_INFO } from "../data/constants";

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container-high mt-16 pb-24 md:pb-12 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pb-12 border-b border-surface-container-highest">
          {/* Brand info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                alt="CeylonDrive Logo"
                className="h-8 w-auto object-contain"
                src={DRIVER_INFO.logo}
              />
              <span className="font-headline-sm text-headline-sm font-bold text-primary">
                CeylonDrive
              </span>
            </Link>
            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Premier private chauffeur, airport transfer, and bespoke island tours across Sri Lanka. Experience warm hospitality, punctuality, and comfort in our meticulously maintained hybrid vehicles.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#92400E] font-label-sm text-label-sm font-semibold">
                <span className="material-symbols-outlined text-sm">shield_person</span>
                SLTDA Tourist Safety Certified
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-on-surface-variant font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-sm">eco</span>
                Toyota Prius Hybrid Eco Fleet
              </span>
            </div>
          </div>

          {/* Popular Transfers */}
          <div className="flex flex-col gap-3">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Popular Transfers
            </h3>
            <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <li className="hover:text-on-surface transition-colors">
                <Link to="/services-tours">BIA Airport → Colombo Central</Link>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <Link to="/services-tours">BIA Airport → Galle &amp; Mirissa</Link>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <Link to="/services-tours">BIA Airport → Kandy Cultural Hub</Link>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <Link to="/services-tours">Colombo → Sigiriya &amp; Dambulla</Link>
              </li>
              <li className="hover:text-on-surface transition-colors">
                <Link to="/services-tours">Kandy → Ella Scenic Highland Tour</Link>
              </li>
            </ul>
          </div>

          {/* Direct Support */}
          <div className="flex flex-col gap-3">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Direct Support
            </h3>
            <ul className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
              <li>
                <strong className="text-on-surface">Chauffeur Guide:</strong> {DRIVER_INFO.name}
              </li>
              <li>
                <strong className="text-on-surface">WhatsApp:</strong>{" "}
                <a
                  href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}`}
                  className="hover:underline text-secondary font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {DRIVER_INFO.displayPhone}
                </a>
              </li>
              <li>
                <strong className="text-on-surface">Hotline:</strong> 24/7 Available for Guests
              </li>
              <li>
                <strong className="text-on-surface">Email:</strong> {DRIVER_INFO.infoEmail}
              </li>
              <li>
                <strong className="text-on-surface">Base:</strong> {DRIVER_INFO.base}
              </li>
            </ul>
          </div>

          {/* Payment & Trust */}
          <div className="flex flex-col gap-4">
            <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
              Payment &amp; Trust
            </h3>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              All tollway fees, highway tickets, fuel, and chauffeur accommodation are 100% included in agreed fares.
            </p>
            <div className="flex flex-col gap-1.5">
              <span className="font-label-sm text-label-sm font-semibold text-on-surface">
                Currencies Accepted:
              </span>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                  USD ($)
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                  EUR (€)
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                  GBP (£)
                </span>
                <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                  LKR (Rs)
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
          <p>© 2025 CeylonDrive Chauffeur &amp; Tour Services. All rights reserved.</p>
          <div className="flex items-center gap-6 font-label-sm text-label-sm">
            <Link className="hover:text-on-surface transition-colors" to="/contact-booking">
              Terms of Transfer
            </Link>
            <Link className="hover:text-on-surface transition-colors" to="/contact-booking">
              Passenger Privacy
            </Link>
            <Link className="hover:text-on-surface transition-colors" to="/about-us-vehicle">
              Vehicle Specs
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
