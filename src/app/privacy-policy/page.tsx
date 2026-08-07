import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsappFloatButton } from "@/components/layout/whatsapp-float-button";
import { clinic } from "@/lib/config";

export const metadata: Metadata = {
  title: `Privacy Policy — ${clinic.name}`,
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-3xl font-bold text-[var(--ink)]">Privacy Policy</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated: 2026
          </p>

          <div className="mt-8 space-y-6 text-sm leading-relaxed text-slate-600">
            <p>
              {clinic.name} (&ldquo;we&rdquo;, &ldquo;our&rdquo;, &ldquo;us&rdquo;)
              respects your privacy. This policy explains what information we
              collect through this website and how it is used.
            </p>

            <div>
              <h2 className="text-lg font-semibold text-[var(--ink)]">
                Information We Collect
              </h2>
              <p className="mt-2">
                When you submit our booking form, we collect your full name,
                phone number, selected condition, preferred appointment
                date/time, and any symptom details you choose to share.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[var(--ink)]">
                How We Use Your Information
              </h2>
              <p className="mt-2">
                This information is used solely to contact you, confirm your
                appointment, and provide relevant care. Submitted details are
                stored in our internal booking records and may be sent to us
                via WhatsApp to coordinate scheduling.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[var(--ink)]">
                Data Sharing
              </h2>
              <p className="mt-2">
                We do not sell or share your personal information with third
                parties for marketing purposes.
              </p>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-[var(--ink)]">
                Contact Us
              </h2>
              <p className="mt-2">
                For any questions about this policy or your data, contact us
                at {clinic.phoneDisplay}.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsappFloatButton />
    </>
  );
}
