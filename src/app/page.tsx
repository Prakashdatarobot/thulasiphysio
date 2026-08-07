import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WhatsappFloatButton } from "@/components/layout/whatsapp-float-button";
import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Techniques } from "@/components/sections/techniques";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { Gallery } from "@/components/sections/gallery";
import { Faq } from "@/components/sections/faq";
import { Location } from "@/components/sections/location";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <About />
        <Services />
        <Techniques />
        <WhyChooseUs />
        <Testimonials />
        <Gallery />
        <Faq />
        <Location />
      </main>
      <Footer />
      <WhatsappFloatButton />
    </>
  );
}
