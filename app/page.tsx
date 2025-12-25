import Hero from "@/components/sections/Hero";
import AboutArt from "@/components/sections/AboutArt";
import WhyUs from "@/components/sections/WhyUs";
import Collections from "@/components/sections/Collections";
import ContactForm from "@/components/sections/ContactForm";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutArt />
      <WhyUs />
      <Collections />

      <section id="contact" className="mx-auto max-w-6xl px-6 py-24">
        <h2 className="text-3xl font-semibold text-white">Contact</h2>
        <p className="mt-2 text-white/60">
          Tell us about your project and we’ll get back to you.
        </p>

        <ContactForm />
      </section>
    </>
  );
}
