import { MapPin, Clock, Phone } from "lucide-react";
import { clinic, telLink } from "@/lib/config";

const areasServed = [
  "Irugur",
  "Ondipudur",
  "Singanallur",
  "Peelamedu",
  "Vadavalli",
  "Saravanampatti",
  "RS Puram",
];

export function Location() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Our Location
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold text-[var(--ink)]">
          Find {clinic.name}
        </h2>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2 lg:items-stretch">
        <div className="overflow-hidden rounded-3xl border">
          <iframe
            title="Clinic location map"
            src={clinic.googleMapsEmbedSrc}
            className="h-full min-h-72 w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="rounded-3xl border bg-white p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <MapPin className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="font-medium text-[var(--ink)]">
                {clinic.address.line1}
              </p>
              <p className="text-sm text-muted-foreground">
                {clinic.address.line2}
              </p>
              <a
                href={clinic.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-1 inline-block text-sm font-medium text-primary hover:underline"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <Phone className="mt-0.5 size-5 shrink-0 text-primary" />
            <a href={telLink} className="text-sm text-slate-700 hover:text-primary">
              {clinic.phoneDisplay}
            </a>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <Clock className="mt-0.5 size-5 shrink-0 text-primary" />
            <div>
              <p className="text-sm text-slate-700">{clinic.hours.weekday}</p>
              <p className="text-xs text-muted-foreground">
                {clinic.hours.note}
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-[var(--ink)]">
              Areas We Serve
            </p>
            <div className="mt-2 flex flex-wrap gap-2">
              {areasServed.map((area) => (
                <span
                  key={area}
                  className="rounded-full bg-secondary px-3 py-1 text-xs text-secondary-foreground"
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
