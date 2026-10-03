import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { usePopularProducts } from "@/hooks/useCatalog";
import { Link } from "@tanstack/react-router";
import { ArrowRight, PackageOpen } from "lucide-react";

const SKELETON_IDS = Array.from(
  { length: 4 },
  (_, index) => `popular-skeleton-${index}`,
);

export function PopularProductsSection() {
  const { data: products, isLoading, isError } = usePopularProducts(8);

  return (
    <section
      data-ocid="home.popular.section"
      className="border-b border-border bg-muted/30 py-16 md:py-24"
    >
      <div className="container flex flex-col gap-10">
        <SectionHeading
          eyebrow="Sélection"
          title="Produits populaires"
          description="Les références les plus demandées par notre communauté de joueurs."
          action={
            <Button asChild variant="secondary" data-ocid="home.popular.link">
              <Link to="/boutique" search={{}}>
                Voir la boutique
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        {isLoading ? (
          <div
            data-ocid="home.popular.loading_state"
            className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {SKELETON_IDS.map((id) => (
              <div
                key={id}
                className="h-80 animate-pulse rounded-2xl border border-border bg-card"
              />
            ))}
          </div>
        ) : isError ? (
          <div
            data-ocid="home.popular.error_state"
            className="rounded-2xl border border-destructive/40 bg-destructive/5 p-8 text-center"
          >
            <p className="text-sm text-muted-foreground">
              Impossible de charger les produits pour le moment. Réessaie dans
              un instant.
            </p>
          </div>
        ) : products && products.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id.toString()}
                product={product}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div
            data-ocid="home.popular.empty_state"
            className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card p-12 text-center"
          >
            <span className="inline-flex size-12 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-primary">
              <PackageOpen className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="font-display text-lg font-semibold text-foreground">
                Aucun produit pour le moment
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Notre catalogue arrive très bientôt. Reviens vite découvrir la
                sélection.
              </p>
            </div>
            <Button asChild data-ocid="home.popular.empty_button">
              <Link to="/boutique" search={{}}>
                Explorer la boutique
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
