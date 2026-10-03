import { Button } from "@/components/common/Button";
import { FREE_SHIPPING_THRESHOLD_CENTS, shippingFeeFor } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, Truck } from "lucide-react";

interface CartSummaryProps {
  subtotal: bigint;
  itemCount: number;
  showCheckout?: boolean;
}

export function CartSummary({
  subtotal,
  itemCount,
  showCheckout = true,
}: CartSummaryProps) {
  const shipping = shippingFeeFor(subtotal);
  const total = subtotal + shipping;
  const remaining = FREE_SHIPPING_THRESHOLD_CENTS - subtotal;
  const freeShippingReached = shipping === 0n && subtotal > 0n;

  return (
    <aside
      data-ocid="cart.summary_panel"
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-subtle"
    >
      <h2 className="font-display text-lg font-bold text-foreground">
        Récapitulatif
      </h2>

      <dl className="flex flex-col gap-3 text-sm">
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">
            Sous-total
            <span className="ml-1 font-mono text-xs">
              ({itemCount} article{itemCount > 1 ? "s" : ""})
            </span>
          </dt>
          <dd className="font-mono text-foreground">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex items-center justify-between">
          <dt className="text-muted-foreground">Frais de livraison</dt>
          <dd className="font-mono text-foreground">
            {freeShippingReached ? "Offerte" : formatPrice(shipping)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3 text-base">
          <dt className="font-display font-semibold text-foreground">Total</dt>
          <dd
            data-ocid="cart.total"
            className="font-mono text-lg font-bold text-foreground"
          >
            {formatPrice(total)}
          </dd>
        </div>
      </dl>

      {subtotal > 0n && !freeShippingReached ? (
        <p className="flex items-start gap-2 rounded-xl border border-border bg-secondary/40 p-3 text-xs text-muted-foreground">
          <Truck
            className="mt-0.5 size-4 shrink-0 text-accent"
            aria-hidden="true"
          />
          <span>
            Plus que{" "}
            <span className="font-mono font-semibold text-foreground">
              {formatPrice(remaining)}
            </span>{" "}
            pour bénéficier de la livraison offerte.
          </span>
        </p>
      ) : null}

      {freeShippingReached ? (
        <p className="flex items-center gap-2 rounded-xl border border-success/30 bg-success/10 p-3 text-xs font-medium text-success">
          <Truck className="size-4 shrink-0" aria-hidden="true" />
          Livraison offerte sur cette commande.
        </p>
      ) : null}

      {showCheckout ? (
        <Button asChild size="lg" className="w-full">
          <Link to="/commande" data-ocid="cart.checkout_button">
            Passer la commande
          </Link>
        </Button>
      ) : null}

      <p className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
        <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
        Commande de démonstration — aucun paiement réel.
      </p>
    </aside>
  );
}
