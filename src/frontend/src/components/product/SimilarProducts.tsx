import { SectionHeading } from "@/components/common/SectionHeading";
import { ProductCard } from "@/components/product/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProductsByCategory } from "@/hooks/useCatalog";

interface SimilarProductsProps {
  categoryId: string;
  currentProductId: bigint;
}

export function SimilarProducts({
  categoryId,
  currentProductId,
}: SimilarProductsProps) {
  const { data, isLoading } = useProductsByCategory(categoryId);

  const similar = (data ?? [])
    .filter((product) => product.id !== currentProductId)
    .slice(0, 4);

  if (!isLoading && similar.length === 0) return null;

  return (
    <section
      data-ocid="product.similar.section"
      className="flex flex-col gap-6"
    >
      <SectionHeading
        eyebrow="Vous aimerez aussi"
        title="Produits similaires"
        description="D'autres références de la même catégorie pour compléter votre setup."
      />

      {isLoading ? (
        <div
          data-ocid="product.similar.loading_state"
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {Array.from({ length: 4 }, (_, i) => `similar-skeleton-${i}`).map(
            (id) => (
              <div
                key={id}
                className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-4"
              >
                <Skeleton className="aspect-[4/3] w-full rounded-xl" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ),
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {similar.map((product, index) => (
            <ProductCard
              key={product.id.toString()}
              product={product}
              index={index}
            />
          ))}
        </div>
      )}
    </section>
  );
}
