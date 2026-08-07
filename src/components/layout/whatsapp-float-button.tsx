import { MessageCircle } from "lucide-react";
import { whatsappLink, defaultWhatsappMessage } from "@/lib/config";

export function WhatsappFloatButton() {
  return (
    <a
      href={whatsappLink(defaultWhatsappMessage)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      <MessageCircle className="size-7" fill="white" strokeWidth={1.5} />
    </a>
  );
}
