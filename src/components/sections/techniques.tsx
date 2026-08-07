import { CheckCircle2 } from "lucide-react";
import { techniques } from "@/content/techniques";

export function Techniques() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold text-[var(--ink)]">
          Treatment Techniques We Use
        </h2>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {techniques.map((technique) => (
          <div
            key={technique}
            className="flex items-center gap-2 rounded-lg border bg-white p-4"
          >
            <CheckCircle2 className="size-5 shrink-0 text-primary" />
            <span className="text-sm font-medium text-slate-700">
              {technique}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
