"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone, MessageCircle, Clock, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clinic, telLink, whatsappLink, defaultWhatsappMessage } from "@/lib/config";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Our Approach" },
  { href: "#contact", label: "Contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header id="top" className="sticky top-0 z-50 w-full">
      {/* Top info bar */}
      <div className="hidden bg-[var(--ink)] text-slate-200 md:block">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-sm">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {clinic.hours.weekday}
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="size-3.5" />
              {clinic.area}, {clinic.city}
            </span>
          </div>
          <a href={telLink} className="flex items-center gap-1.5 hover:text-white">
            <Phone className="size-3.5" />
            Call for Booking: {clinic.phoneDisplay}
          </a>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link
            href="#top"
            className="font-heading text-lg font-semibold text-[var(--ink)]"
          >
            {clinic.name}
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-700 transition-colors hover:text-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <Button asChild variant="outline" size="sm">
              <a href={telLink}>
                <Phone className="size-4" />
                Call Now
              </a>
            </Button>
            <Button asChild size="sm" className="bg-[#25D366] hover:bg-[#1ebe57]">
              <a
                href={whatsappLink(defaultWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="size-4" />
                WhatsApp
              </a>
            </Button>
          </div>

          <button
            className="lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>

        {open && (
          <div className="border-t bg-white px-4 py-4 lg:hidden">
            <nav className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-slate-700"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-4 flex gap-2">
              <Button asChild variant="outline" size="sm" className="flex-1">
                <a href={telLink}>
                  <Phone className="size-4" />
                  Call Now
                </a>
              </Button>
              <Button asChild size="sm" className="flex-1 bg-[#25D366] hover:bg-[#1ebe57]">
                <a
                  href={whatsappLink(defaultWhatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="size-4" />
                  WhatsApp
                </a>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
