import { z } from "zod";

export const bookingSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+91[\s-]?)?[6-9]\d{9}$/, "Enter a valid 10-digit Indian mobile number"),
  condition: z.string().trim().min(1, "Please select your condition"),
  preferredDateTime: z.string().trim().min(1, "Please choose a preferred date and time"),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
  // Honeypot: must stay empty. Bots that autofill every field will trip it.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type BookingInput = z.infer<typeof bookingSchema>;
