import { Button } from "@/components/common/Button";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductReviews } from "@/components/product/ProductReviews";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { SimilarProducts } from "@/components/product/SimilarProducts";
import { Skeleton } from "@/components/ui/skeleton";
import { useProduct } from "@/hooks/useCatalog";
import { Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, PackageX } from "lucide-react";

export function ProductPage() {
  const { id } = useParams({ from: "/produit/$id" });
  const productId = /^\d+$/.test(id) ? BigInt(id) : undefined;
  const { data: product, isLoading } = useProduct(productId);

  if (isLoading) {
    return (
      <div
        data-ocid="product.loading_state"
        className="mx-auto w-full max-w-7xl px-4 py-10 md:px-8"
      >
        <div className="grid gap-10 lg:grid-cols-2">
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="flex flex-col gap-4">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        data-ocid="product.not_found_state"
        className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 px-4 py-24 text-center md:px-8"
      >
        <span className="flex size-16 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
          <PackageX className="size-8" aria-hidden="true" />
        </span>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Produit introuvable
        </h1>
        <p className="max-w-md text-muted-foreground">
          Ce produit n'existe plus ou a été retiré du catalogue. Découvrez nos
          autres références gaming premium.
        </p>
        <Button asChild size="lg">
          <Link
            to="/boutique"
            search={{}}
            data-ocid="product.back_to_shop_button"
          >
            <ArrowLeft aria-hidden="true" />
            Retour à la boutique
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div data-ocid="product.page" className="flex flex-col">
      <div className="mx-auto w-full max-w-7xl px-4 py-8 md:px-8 md:py-12">
        <nav
          aria-label="Fil d'Ariane"
          className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
        >
          <Link to="/" className="transition-fast hover:text-primary">
            Accueil
          </Link>
          <span aria-hidden="true">/</span>
          <Link
            to="/boutique"
            search={{}}
            className="transition-fast hover:text-primary"
          >
            Boutique
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <ProductGallery images={product.images} name={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-4 py-12 md:px-8 md:py-16">
        <ProductSpecs features={product.features} />
        <ProductReviews
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
        <SimilarProducts
          categoryId={product.categoryId}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}
