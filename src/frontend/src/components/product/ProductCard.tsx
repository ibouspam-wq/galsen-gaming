import { Availability, type Product } from "@/backend";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import {
  availabilityLabel,
  availabilityTone,
  isAvailable,
  productImage,
} from "@/lib/catalog";
import {
  discountLabel,
  formatCount,
  formatPrice,
  formatRating,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { ShoppingCart, Star } from "lucide-react";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

const toneClasses: Record<"success" | "warning" | "destructive", string> = {
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  destructive: "border-destructive/40 bg-destructive/10 text-destructive",
};

export function ProductCard({
  product,
  index = 0,
  className,
}: ProductCardProps) {
  const { addItem } = useCart();
  const available = isAvailable(product);
  const hasPromo = product.discountPercent > 0n;
  const tone = availabilityTone(product.availability);

  return (
    <article
      data-ocid={`product.card.${index + 1}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-fast hover:border-primary/50 hover:shadow-elevated",
        className,
      )}
    >
      <Link
        to="/produit/$id"
        params={{ id: product.id.toString() }}
        className="relative block aspect-[4/3] overflow-hidden bg-muted"
        aria-label={`Voir ${product.name}`}
      >
        <img
          src={productImage(product)}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {hasPromo ? (
            <Badge className="rounded-full border-accent/40 bg-accent/15 text-accent">
              {discountLabel(product.discountPercent)}
            </Badge>
          ) : null}
          {product.availability === Availability.lowStock ? (
            <Badge className="rounded-full border-warning/40 bg-warning/15 text-warning">
              Stock limité
            </Badge>
          ) : null}
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <Star
              className="size-3.5 fill-warning text-warning"
              aria-hidden="true"
            />
            <span className="font-mono text-foreground">
              {formatRating(product.rating)}
            </span>
          </span>
          <span aria-hidden="true">·</span>
          <span>{formatCount(product.reviewCount)} avis</span>
        </div>

        <h3 className="font-display text-base font-semibold leading-snug text-foreground">
          <Link
            to="/produit/$id"
            params={{ id: product.id.toString() }}
            className="transition-fast hover:text-primary"
          >
            {product.name}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm text-muted-foreground">
          {product.description}
        </p>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg font-semibold text-foreground">
              {formatPrice(product.price)}
            </span>
            {product.oldPrice !== undefined ? (
              <span className="font-mono text-sm text-muted-foreground line-through">
                {formatPrice(product.oldPrice)}
              </span>
            ) : null}
          </div>

          <div className="flex items-center justify-between gap-2">
            <span
              className={cn(
                "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
                toneClasses[tone],
              )}
            >
              {availabilityLabel(product.availability)}
            </span>
            <Button
              size="sm"
              variant={available ? "primary" : "secondary"}
              disabled={!available}
              data-ocid={`product.add_button.${index + 1}`}
              onClick={() => addItem(product)}
              aria-label={`Ajouter ${product.name} au panier`}
            >
              <ShoppingCart aria-hidden="true" />
              Ajouter
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
