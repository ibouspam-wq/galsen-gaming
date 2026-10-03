import { SectionHeading } from "@/components/common/SectionHeading";
import {
  Headset,
  type LucideIcon,
  ShieldCheck,
  Trophy,
  Truck,
} from "lucide-react";

interface Advantage {
  icon: LucideIcon;
  title: string;
  description: string;
}

const ADVANTAGES: Advantage[] = [
  {
    icon: Trophy,
    title: "Sélection pour gamers",
    description:
      "Chaque référence est testée et choisie pour ses performances réelles en jeu, pas pour son emballage.",
  },
  {
    icon: Truck,
    title: "Livraison rapide",
    description:
      "Expédition sous 24 à 48 heures et livraison offerte dès 99 € d'achat partout en France.",
  },
  {
    icon: ShieldCheck,
    title: "Paiement sécurisé",
    description:
      "Transactions chiffrées et garantie constructeur de 2 ans sur l'ensemble du catalogue.",
  },
  {
    icon: Headset,
    title: "Assistance client",
    description:
      "Une équipe de passionnés qui répond en français et t'aide à choisir le bon matériel.",
  },
];

export function WhyUsSection() {
  return (
    <section
      data-ocid="home.why.section"
      className="border-b border-border bg-muted/30 py-16 md:py-24"
    >
      <div className="container flex flex-col gap-10">
        <SectionHeading
          eyebrow="Nos engagements"
          title="Pourquoi Galsen Gaming ?"
          description="Une boutique pensée par des joueurs, pour des joueurs exigeants."
          align="center"
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ADVANTAGES.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <article
                key={advantage.title}
                data-ocid={`home.why.card.${index + 1}`}
                className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6 transition-fast hover:border-primary/50 hover:shadow-elevated"
              >
                <span className="inline-flex size-11 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {advantage.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {advantage.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
