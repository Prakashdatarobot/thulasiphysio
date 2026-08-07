export const clinic = {
  name: "Thulasi Physiotherapy Clinic",
  tagline: "Get Back to a Pain-Free Life",
  city: "Coimbatore",
  area: "Irugur",
  phone: "9944634491",
  phoneDisplay: "+91 99446 34491",
  whatsapp: "919944634491",
  address: {
    line1: "9/46A, Ondipudur Road, Irugur Post",
    line2: "Irugur, Coimbatore, Tamil Nadu 641103",
    full: "9/46A, Ondipudur Road, Irugur Post, Irugur, Coimbatore, Tamil Nadu 641103",
  },
  hours: {
    weekday: "Monday – Saturday, 5:30 PM – 9:00 PM",
    note: "Timings as provided — please call ahead to confirm on public holidays.",
  },
  rating: {
    value: 5.0,
    count: 64,
    source: "Google",
  },
  googleMapsUrl: "https://maps.app.goo.gl/xphKT2Nwmf4SPvm96",
  // TODO: replace with a real embeddable src from Google Maps → Share → Embed a Map
  googleMapsEmbedSrc:
    "https://www.google.com/maps?q=9/46A,+Ondipudur+Road,+Irugur+Post,+Irugur,+Tamil+Nadu+641103&output=embed",
  founder: {
    name: "Dr. Prabhu Mehanathan",
    credentials: "MPT (Ortho), CMT., MMTFI., MIAFT., MIAP., FOMT (Australia)",
    title: "Consultant Physiotherapist",
    // TODO: replace with real photo path once supplied
    photo: "/founder-placeholder.jpg",
  },
  social: {
    // TODO: replace with real links once supplied
    instagram: "",
    facebook: "",
    youtube: "",
    googleBusiness: "https://maps.app.goo.gl/xphKT2Nwmf4SPvm96",
  },
} as const;

export function whatsappLink(message: string) {
  return `https://wa.me/${clinic.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const defaultWhatsappMessage =
  "Hi, I'd like to book a physiotherapy consultation at Thulasi Physiotherapy Clinic.";

export const telLink = `tel:+91${clinic.phone}`;
