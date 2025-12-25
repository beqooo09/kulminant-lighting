import FadeIn from "@/components/FadeIn";
import Slider from "@/components/Slider";

export default function AboutArt() {
  const slides = [
    { src: "/images/slider/1.jpg", alt: "Lighting fixture 1" },
    { src: "/images/slider/2.jpg", alt: "Lighting fixture 2" },
    { src: "/images/slider/3.jpg", alt: "Lighting fixture 3" },
  ];

  return (
    <section id="about" className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
        {/* Slider (animated) */}
        <FadeIn delay={0.05}>
          <div className="md:order-2">
            <Slider slides={slides} intervalMs={4000} />
          </div>
        </FadeIn>

        {/* Text (animated) */}
        <FadeIn delay={0.12}>
          <div className="md:order-1">
            <div className="text-[11px] tracking-[0.4em] text-amber-400/90">
              ABOUT US
            </div>

            <h2 className="mt-5 text-4xl font-semibold md:text-6xl">
              The Art of Lighting
            </h2>

            <p className="mt-6 text-white/65 leading-relaxed">
              Get a lighting solution that suits your needs.
            </p>

            <h3 className="mt-10 text-lg font-medium text-white/90 md:text-xl">
              A Curated Collection of Timeless & Modern Lighting
            </h3>

            <p className="mt-4 leading-relaxed text-white/65">
              At Kulminant Lighting, our passion is discovering exceptional
              lighting fixtures from around the globe. We believe the right
              light can transform a space and elevate everyday living.
            </p>

            <p className="mt-4 leading-relaxed text-white/65">
              Every piece is selected for quality, craftsmanship, and design—so
              you can choose with confidence.
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
