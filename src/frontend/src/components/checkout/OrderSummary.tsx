import { shippingFeeFor } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types/catalog";

interface OrderSummaryProps {
  items: CartItem[];
  subtotal: bigint;
  itemCount: number;
}

export function OrderSummary({
  items,
  subtotal,
  itemCount,
}: OrderSummaryProps) {
  const shipping = shippingFeeFor(subtotal);
  const total = subtotal + shipping;

  return (
    <aside
      data-ocid="checkout.summary_panel"
      className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 shadow-subtle"
    >
      <h2 className="font-display text-lg font-bold text-foreground">
        Votre commande
      </h2>

      <ul data-ocid="checkout.summary_list" className="flex flex-col gap-4">
        {items.map((item, index) => (
          <li
            key={item.productId.toString()}
            data-ocid={`checkout.summary_item.${index + 1}`}
            className="flex items-center gap-3"
          >
            <img
              src={item.image}
              alt={item.name}
              className="size-14 shrink-0 rounded-lg border border-border object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="line-clamp-2 text-sm font-medium text-foreground">
                {item.name}
              </p>
              <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                Qté {item.quantity}
              </p>
            </div>
            <span className="shrink-0 font-mono text-sm font-semibold text-foreground">
              {formatPrice(item.price * BigInt(item.quantity))}
            </span>
          </li>
        ))}
      </ul>

      <dl className="flex flex-col gap-3 border-t border-border pt-4 text-sm">
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
            {shipping === 0n ? "Offerte" : formatPrice(shipping)}
          </dd>
        </div>
        <div className="flex items-center justify-between border-t border-border pt-3 text-base">
          <dt className="font-display font-semibold text-foreground">Total</dt>
          <dd
            data-ocid="checkout.total"
            className="font-mono text-lg font-bold text-foreground"
          >
            {formatPrice(total)}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
