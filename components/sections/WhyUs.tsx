import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const bullets = [
  {
    title: "Curated collections",
    text: "Carefully selected fixtures for modern and timeless interiors.",
  },
  {
    title: "Project support",
    text: "We work closely with architects and partners on every detail.",
  },
  {
    title: "Reliable sourcing",
    text: "Trusted manufacturers with consistent quality and availability.",
  },
  {
    title: "Fast communication",
    text: "Clear quotes, specs, and responses without delays.",
  },
];

export default function WhyUs() {
  return (
    <section className="bg-neutral-950 text-white">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 md:grid-cols-2">
        {/* Image (animated) */}
        <FadeIn delay={0.05}>
          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <div className="relative aspect-[4/5] w-full">
              <Image
                src="/images/why-us.jpg"
                alt="Premium lighting interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 520px"
              />
              <div className="absolute inset-0 bg-black/20" />
            </div>
          </div>
        </FadeIn>

        {/* Text (animated) */}
        <FadeIn delay={0.12}>
          <div>
            <div className="text-[11px] tracking-[0.4em] text-amber-400/90">
              WHY SHOP WITH US
            </div>

            <h2 className="mt-5 text-4xl font-semibold md:text-6xl">
              Lighting that elevates every space
            </h2>

            <p className="mt-6 max-w-xl leading-relaxed text-white/65">
              We focus on design integrity, material quality, and professional
              support. From single fixtures to complete projects, we guide every
              step.
            </p>

            <div className="mt-10 space-y-4">
              {bullets.map((b) => (
                <div
                  key={b.title}
                  className="rounded-xl border border-white/10 bg-white/5 p-5 transition-colors duration-300 hover:border-white/15 hover:bg-white/7"
                >
                  <div className="text-sm font-semibold text-white">
                    {b.title}
                  </div>
                  <div className="mt-2 text-sm leading-relaxed text-white/65">
                    {b.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
