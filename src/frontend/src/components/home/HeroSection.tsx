import { Button } from "@/components/common/Button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Tag } from "lucide-react";

export function HeroSection() {
  return (
    <section
      data-ocid="home.hero.section"
      className="relative isolate overflow-hidden border-b border-border"
    >
      <img
        src="/assets/generated/hero-gaming-setup.dim_1600x900.jpg"
        alt="Setup gaming premium éclairé en violet et bleu électrique"
        className="absolute inset-0 -z-20 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-background via-background/85 to-background/40" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-background via-transparent to-background/60" />
      <div
        aria-hidden="true"
        className="absolute -left-24 top-1/3 -z-10 size-72 rounded-full bg-primary/25 blur-3xl animate-pulse-glow"
      />

      <div className="container flex min-h-[78vh] flex-col justify-center py-20 md:min-h-[86vh] md:py-28">
        <div className="max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
            <Sparkles className="size-3.5" aria-hidden="true" />
            Matériel gaming premium
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold uppercase leading-[1.05] tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Ton setup.
            <br />
            Ton jeu.
            <br />
            <span className="text-gradient-primary">Ton style.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg">
            Découvre du matériel gaming pensé pour améliorer ton setup et tes
            sessions de jeu.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild size="lg" data-ocid="home.hero.primary_button">
              <Link to="/boutique" search={{}}>
                Découvrir les produits
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="secondary"
              data-ocid="home.hero.secondary_button"
            >
              <Link to="/promotions">
                <Tag aria-hidden="true" />
                Voir les offres
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
