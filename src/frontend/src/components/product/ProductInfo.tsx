import { Availability, type Product } from "@/backend";
import { Button } from "@/components/common/Button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import {
  availabilityLabel,
  availabilityTone,
  isAvailable,
} from "@/lib/catalog";
import {
  discountLabel,
  formatCount,
  formatPrice,
  formatRating,
} from "@/lib/format";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";
import {
  Check,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingCart,
  Star,
  Truck,
} from "lucide-react";
import { useState } from "react";

interface ProductInfoProps {
  product: Product;
}

const toneClasses: Record<"success" | "warning" | "destructive", string> = {
  success: "border-success/40 bg-success/10 text-success",
  warning: "border-warning/40 bg-warning/10 text-warning",
  destructive: "border-destructive/40 bg-destructive/10 text-destructive",
};

export function ProductInfo({ product }: ProductInfoProps) {
  const { addItem } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const available = isAvailable(product);
  const hasPromo = product.discountPercent > 0n;
  const tone = availabilityTone(product.availability);

  const decrease = () => setQuantity((current) => Math.max(1, current - 1));
  const increase = () => setQuantity((current) => Math.min(99, current + 1));

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  const handleBuyNow = () => {
    addItem(product, quantity);
    void navigate({ to: "/commande" });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium",
            toneClasses[tone],
          )}
        >
          <span
            className="size-1.5 rounded-full bg-current"
            aria-hidden="true"
          />
          {availabilityLabel(product.availability)}
        </span>
        {hasPromo ? (
          <Badge className="rounded-full border-accent/40 bg-accent/15 text-accent">
            {discountLabel(product.discountPercent)}
          </Badge>
        ) : null}
      </div>

      <div className="flex flex-col gap-3">
        <h1 className="font-display text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl">
          {product.name}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <Star
              className="size-4 fill-warning text-warning"
              aria-hidden="true"
            />
            <span className="font-mono font-semibold text-foreground">
              {formatRating(product.rating)}
            </span>
          </span>
          <span aria-hidden="true">·</span>
          <span>{formatCount(product.reviewCount)} avis clients</span>
        </div>
      </div>

      <div className="flex flex-wrap items-baseline gap-3">
        <span className="font-mono text-3xl font-bold text-foreground">
          {formatPrice(product.price)}
        </span>
        {product.oldPrice !== undefined ? (
          <span className="font-mono text-lg text-muted-foreground line-through">
            {formatPrice(product.oldPrice)}
          </span>
        ) : null}
      </div>

      <p className="text-base leading-relaxed text-muted-foreground">
        {product.description}
      </p>

      <div className="flex flex-col gap-4 border-t border-border pt-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-foreground">
              Quantité
            </span>
            <div className="flex items-center rounded-full border border-border bg-card">
              <button
                type="button"
                data-ocid="product.quantity.decrease_button"
                onClick={decrease}
                disabled={quantity <= 1}
                aria-label="Diminuer la quantité"
                className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-fast hover:text-foreground disabled:opacity-40"
              >
                <Minus className="size-4" aria-hidden="true" />
              </button>
              <span
                data-ocid="product.quantity.value"
                aria-live="polite"
                className="w-10 text-center font-mono text-base font-semibold text-foreground"
              >
                {quantity}
              </span>
              <button
                type="button"
                data-ocid="product.quantity.increase_button"
                onClick={increase}
                disabled={quantity >= 99}
                aria-label="Augmenter la quantité"
                className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-fast hover:text-foreground disabled:opacity-40"
              >
                <Plus className="size-4" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button
            size="lg"
            variant={available ? "primary" : "secondary"}
            disabled={!available}
            data-ocid="product.add_to_cart_button"
            onClick={handleAddToCart}
            className="flex-1"
          >
            <ShoppingCart aria-hidden="true" />
            Ajouter au panier
          </Button>
          <Button
            size="lg"
            variant="outline"
            disabled={!available}
            data-ocid="product.buy_now_button"
            onClick={handleBuyNow}
            className="flex-1"
          >
            Acheter maintenant
          </Button>
        </div>

        {!available ? (
          <p
            data-ocid="product.out_of_stock_notice"
            className="text-sm text-destructive"
          >
            Ce produit est momentanément indisponible. Revenez bientôt.
          </p>
        ) : null}
      </div>

      <ul className="grid gap-3 border-t border-border pt-6 text-sm text-muted-foreground sm:grid-cols-3">
        <li className="flex items-center gap-2">
          <Truck className="size-4 text-primary" aria-hidden="true" />
          Livraison offerte dès 99 €
        </li>
        <li className="flex items-center gap-2">
          <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
          Garantie 2 ans incluse
        </li>
        <li className="flex items-center gap-2">
          <Check className="size-4 text-primary" aria-hidden="true" />
          Retour sous 30 jours
        </li>
      </ul>
    </div>
  );
}
