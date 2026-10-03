import { Button } from "@/components/common/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useCart } from "@/context/CartContext";
import { shippingFeeFor } from "@/lib/catalog";
import { formatPrice } from "@/lib/format";
import { Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    subtotal,
    updateQuantity,
    removeItem,
    itemCount,
  } = useCart();
  const shipping = shippingFeeFor(subtotal);
  const total = subtotal + shipping;

  return (
    <Sheet
      open={isOpen}
      onOpenChange={(open) => (open ? undefined : closeCart())}
    >
      <SheetContent
        side="right"
        data-ocid="cart.sheet"
        className="flex w-full flex-col border-border bg-card p-0 sm:max-w-md"
      >
        <SheetHeader className="border-b border-border px-5 py-4">
          <SheetTitle className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
            <ShoppingBag className="size-5 text-primary" aria-hidden="true" />
            Panier
            {itemCount > 0 ? (
              <span className="font-mono text-sm text-muted-foreground">
                ({itemCount})
              </span>
            ) : null}
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div
            data-ocid="cart.empty_state"
            className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center"
          >
            <span className="inline-flex size-16 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
              <ShoppingBag className="size-7" aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-base font-semibold text-foreground">
                Votre panier est vide
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Découvrez notre sélection de matériel gaming premium.
              </p>
            </div>
            <Button asChild onClick={closeCart}>
              <Link to="/boutique" search={{}} data-ocid="cart.primary_button">
                Explorer la boutique
              </Link>
            </Button>
          </div>
        ) : (
          <>
            <ul
              className="flex-1 overflow-y-auto px-5 py-4"
              data-ocid="cart.list"
            >
              {items.map((item, index) => (
                <li
                  key={item.productId.toString()}
                  data-ocid={`cart.item.${index + 1}`}
                  className="flex gap-3 border-b border-border py-4 last:border-b-0"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="size-20 shrink-0 rounded-xl border border-border object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col gap-2">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to="/produit/$id"
                        params={{ id: item.productId.toString() }}
                        onClick={closeCart}
                        className="line-clamp-2 text-sm font-medium text-foreground transition-fast hover:text-primary"
                      >
                        {item.name}
                      </Link>
                      <button
                        type="button"
                        data-ocid={`cart.delete_button.${index + 1}`}
                        aria-label={`Retirer ${item.name} du panier`}
                        onClick={() => removeItem(item.productId)}
                        className="shrink-0 rounded-md p-1 text-muted-foreground transition-fast hover:bg-destructive/10 hover:text-destructive"
                      >
                        <Trash2 className="size-4" aria-hidden="true" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="inline-flex items-center rounded-full border border-border">
                        <button
                          type="button"
                          data-ocid={`cart.secondary_button.${index + 1}`}
                          aria-label={`Diminuer la quantité de ${item.name}`}
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-fast hover:text-foreground"
                        >
                          <Minus className="size-3.5" aria-hidden="true" />
                        </button>
                        <span className="w-8 text-center font-mono text-sm text-foreground">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          data-ocid={`cart.secondary_button.${index + 1}`}
                          aria-label={`Augmenter la quantité de ${item.name}`}
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="inline-flex size-8 items-center justify-center rounded-full text-muted-foreground transition-fast hover:text-foreground"
                        >
                          <Plus className="size-3.5" aria-hidden="true" />
                        </button>
                      </div>
                      <span className="font-mono text-sm font-semibold text-foreground">
                        {formatPrice(item.price * BigInt(item.quantity))}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="border-t border-border px-5 py-4">
              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Sous-total</dt>
                  <dd className="font-mono text-foreground">
                    {formatPrice(subtotal)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted-foreground">Livraison</dt>
                  <dd className="font-mono text-foreground">
                    {shipping === 0n ? "Offerte" : formatPrice(shipping)}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-border pt-2 text-base">
                  <dt className="font-display font-semibold text-foreground">
                    Total
                  </dt>
                  <dd className="font-mono font-bold text-foreground">
                    {formatPrice(total)}
                  </dd>
                </div>
              </dl>
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link
                    to="/commande"
                    onClick={closeCart}
                    data-ocid="cart.submit_button"
                  >
                    Passer la commande
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full"
                  data-ocid="cart.close_button"
                  onClick={closeCart}
                >
                  Continuer mes achats
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
