import type { OrderError } from "@/backend";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";
import { OrderConfirmation } from "@/components/checkout/OrderConfirmation";
import { OrderSummary } from "@/components/checkout/OrderSummary";
import { Button } from "@/components/common/Button";
import { useCart } from "@/context/CartContext";
import { useCreateOrder } from "@/hooks/useCatalog";
import type { Order, ShippingInfo } from "@/types/catalog";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useState } from "react";

function orderErrorMessage(error: OrderError): string {
  switch (error.__kind__) {
    case "emptyCart":
      return "Votre panier est vide. Ajoutez des articles avant de commander.";
    case "invalidQuantity":
      return "Une quantité de votre panier est invalide. Vérifiez vos articles.";
    case "unknownProduct":
      return "Un article de votre panier n'est plus disponible. Retirez-le pour continuer.";
    default:
      return "La commande n'a pas pu être enregistrée. Veuillez réessayer.";
  }
}

export function CheckoutPage() {
  const { items, itemCount, subtotal, clearCart } = useCart();
  const createOrder = useCreateOrder();
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | undefined>();

  const handleSubmit = (shipping: ShippingInfo) => {
    setErrorMessage(undefined);
    createOrder.mutate(
      {
        shipping,
        lines: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          unitPrice: item.price,
          quantity: BigInt(item.quantity),
          lineTotal: item.price * BigInt(item.quantity),
        })),
      },
      {
        onSuccess: (result) => {
          if (result.__kind__ === "ok") {
            setConfirmedOrder(result.ok);
            clearCart();
          } else {
            setErrorMessage(orderErrorMessage(result.err));
          }
        },
        onError: () => {
          setErrorMessage(
            "La commande n'a pas pu être enregistrée. Veuillez réessayer.",
          );
        },
      },
    );
  };

  if (confirmedOrder) {
    return <OrderConfirmation order={confirmedOrder} />;
  }

  if (items.length === 0) {
    return (
      <div
        data-ocid="checkout.page"
        className="container flex flex-col items-center justify-center gap-5 py-20 text-center"
      >
        <span className="inline-flex size-16 items-center justify-center rounded-full border border-border bg-muted text-muted-foreground">
          <ShoppingBag className="size-7" aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">
            Aucun article à commander
          </h1>
          <p className="mt-2 max-w-sm text-sm text-muted-foreground">
            Ajoutez du matériel gaming à votre panier pour passer commande.
          </p>
        </div>
        <Button asChild>
          <Link to="/boutique" search={{}} data-ocid="checkout.primary_button">
            Explorer la boutique
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div
      data-ocid="checkout.page"
      className="container flex flex-col gap-8 py-10 md:py-14"
    >
      <div className="flex flex-col gap-3">
        <Link
          to="/panier"
          className="inline-flex w-fit items-center gap-2 text-sm text-muted-foreground transition-fast hover:text-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          Retour au panier
        </Link>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Finaliser la commande
          </h1>
          <p className="mt-2 text-muted-foreground">
            Renseignez vos informations de livraison puis confirmez votre
            commande.
          </p>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <CheckoutForm
          isSubmitting={createOrder.isPending}
          errorMessage={errorMessage}
          onSubmit={handleSubmit}
        />
        <div className="lg:sticky lg:top-24">
          <OrderSummary
            items={items}
            subtotal={subtotal}
            itemCount={itemCount}
          />
        </div>
      </div>
    </div>
  );
}
