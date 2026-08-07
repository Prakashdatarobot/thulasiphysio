import Link from "next/link";
import { Phone, MapPin, Clock } from "lucide-react";
import { clinic, telLink } from "@/lib/config";

const quickLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#services", label: "Services" },
  { href: "#approach", label: "Our Approach" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--ink)] text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-bold text-white">{clinic.name}</h3>
            <p className="mt-3 text-sm leading-relaxed">
              Personalized, one-on-one physiotherapy care for back pain, joint
              pain, sports injuries, and post-surgery recovery in {clinic.area},{" "}
              {clinic.city}.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h4>
            <ul className="mt-3 space-y-2 text-sm">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <Link href="/privacy-policy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h4>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" />
                <span>
                  {clinic.address.line1}, {clinic.address.line2}
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" />
                <a href={telLink} className="hover:text-white">
                  {clinic.phoneDisplay}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="size-4 shrink-0" />
                <span>{clinic.hours.weekday}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-slate-400">
          © {new Date().getFullYear()} {clinic.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
