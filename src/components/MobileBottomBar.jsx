import React from "react";
import { Link } from "react-router-dom";
import { DRIVER_INFO } from "../data/constants";
import Icon from "./Icon";

export default function MobileBottomBar() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-surface-container-lowest/95 backdrop-blur-xl border-t border-surface-container-high px-4 py-2.5 flex items-center justify-between gap-3 shadow-[0_-4px_20px_rgba(15,23,42,0.08)]">
      <a
        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-surface-container-high text-on-surface font-label-md text-label-md font-semibold text-center hover:bg-surface-container-highest transition-colors"
        href={`tel:${DRIVER_INFO.phone}`}
      >
        <Icon name="call" className="text-base" />
        <span>Call Harindu</span>
      </a>
      <a
        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-[#25D366] text-on-primary font-label-md text-label-md font-bold text-center hover:brightness-105 transition-all"
        href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon name="whatsapp" className="text-base" />
        <span>WhatsApp</span>
      </a>
      <Link
        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-lg bg-primary-container text-on-primary font-label-md text-label-md font-semibold text-center hover:bg-primary transition-colors"
        to="/contact-booking"
      >
        <Icon name="calculate" className="text-base" />
        <span>Fare Quote</span>
      </Link>
    </div>
  );
}

