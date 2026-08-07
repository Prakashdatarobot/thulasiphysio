import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/content/faq";

export function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-16">
      <div className="text-center">
        <h2 className="font-heading text-3xl font-semibold text-[var(--ink)]">
          Frequently Asked Questions
        </h2>
      </div>

      <Accordion type="single" collapsible className="mt-8">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
