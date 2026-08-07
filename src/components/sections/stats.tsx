import { Users, Star, UserCheck, CalendarClock } from "lucide-react";
import { clinic } from "@/lib/config";

const stats = [
  {
    icon: Users,
    // TODO: replace with real patient count once confirmed by the clinic
    value: "1000+",
    label: "Patients Treated",
  },
  {
    icon: Star,
    value: `${clinic.rating.value.toFixed(1)}`,
    label: `Google Rating (${clinic.rating.count}+ reviews)`,
  },
  {
    icon: UserCheck,
    value: "100%",
    label: "One-on-One Sessions",
  },
  {
    icon: CalendarClock,
    value: "Flexible",
    label: "Timings",
  },
];

export function Stats() {
  return (
    <section className="border-y bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col items-center text-center">
            <stat.icon className="size-7 text-primary" />
            <div className="mt-2 text-2xl font-bold text-[var(--ink)]">
              {stat.value}
            </div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
