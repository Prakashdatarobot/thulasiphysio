import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { differentiators } from "@/content/why-choose-us";

export function WhyChooseUs() {
  return (
    <section id="approach" className="bg-[var(--cream)] py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-semibold text-[var(--ink)]">
            Why Choose Us?
          </h2>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {differentiators.map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-base">{item.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
