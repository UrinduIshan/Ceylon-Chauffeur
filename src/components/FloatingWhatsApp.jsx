import React from "react";
import { DRIVER_INFO } from "../data/constants";
import Icon from "./Icon";

export default function FloatingWhatsApp() {
  return (
    <aside className="fixed right-5 bottom-20 md:bottom-8 z-40 flex items-center gap-2 group">
      <div className="hidden md:flex opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none bg-inverse-surface text-inverse-on-surface font-label-sm text-label-sm px-3.5 py-1.5 rounded-lg shadow-lg whitespace-nowrap">
        Chat with Driver Harindu now
      </div>
      <a
        aria-label="Chat with Driver Harindu on WhatsApp"
        className="whatsapp-pulse flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-on-primary transition-transform hover:scale-110 active:scale-95 shadow-lg"
        href={`https://wa.me/${DRIVER_INFO.phone.replace("+", "")}?text=Hi%20CeylonDrive,%20I'm%20planning%20my%20trip%20to%20Sri%20Lanka`}
        rel="noopener noreferrer"
        target="_blank"
      >
        <Icon name="whatsapp" className="text-3xl leading-none" />
      </a>
    </aside>
  );
}

