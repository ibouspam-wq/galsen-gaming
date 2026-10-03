import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { usePromoProducts } from "@/hooks/useCatalog";
import { formatPrice } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Flame, Percent, Sparkles, Tag } from "lucide-react";

const perks = [
  {
    icon: Percent,
    title: "Jusqu'à -40 %",
    description:
      "Des remises réelles sur une sélection renouvelée chaque semaine.",
  },
  {
    icon: Tag,
    title: "Prix barré transparent",
    description:
      "Le prix d'origine reste affiché pour comparer l'économie en un coup d'œil.",
  },
  {
    icon: Sparkles,
    title: "Matériel premium",
    description:
      "Uniquement des références testées et garanties, jamais de déstockage douteux.",
  },
];

function PromoSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }, (_, i) => `promo-skeleton-${i}`).map((id) => (
        <div
          key={id}
          className="h-[420px] animate-pulse rounded-2xl border border-border bg-card"
        />
      ))}
    </div>
  );
}

export function PromotionsPage() {
  const { data: products, isLoading, isError, refetch } = usePromoProducts();

  const list = products ?? [];
  const bestDiscount = list.reduce(
    (max, product) =>
      product.discountPercent > max ? product.discountPercent : max,
    0n,
  );
  const bestSaving = list.reduce((max, product) => {
    if (product.oldPrice === undefined) return max;
    const saving = product.oldPrice - product.price;
    return saving > max ? saving : max;
  }, 0n);

  return (
    <div className="container flex flex-col gap-14 py-14 md:py-20">
      <section
        data-ocid="promotions.hero.section"
        className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 md:px-12 md:py-16"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-primary/20 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-32 -left-16 size-72 rounded-full bg-accent/15 blur-3xl"
        />
        <div className="relative max-w-2xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            <Flame className="size-3.5" aria-hidden="true" />
            Offres du moment
          </p>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
            Promotions{" "}
            <span className="text-gradient-primary">Galsen Gaming</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground md:text-lg">
            Les meilleures remises sur une sélection de matériel gaming premium.
            Stocks limités, premiers arrivés, premiers servis.
          </p>
          <div className="mt-8 flex flex-wrap gap-8">
            <div>
              <p className="font-mono text-2xl font-semibold text-foreground md:text-3xl">
                {list.length}
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Offres actives
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold text-primary md:text-3xl">
                {bestDiscount > 0n ? `-${bestDiscount.toString()}%` : "—"}
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Meilleure remise
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold text-accent md:text-3xl">
                {bestSaving > 0n ? formatPrice(bestSaving) : "—"}
              </p>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">
                Économie max.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {perks.map((perk) => (
          <div
            key={perk.title}
            className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
          >
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
              <perk.icon className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-display text-base font-semibold text-foreground">
                {perk.title}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {perk.description}
              </p>
            </div>
          </div>
        ))}
      </section>

      <section className="flex flex-col gap-8">
        <SectionHeading
          eyebrow="Sélection"
          title="Produits en promotion"
          description="Prix barré et réduction affichés directement sur chaque carte."
          action={
            <Button asChild variant="secondary">
              <Link to="/boutique" search={{}}>
                Voir tout le catalogue
              </Link>
            </Button>
          }
        />

        {isLoading ? (
          <div data-ocid="promotions.loading_state">
            <PromoSkeleton />
          </div>
        ) : isError ? (
          <div
            data-ocid="promotions.error_state"
            className="flex flex-col items-center gap-4 rounded-2xl border border-destructive/40 bg-destructive/5 px-6 py-14 text-center"
          >
            <h3 className="font-display text-lg font-semibold text-foreground">
              Impossible de charger les promotions
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              Une erreur est survenue lors de la récupération des offres.
              Réessayez dans un instant.
            </p>
            <Button
              data-ocid="promotions.retry_button"
              onClick={() => void refetch()}
            >
              Réessayer
            </Button>
          </div>
        ) : list.length === 0 ? (
          <div
            data-ocid="promotions.empty_state"
            className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-6 py-16 text-center"
          >
            <span className="flex size-14 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
              <Tag className="size-6" aria-hidden="true" />
            </span>
            <h3 className="font-display text-lg font-semibold text-foreground">
              Aucune promotion en cours
            </h3>
            <p className="max-w-md text-sm text-muted-foreground">
              De nouvelles offres arrivent très bientôt. En attendant, explorez
              l'ensemble de notre catalogue.
            </p>
            <Button asChild>
              <Link to="/boutique" search={{}}>
                Explorer la boutique
              </Link>
            </Button>
          </div>
        ) : (
          <div
            data-ocid="promotions.list"
            className={cn(
              "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
            )}
          >
            {list.map((product, index) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
