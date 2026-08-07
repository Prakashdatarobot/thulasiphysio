import { Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { testimonials } from "@/content/testimonials";

export function Testimonials() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          What Our Patients Say
        </p>
        <h2 className="mt-2 font-heading text-3xl font-semibold text-[var(--ink)]">
          Hear From Our Happy Patients
        </h2>
      </div>

      <Carousel className="mt-10">
        <CarouselContent>
          {testimonials.map((t, i) => (
            <CarouselItem key={i} className="sm:basis-1/2 lg:basis-1/3">
              <Card className="h-full">
                <CardContent className="flex h-full flex-col pt-6">
                  <Quote className="size-6 text-primary/40" />
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-4 border-t pt-3">
                    <p className="text-sm font-semibold text-[var(--ink)]">
                      {t.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {t.condition}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}
