import FadeIn from "@/components/FadeIn";
import Slider from "@/components/Slider";

export default function AboutArt() {
  const slides = [
    { src: "/images/slider/1.jpg", alt: "Lighting fixture 1" },
    { src: "/images/slider/2.jpg", alt: "Lighting fixture 2" },
    { src: "/images/slider/3.jpg", alt: "Lighting fixture 3" },
  ];

  return (
    <section id="about" className="bg-neutral-900 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-20 md:grid-cols-2">
        
        {/* Slider (animated) */}
        <FadeIn delay={0.05}>
          <div className="md:order-2">
            <Slider slides={slides} intervalMs={4000} />
          </div>
        </FadeIn>

        {/* Text (animated) */}
        <FadeIn delay={0.12}>
          <div className="md:order-1">
            <div className="text-xs tracking-[0.3em] text-amber-400">
              ABOUT US
            </div>

            <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
              The Art of Lighting
            </h2>

            <p className="mt-4 text-white/70">
              Get a lighting solution that suits your needs.
            </p>

            <h3 className="mt-8 text-xl font-medium text-white md:text-2xl">
              A Curated Collection of Timeless & Modern Lighting
            </h3>

            <p className="mt-4 leading-relaxed text-white/70">
              At Kulminant Lighting, our passion is discovering exceptional
              lighting fixtures from around the globe. We believe the right light
              can transform a space and elevate everyday living.
            </p>

            <p className="mt-4 leading-relaxed text-white/70">
              Every piece is selected for quality, craftsmanship, and design—
              so you can choose with confidence.
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}