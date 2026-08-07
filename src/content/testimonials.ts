export type Testimonial = {
  name: string;
  condition: string;
  quote: string;
};

// Placeholder testimonials for v1 (spec §12 — clinic asked to use generic
// placeholders for now). Themes reflect the real condition mix seen in the
// clinic's live Google reviews (neck pain, disc bulge/lower back, shoulder
// pain) so the copy reads realistically until swapped for real quotes.
export const testimonials: Testimonial[] = [
  {
    name: "Patient Name",
    condition: "Neck Pain & Stiffness",
    quote:
      "I had constant neck pain from long hours at a desk job. After a few sessions with a clear treatment plan, the pain reduced significantly and I could work comfortably again.",
  },
  {
    name: "Patient Name",
    condition: "Lower Back Pain (Disc Bulge)",
    quote:
      "I was struggling with lower back pain that made sitting and standing difficult. The root cause was explained clearly and the guided exercises helped me recover step by step.",
  },
  {
    name: "Patient Name",
    condition: "Shoulder Pain",
    quote:
      "My shoulder pain had limited my movement for weeks. The hands-on therapy combined with exercises brought real relief within just a few visits.",
  },
  {
    name: "Patient Name",
    condition: "Post-Surgery Recovery",
    quote:
      "The personalized rehabilitation plan after my surgery was easy to follow and the guidance throughout my recovery gave me confidence to get back to normal activity.",
  },
  {
    name: "Patient Name",
    condition: "Sports Injury",
    quote:
      "After a muscle strain from training, I got a thorough assessment and a recovery plan that let me return to my routine safely without recurring pain.",
  },
];
