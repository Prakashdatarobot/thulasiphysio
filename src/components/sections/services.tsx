import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { featuredServices, allConditions } from "@/content/services";

export function Services() {
  return (
    <section id="services" className="bg-[var(--cream)] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">
            Physiotherapy
          </p>
          <h2 className="mt-2 font-heading text-3xl font-semibold text-[var(--ink)]">
            Our Services
          </h2>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featuredServices.map((service) => (
            <Card key={service.slug} className="h-full">
              <CardHeader>
                <CardTitle className="text-base">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-14">
          <h3 className="text-center text-lg font-semibold text-[var(--ink)]">
            Conditions We Treat
          </h3>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {allConditions.map((condition) => (
              <Badge
                key={condition}
                variant="secondary"
                className="px-3 py-1.5 text-sm font-normal"
              >
                {condition}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
