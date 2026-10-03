import type { Product } from "@/backend";
import { Button } from "@/components/common/Button";
import { ProductCard } from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { PackageSearch } from "lucide-react";

const SKELETON_IDS = Array.from(
  { length: 8 },
  (_, index) => `shop-skeleton-${index}`,
);

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
  onReset: () => void;
}

export function ProductGrid({
  products,
  isLoading,
  onReset,
}: ProductGridProps) {
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        data-ocid="shop.loading_state"
        aria-busy="true"
        aria-label="Chargement des produits"
      >
        {SKELETON_IDS.map((id) => (
          <div
            key={id}
            className="overflow-hidden rounded-2xl border border-border bg-card"
          >
            <Skeleton className="aspect-[4/3] w-full rounded-none" />
            <div className="flex flex-col gap-3 p-4">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-2/3" />
              <Skeleton className="mt-2 h-9 w-full rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-16 text-center"
        data-ocid="shop.empty_state"
      >
        <span className="inline-flex size-14 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
          <PackageSearch className="size-6" aria-hidden="true" />
        </span>
        <div className="max-w-md">
          <h3 className="font-display text-lg font-semibold text-foreground">
            Aucun produit ne correspond
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Essayez un autre mot-clé ou réinitialisez les filtres pour voir tout
            le catalogue.
          </p>
        </div>
        <Button
          variant="secondary"
          onClick={onReset}
          data-ocid="shop.reset_button"
        >
          Réinitialiser les filtres
        </Button>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      data-ocid="shop.product_list"
    >
      {products.map((product, index) => (
        <ProductCard
          key={product.id.toString()}
          product={product}
          index={index}
        />
      ))}
    </div>
  );
}
