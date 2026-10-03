import { CartLineItem } from "@/components/cart/CartLineItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { Button } from "@/components/common/Button";
import { useCart } from "@/context/CartContext";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";

export function CartPage() {
  const { items, itemCount, subtotal, clearCart } = useCart();

  return (
    <div
      data-ocid="cart.page"
      className="container flex flex-col gap-8 py-10 md:py-14"
    >
      <div className="flex flex-col gap-3">
        <Link
          to="/boutique"
          search={{}}
          className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-fast hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Continuer mes achats
        </Link>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              Votre panier
            </h1>
            <p className="mt-2 text-muted-foreground">
              {itemCount > 0
                ? `${itemCount} article${itemCount > 1 ? "s" : ""} prêt${itemCount > 1 ? "s" : ""} à être commandé${itemCount > 1 ? "s" : ""}.`
                : "Vérifiez vos articles avant de passer commande."}
            </p>
          </div>
          {items.length > 0 ? (
            <Button
              variant="ghost"
              size="sm"
              data-ocid="cart.clear_button"
              onClick={clearCart}
            >
              Vider le panier
            </Button>
          ) : null}
        </div>
      </div>

      {items.length === 0 ? (
        <div
          data-ocid="cart.empty_state"
          className="flex flex-col items-center justify-center gap-5 rounded-2xl border border-border bg-card px-6 py-16 text-center"
        >
          <span className="inline-flex size-16 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
            <ShoppingBag className="size-7" aria-hidden="true" />
          </span>
          <div>
            <p className="font-display text-lg font-semibold text-foreground">
              Votre panier est vide
            </p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Parcourez notre catalogue de matériel gaming premium et ajoutez
              vos coups de cœur.
            </p>
          </div>
          <Button asChild>
            <Link to="/boutique" search={{}} data-ocid="cart.primary_button">
              Explorer la boutique
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
          <section
            aria-label="Articles du panier"
            className="rounded-2xl border border-border bg-card px-5 shadow-subtle md:px-6"
          >
            <ul data-ocid="cart.list" className="divide-y divide-border">
              {items.map((item, index) => (
                <CartLineItem
                  key={item.productId.toString()}
                  item={item}
                  index={index}
                />
              ))}
            </ul>
          </section>

          <div className="lg:sticky lg:top-24">
            <CartSummary subtotal={subtotal} itemCount={itemCount} />
          </div>
        </div>
      )}
    </div>
  );
}
