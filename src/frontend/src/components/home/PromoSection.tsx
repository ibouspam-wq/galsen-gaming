import { Button } from "@/components/common/Button";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";

export function PromoSection() {
  return (
    <section
      data-ocid="home.promo.section"
      className="border-b border-border bg-background py-16 md:py-24"
    >
      <div className="container">
        <div className="relative isolate overflow-hidden rounded-3xl border border-primary/30 bg-card px-6 py-14 md:px-16 md:py-20">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-20 -z-10 size-72 rounded-full bg-primary/25 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-16 -z-10 size-72 rounded-full bg-accent/20 blur-3xl"
          />

          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
              <Zap className="size-3.5" aria-hidden="true" />
              Offres du moment
            </span>
            <h2 className="mt-6 font-display text-3xl font-bold uppercase tracking-tight text-foreground md:text-5xl">
              Améliore ton setup
            </h2>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              Tout ce qu'il faut pour construire ton espace gaming.
            </p>
            <div className="mt-9">
              <Button asChild size="lg" data-ocid="home.promo.button">
                <Link to="/promotions">
                  Découvrir
                  <ArrowRight aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
