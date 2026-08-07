import { Star, Home, Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookingForm } from "@/components/sections/booking-form";
import { clinic, telLink, whatsappLink, defaultWhatsappMessage } from "@/lib/config";

export function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[var(--ink)]"
    >
      {/* Decorative glow shapes */}
      <div className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-primary/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 left-1/4 size-80 rounded-full bg-[var(--cream)]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-primary">
            Best Physiotherapy Clinic in {clinic.city}
          </p>
          <h1 className="mt-4 font-heading text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
            Get Back to a{" "}
            <span className="italic text-primary">Pain-Free</span> Life
          </h1>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white ring-1 ring-white/20">
            <Home className="size-4 text-primary" />
            Home Visits Available Across {clinic.city}
          </div>

          <p className="mt-5 max-w-xl text-lg text-slate-300">
            Personalized one-on-one physiotherapy for back pain, knee pain,
            sports injuries, and post-surgery recovery.
          </p>

          <div className="mt-5 flex items-center gap-2">
            <div className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-5" fill="currentColor" />
              ))}
            </div>
            <span className="text-sm font-medium text-slate-200">
              {clinic.rating.value.toFixed(1)} Google Rated ·{" "}
              {clinic.rating.count}+ Reviews
            </span>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-white/30 bg-transparent text-white hover:bg-white/10 hover:text-white"
            >
              <a href={telLink}>
                <Phone className="size-4" />
                Call Now
              </a>
            </Button>
            <Button asChild size="lg" className="bg-[#25D366] hover:bg-[#1ebe57]">
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

        <div className="relative rounded-3xl bg-white p-6 shadow-2xl sm:p-8">
          <div className="absolute inset-x-6 -top-1 h-1.5 rounded-full bg-primary sm:inset-x-8" />
          <h2 className="font-heading text-xl font-semibold text-[var(--ink)]">
            Book a Consultation
          </h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Same-day slots available · Response within 30 min
          </p>
          <BookingForm sourceSection="hero" className="mt-6" />
        </div>
      </div>
    </section>
  );
}
