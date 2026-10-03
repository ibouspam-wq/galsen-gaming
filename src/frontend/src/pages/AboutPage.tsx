import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Headphones,
  ShieldCheck,
  Sparkles,
  Target,
  Truck,
} from "lucide-react";

const values = [
  {
    icon: BadgeCheck,
    title: "Sélection exigeante",
    description:
      "Chaque référence est testée et validée par notre équipe avant d'entrer au catalogue. Pas de compromis sur la qualité.",
  },
  {
    icon: ShieldCheck,
    title: "Garantie sereine",
    description:
      "Tous nos produits sont couverts par la garantie constructeur, avec un accompagnement en cas de besoin.",
  },
  {
    icon: Truck,
    title: "Livraison soignée",
    description:
      "Emballage renforcé et suivi de commande pour que votre matériel arrive intact et prêt à jouer.",
  },
  {
    icon: Headphones,
    title: "Conseil humain",
    description:
      "Une équipe de passionnés vous aide à composer le setup adapté à votre budget et à votre style de jeu.",
  },
];

const milestones = [
  {
    year: "Origine",
    title: "Née de la scène gaming",
    description:
      "Galsen Gaming est née de la conviction que le matériel premium ne devrait pas être réservé à une élite.",
  },
  {
    year: "Aujourd'hui",
    title: "Un catalogue curaté",
    description:
      "Des périphériques aux composants, nous réunissons les références qui font vraiment la différence en jeu.",
  },
  {
    year: "Demain",
    title: "Toujours plus proche",
    description:
      "Nous développons nos services pour rendre l'expérience d'achat aussi fluide que le jeu lui-même.",
  },
];

export function AboutPage() {
  return (
    <div className="flex flex-col">
      <section className="border-b border-border bg-card">
        <div className="container grid grid-cols-1 items-center gap-10 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
              <Sparkles className="size-3.5" aria-hidden="true" />
              Notre histoire
            </p>
            <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              Le gaming premium,{" "}
              <span className="text-gradient-primary">sans compromis</span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              Galsen Gaming est une boutique spécialisée dans le matériel gaming
              haut de gamme. Notre mission : rendre accessible un équipement
              fiable, performant et durable à tous les joueurs qui veulent
              progresser.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild>
                <Link to="/boutique" search={{}}>
                  Découvrir la boutique
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/contact">Nous contacter</Link>
              </Button>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl border border-border">
            <img
              src="/assets/generated/hero-gaming-setup.dim_1600x900.jpg"
              alt="Setup gaming premium éclairé en violet et bleu"
              className="h-64 w-full object-cover md:h-96"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
          </div>
        </div>
      </section>

      <section className="container flex flex-col gap-10 py-14 md:py-20">
        <SectionHeading
          eyebrow="Mission"
          title="Ce qui nous guide au quotidien"
          description="Quatre engagements simples qui structurent chacune de nos décisions."
          align="center"
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {values.map((value) => (
            <article
              key={value.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-6 transition-fast hover:border-primary/50"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <value.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {value.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-border bg-card">
        <div className="container flex flex-col gap-10 py-14 md:py-20">
          <SectionHeading
            eyebrow="Parcours"
            title="Notre engagement dans le temps"
            description="Une boutique construite par des joueurs, pour des joueurs."
          />
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {milestones.map((milestone) => (
              <div
                key={milestone.year}
                className="relative rounded-2xl border border-border bg-background p-6"
              >
                <p className="font-mono text-xs font-semibold uppercase tracking-widest text-accent">
                  {milestone.year}
                </p>
                <h3 className="mt-3 font-display text-lg font-semibold text-foreground">
                  {milestone.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-14 md:py-20">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-12 text-center md:px-12 md:py-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 left-1/2 size-72 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <span className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
              <Target className="size-6" aria-hidden="true" />
            </span>
            <h2 className="font-display text-2xl font-bold tracking-tight text-foreground md:text-3xl">
              Prêt à passer au niveau supérieur ?
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Parcourez notre catalogue et composez le setup qui vous
              correspond.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button asChild size="lg">
                <Link to="/boutique" search={{}}>
                  Explorer la boutique
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link to="/promotions">Voir les promotions</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
