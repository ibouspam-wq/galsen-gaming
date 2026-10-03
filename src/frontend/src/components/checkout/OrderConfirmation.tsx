import { Button } from "@/components/common/Button";
import { formatDate, formatPrice } from "@/lib/format";
import type { Order } from "@/types/catalog";
import { Link } from "@tanstack/react-router";
import { CheckCircle2, Package, Truck } from "lucide-react";

interface OrderConfirmationProps {
  order: Order;
}

export function OrderConfirmation({ order }: OrderConfirmationProps) {
  return (
    <div
      data-ocid="checkout.success_state"
      className="mx-auto flex w-full max-w-3xl flex-col gap-8 py-10 md:py-14"
    >
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="inline-flex size-16 items-center justify-center rounded-full border border-success/40 bg-success/10 text-success">
          <CheckCircle2 className="size-8" aria-hidden="true" />
        </span>
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Merci pour votre commande !
          </h1>
          <p className="mt-2 text-muted-foreground">
            Votre commande a bien été enregistrée. Un e-mail de confirmation
            vous sera envoyé prochainement.
          </p>
        </div>
        <div className="inline-flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm">
          <span className="text-muted-foreground">
            Numéro de commande{" "}
            <span
              data-ocid="checkout.order_id"
              className="font-mono font-semibold text-foreground"
            >
              #{order.id.toString()}
            </span>
          </span>
          <span className="text-muted-foreground">
            {formatDate(order.createdAt)}
          </span>
        </div>
      </div>

      <section className="rounded-2xl border border-border bg-card p-6 shadow-subtle md:p-8">
        <h2 className="flex items-center gap-2 font-display text-lg font-bold text-foreground">
          <Package className="size-5 text-primary" aria-hidden="true" />
          Articles commandés
        </h2>
        <ul
          data-ocid="checkout.confirmation_list"
          className="mt-5 flex flex-col divide-y divide-border"
        >
          {order.lines.map((line, index) => (
            <li
              key={`${line.productId.toString()}-${index}`}
              data-ocid={`checkout.confirmation_item.${index + 1}`}
              className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-foreground">
                  {line.name}
                </p>
                <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                  {formatPrice(line.unitPrice)} × {line.quantity.toString()}
                </p>
              </div>
              <span className="shrink-0 font-mono text-sm font-semibold text-foreground">
                {formatPrice(line.lineTotal)}
              </span>
            </li>
          ))}
        </ul>

        <dl className="mt-5 flex flex-col gap-3 border-t border-border pt-5 text-sm">
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Sous-total</dt>
            <dd className="font-mono text-foreground">
              {formatPrice(order.subtotal)}
            </dd>
          </div>
          <div className="flex items-center justify-between">
            <dt className="text-muted-foreground">Frais de livraison</dt>
            <dd className="font-mono text-foreground">
              {order.shippingFee === 0n
                ? "Offerte"
                : formatPrice(order.shippingFee)}
            </dd>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-3 text-base">
            <dt className="font-display font-semibold text-foreground">
              Total payé
            </dt>
            <dd
              data-ocid="checkout.confirmation_total"
              className="font-mono text-lg font-bold text-foreground"
            >
              {formatPrice(order.total)}
            </dd>
          </div>
        </dl>
      </section>

      <section className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-border bg-card p-6">
          <h3 className="flex items-center gap-2 font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            <Truck className="size-4 text-accent" aria-hidden="true" />
            Livraison
          </h3>
          <address className="mt-3 not-italic text-sm leading-relaxed text-foreground">
            <span className="font-medium">{order.shipping.fullName}</span>
            <br />
            {order.shipping.address}
            <br />
            {order.shipping.postalCode} {order.shipping.city}
            <br />
            {order.shipping.country}
            <br />
            <span className="text-muted-foreground">
              {order.shipping.email}
            </span>
            <br />
            <span className="text-muted-foreground">
              {order.shipping.phone}
            </span>
          </address>
        </div>
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-border bg-card p-6">
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Et maintenant ?
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Nous préparons votre colis avec soin. Vous recevrez un e-mail dès
              son expédition.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <Button asChild className="w-full">
              <Link
                to="/boutique"
                search={{}}
                data-ocid="checkout.primary_button"
              >
                Continuer mes achats
              </Link>
            </Button>
            <Button asChild variant="ghost" className="w-full">
              <Link to="/" data-ocid="checkout.secondary_button">
                Retour à l&apos;accueil
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
