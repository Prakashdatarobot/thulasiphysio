import { clinic } from "@/lib/config";

const founderInitials = clinic.founder.name
  .replace(/^Dr\.\s*/i, "")
  .split(" ")
  .map((n) => n[0])
  .join("")
  .slice(0, 2)
  .toUpperCase();

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            About
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-[var(--ink)]">
            {clinic.name}
          </h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            At {clinic.name}, we focus on treating the root cause of pain
            rather than just the symptoms — helping patients recover
            mobility and stay pain-free long term. Our approach combines
            clinical expertise, hands-on therapy, and guided exercises to
            support safe, sustainable recovery.
          </p>
          <p className="mt-4 leading-relaxed text-slate-600">
            From injury rehabilitation to long-term pain management, we
            offer personalized, one-on-one physiotherapy care for every
            patient who walks through our doors in {clinic.area},{" "}
            {clinic.city}.
          </p>
        </div>

        <div className="rounded-2xl border bg-[var(--cream)] p-6 sm:p-8">
          <div className="flex items-center gap-4">
            <div
              className="flex size-20 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary"
              aria-hidden="true"
              title="Founder photo coming soon"
            >
              {founderInitials}
            </div>
            <div>
              <h3 className="font-bold text-[var(--ink)]">
                {clinic.founder.name}
              </h3>
              <p className="text-sm font-medium text-primary">
                {clinic.founder.title}
              </p>
            </div>
          </div>
          <p className="mt-4 text-sm text-slate-600">
            {clinic.founder.credentials}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            Specialized in orthopaedic and manual therapy techniques,
            focused on identifying the root cause of pain and building
            personalized recovery plans for long-term relief.
          </p>
        </div>
      </div>
    </section>
  );
}
