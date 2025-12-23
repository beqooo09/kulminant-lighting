import Hero from "@/components/sections/Hero";
import AboutArt from "@/components/sections/AboutArt";
import WhyUs from "@/components/sections/WhyUs";

export default function HomePage() {
  return (
    <>
      <Hero />
      <AboutArt />
      <WhyUs />

      <section id="contact" className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-3xl font-bold">Contact</h2>
        <p className="mt-2 text-neutral-600">
          Later we will add the contact + quote form here.
        </p>
      </section>
    </>
  );
}
