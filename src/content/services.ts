export type Service = {
  slug: string;
  title: string;
  description: string;
};

// Full confirmed list of services/conditions (spec §6.3, §12) — used for the
// "Conditions We Treat" tag cloud and as the booking form's condition options.
export const allConditions: string[] = [
  "Arthritis Treatment",
  "Back Pain",
  "Balance Exercise Therapy",
  "Chiropractor",
  "Foot and Ankle Pain",
  "Geriatric Physiotherapy",
  "Heat Therapy",
  "Hip Pain",
  "Hydrotherapy Training",
  "Knee Pain",
  "Massage",
  "Neurological Physiotherapy",
  "Orthopaedics",
  "Paediatric Physiotherapy",
  "Physical Therapy",
  "Post-Surgery",
  "Post-Surgical Rehabilitation",
  "Shoulder Pain",
  "Spinal Injuries",
  "Therapeutic Exercise",
  "Vestibular Rehabilitation",
];

// Curated subset for the featured Services grid (spec §6.3).
export const featuredServices: Service[] = [
  {
    slug: "orthopaedics",
    title: "Orthopaedics",
    description:
      "Treatment for back pain, neck pain, joint conditions, and musculoskeletal injuries.",
  },
  {
    slug: "neurological-physiotherapy",
    title: "Neurological Physiotherapy",
    description:
      "Specialized rehabilitation for stroke recovery, nerve injuries, and neurological conditions.",
  },
  {
    slug: "post-surgical-rehabilitation",
    title: "Post-Surgical Rehabilitation",
    description:
      "Structured recovery programs to restore strength and mobility after surgery.",
  },
  {
    slug: "geriatric-physiotherapy",
    title: "Geriatric Physiotherapy",
    description:
      "Gentle, tailored care to improve mobility, balance, and independence in older adults.",
  },
  {
    slug: "paediatric-physiotherapy",
    title: "Paediatric Physiotherapy",
    description:
      "Focused therapy to support healthy movement and development in children.",
  },
  {
    slug: "chiropractor",
    title: "Chiropractic Correction",
    description:
      "Manual adjustment techniques to correct alignment and relieve chronic pain.",
  },
  {
    slug: "hydrotherapy-training",
    title: "Hydrotherapy Training",
    description:
      "Water-based therapeutic exercise for low-impact strength and mobility recovery.",
  },
  {
    slug: "vestibular-rehabilitation",
    title: "Vestibular Rehabilitation",
    description:
      "Targeted exercises to treat dizziness, imbalance, and inner-ear related conditions.",
  },
];
