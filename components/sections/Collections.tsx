import Image from "next/image";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";

const collections = [
  {
    title: "Overhead Lighting",
    href: "/products?category=overhead",
    img: "/images/collections/overhead.jpg",
  },
  {
    title: "Wall & Bathroom Lighting",
    href: "/products?category=wall-bath",
    img: "/images/collections/wall-bath.jpg",
  },
  {
    title: "Decorative / Statement",
    href: "/products?category=decorative",
    img: "/images/collections/decorative.jpg",
  },
  {
    title: "LED & Architectural",
    href: "/products?category=led-architectural",
    img: "/images/collections/led.jpg",
  },
];

export default function Collections() {
  return (
    <section id="collections" className="bg-neutral-950 text-white">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <FadeIn>
          <div className="flex items-end justify-between gap-6">
            <div>
              <div className="text-xs tracking-[0.35em] text-amber-400">
                COLLECTIONS
              </div>
              <h2 className="mt-4 text-4xl font-semibold md:text-5xl">
                Explore by category
              </h2>
              <p className="mt-4 max-w-2xl text-white/70 leading-relaxed">
                Curated categories designed for modern interiors and
                professional projects.
              </p>
            </div>

            <Link
              href="/products"
              className="hidden rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-white/40 md:inline-flex"
            >
              View all products
            </Link>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((c, i) => (
            <FadeIn key={c.title} delay={0.06 + i * 0.06}>
              <Link
                href={c.href}
                className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5"
              >
                <div className="relative aspect-[4/5] w-full">
                  <Image
                    src={c.img}
                    alt={c.title}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                </div>

                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="text-sm font-semibold">{c.title}</div>
                  <div className="mt-1 text-xs text-white/70">
                    Browse collection →
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <div className="mt-10 md:hidden">
          <Link
            href="/products"
            className="inline-flex rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:border-white/40"
          >
            View all products
          </Link>
        </div>
      </div>
    </section>
  );
}
