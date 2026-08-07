import type { Metadata } from "next";
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { clinic } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${clinic.name} — Best Physiotherapy Clinic in ${clinic.city}`,
  description:
    "Personalized one-on-one physiotherapy for back pain, knee pain, sports injuries, and post-surgery recovery in Irugur, Coimbatore. Book a consultation today.",
  openGraph: {
    title: `${clinic.name} — Best Physiotherapy Clinic in ${clinic.city}`,
    description:
      "Personalized one-on-one physiotherapy for back pain, knee pain, sports injuries, and post-surgery recovery in Irugur, Coimbatore.",
    type: "website",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  name: clinic.name,
  address: {
    "@type": "PostalAddress",
    streetAddress: clinic.address.line1,
    addressLocality: clinic.area,
    addressRegion: "Tamil Nadu",
    postalCode: "641103",
    addressCountry: "IN",
  },
  telephone: clinic.phoneDisplay,
  url: clinic.googleMapsUrl,
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: clinic.rating.value,
    reviewCount: clinic.rating.count,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
