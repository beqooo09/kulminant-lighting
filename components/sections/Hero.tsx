import FadeIn from "@/components/FadeIn";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      />

      {/* Premium overlay: dark + soft gradient */}
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-black/10" />

      <div className="relative mx-auto max-w-6xl px-6 py-8">
        {/* Top bar */}
        <header className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center border border-white/40 text-white font-bold tracking-widest">
              KL
            </div>
            <div className="leading-tight">
              <div className="text-white font-semibold">Kulminant</div>
              <div className="text-xs tracking-[0.25em] text-white/70">
                LIGHTING
              </div>
            </div>
          </Link>

          <nav className="hidden items-center gap-7 text-sm text-white/80 md:flex">
            <a className="hover:text-white" href="#about">
              About
            </a>
            <Link className="hover:text-white" href="/products">
              Products
            </Link>
            <a className="hover:text-white" href="#contact">
              Contact
            </a>

            {/* Future: partners */}
            <Link
              href="/login"
              className="rounded-md border border-white/25 px-3 py-2 text-xs font-semibold text-white hover:border-white/50"
            >
              Architects / Partners
            </Link>
          </nav>
        </header>

        {/* Content */}
        <div className="mt-20 max-w-xl">
          <FadeIn delay={0.05}>
            <div className="text-xs tracking-[0.35em] text-amber-300/90">
              WELCOME TO
            </div>

            <h1 className="mt-4 text-4xl font-semibold text-white md:text-6xl">
              Kulminant Lighting
            </h1>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="mt-5 max-w-lg text-base leading-relaxed text-white/70">
              A curated collection of timeless & modern lighting. Browse our
              collections or request a quote for your project.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#collections"
                className="rounded-md bg-amber-600 px-6 py-3 text-sm font-semibold text-black hover:bg-amber-500"
              >
                Explore Collections
              </a>

              <Link
                href="/contact"
                className="rounded-md border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:border-white/60"
              >
                Request a Quote
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
