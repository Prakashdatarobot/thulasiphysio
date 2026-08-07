"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { allConditions } from "@/content/services";
import { whatsappLink } from "@/lib/config";
import { bookingSchema } from "@/lib/validation";

type Props = {
  sourceSection: string;
  className?: string;
};

type FormState = {
  name: string;
  phone: string;
  condition: string;
  preferredDateTime: string;
  notes: string;
  company: string; // honeypot
};

const initialState: FormState = {
  name: "",
  phone: "",
  condition: "",
  preferredDateTime: "",
  notes: "",
  company: "",
};

export function BookingForm({ sourceSection, className }: Props) {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const [warning, setWarning] = useState<string | null>(null);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const result = bookingSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus("submitting");
    setWarning(null);

    const message = [
      "Hi, I'd like to book a physiotherapy consultation.",
      `Name: ${result.data.name}`,
      `Condition: ${result.data.condition}`,
      `Preferred Date/Time: ${result.data.preferredDateTime}`,
      result.data.notes ? `Notes: ${result.data.notes}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    // Open the WhatsApp tab synchronously, in the same event-handler tick as
    // the click, so browsers don't treat it as a blocked popup — opening it
    // after an `await` breaks the user-gesture chain and gets silently
    // blocked in most browsers.
    const waWindow = window.open("", "_blank", "noopener,noreferrer");
    if (waWindow) {
      waWindow.location.href = whatsappLink(message);
    }

    let sheetWritten = false;
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...result.data, sourceSection }),
      });
      const data = await res.json();
      sheetWritten = Boolean(data?.sheetWritten);
    } catch {
      sheetWritten = false;
    }

    if (!sheetWritten) {
      setWarning(
        "We couldn't confirm your booking automatically, but we've opened WhatsApp so you can send us your details directly.",
      );
    }

    setStatus("success");
    setForm(initialState);
  }

  if (status === "success") {
    return (
      <div className={className}>
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-6 text-center">
          <h3 className="text-lg font-semibold text-primary">
            Thanks! We&apos;ll confirm your slot shortly.
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            We&apos;ve also opened WhatsApp with your details pre-filled — just hit
            send so our team can follow up right away.
          </p>
          {warning && (
            <p className="mt-2 text-sm text-amber-600">{warning}</p>
          )}
          <Button
            variant="outline"
            size="sm"
            className="mt-4"
            onClick={() => setStatus("idle")}
          >
            Book another appointment
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={className} noValidate>
      {/* Honeypot field — hidden from real users, bots often fill it in */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`company-${sourceSection}`}>Company</label>
        <input
          id={`company-${sourceSection}`}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.company}
          onChange={(e) => update("company", e.target.value)}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor={`name-${sourceSection}`}>Full Name</Label>
        <Input
          id={`name-${sourceSection}`}
          placeholder="Your full name"
          value={form.name}
          onChange={(e) => update("name", e.target.value)}
        />
        {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor={`phone-${sourceSection}`}>
          Phone <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`phone-${sourceSection}`}
          type="tel"
          placeholder="+91 0000000000"
          value={form.phone}
          onChange={(e) => update("phone", e.target.value)}
        />
        {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
      </div>

      <div className="mt-4 space-y-1.5">
        <Label>
          Select Your Pain / Condition <span className="text-destructive">*</span>
        </Label>
        <Select
          value={form.condition}
          onValueChange={(v) => update("condition", v)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select your condition" />
          </SelectTrigger>
          <SelectContent>
            {allConditions.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
        {errors.condition && (
          <p className="text-xs text-destructive">{errors.condition}</p>
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor={`datetime-${sourceSection}`}>
          Preferred Date and Time <span className="text-destructive">*</span>
        </Label>
        <Input
          id={`datetime-${sourceSection}`}
          type="datetime-local"
          value={form.preferredDateTime}
          onChange={(e) => update("preferredDateTime", e.target.value)}
        />
        {errors.preferredDateTime && (
          <p className="text-xs text-destructive">{errors.preferredDateTime}</p>
        )}
      </div>

      <div className="mt-4 space-y-1.5">
        <Label htmlFor={`notes-${sourceSection}`}>
          Describe Your Symptoms (Optional)
        </Label>
        <Textarea
          id={`notes-${sourceSection}`}
          placeholder="Any additional details about your condition.."
          value={form.notes}
          onChange={(e) => update("notes", e.target.value)}
        />
      </div>

      <Button
        type="submit"
        size="lg"
        className="mt-5 w-full"
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Booking..." : "Book Your Appointment"}
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground">
        By submitting, you agree to our{" "}
        <a href="/privacy-policy" className="underline hover:text-foreground">
          Privacy Policy
        </a>
        .
      </p>
    </form>
  );
}
