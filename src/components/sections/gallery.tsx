import { ImageIcon } from "lucide-react";

// Placeholder gallery tiles until real clinic photos are supplied.
const placeholderCount = 8;

export function Gallery() {
  return (
    <section className="bg-[var(--cream)] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Our
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-[var(--ink)]">Gallery</h2>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: placeholderCount }).map((_, i) => (
            <div
              key={i}
              className="flex aspect-square items-center justify-center rounded-lg bg-slate-200 text-slate-400"
              title="Clinic photo coming soon"
            >
              <ImageIcon className="size-8" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
