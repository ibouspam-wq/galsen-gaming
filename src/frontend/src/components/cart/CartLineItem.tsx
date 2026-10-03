import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/format";
import type { CartItem } from "@/types/catalog";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartLineItemProps {
  item: CartItem;
  index: number;
}

export function CartLineItem({ item, index }: CartLineItemProps) {
  const { updateQuantity, removeItem } = useCart();
  const lineTotal = item.price * BigInt(item.quantity);

  return (
    <li
      data-ocid={`cart.item.${index + 1}`}
      className="flex gap-4 border-b border-border py-5 last:border-b-0"
    >
      <Link
        to="/produit/$id"
        params={{ id: item.productId.toString() }}
        className="shrink-0"
      >
        <img
          src={item.image}
          alt={item.name}
          className="size-24 rounded-xl border border-border object-cover transition-fast hover:border-primary/50 md:size-28"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <Link
              to="/produit/$id"
              params={{ id: item.productId.toString() }}
              className="line-clamp-2 font-display text-base font-semibold text-foreground transition-fast hover:text-primary"
            >
              {item.name}
            </Link>
            <p className="mt-1 font-mono text-sm text-muted-foreground">
              {formatPrice(item.price)} l&apos;unité
            </p>
          </div>
          <button
            type="button"
            data-ocid={`cart.delete_button.${index + 1}`}
            aria-label={`Retirer ${item.name} du panier`}
            onClick={() => removeItem(item.productId)}
            className="shrink-0 rounded-lg p-2 text-muted-foreground transition-fast hover:bg-destructive/10 hover:text-destructive"
          >
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="inline-flex items-center rounded-full border border-border bg-secondary/40">
            <button
              type="button"
              data-ocid={`cart.secondary_button.${index + 1}`}
              aria-label={`Diminuer la quantité de ${item.name}`}
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-fast hover:text-foreground"
            >
              <Minus className="size-4" aria-hidden="true" />
            </button>
            <span
              data-ocid={`cart.quantity.${index + 1}`}
              className="w-10 text-center font-mono text-sm font-semibold text-foreground"
            >
              {item.quantity}
            </span>
            <button
              type="button"
              data-ocid={`cart.secondary_button.${index + 1}`}
              aria-label={`Augmenter la quantité de ${item.name}`}
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-fast hover:text-foreground"
            >
              <Plus className="size-4" aria-hidden="true" />
            </button>
          </div>
          <span className="font-mono text-base font-bold text-foreground">
            {formatPrice(lineTotal)}
          </span>
        </div>
      </div>
    </li>
  );
}
