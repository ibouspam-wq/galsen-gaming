import { ContactForm } from "@/components/content/ContactForm";
import { Clock, MessageSquare, ShieldCheck } from "lucide-react";

const highlights = [
  {
    icon: MessageSquare,
    title: "Une question produit ?",
    description:
      "Décrivez votre besoin et nous vous orientons vers le matériel le plus adapté.",
  },
  {
    icon: Clock,
    title: "Réponse rapide",
    description:
      "Notre équipe traite les demandes dans l'ordre d'arrivée et vous répond au plus vite.",
  },
  {
    icon: ShieldCheck,
    title: "Données respectées",
    description:
      "Vos informations servent uniquement à traiter votre demande, jamais à autre chose.",
  },
];

export function ContactPage() {
  return (
    <div className="container flex flex-col gap-12 py-14 md:py-20">
      <header className="max-w-2xl">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-primary">
          Contact
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
          Parlons de votre <span className="text-gradient-primary">setup</span>
        </h1>
        <p className="mt-4 text-base text-muted-foreground md:text-lg">
          Une question sur un produit, une commande ou un conseil d'achat ?
          Écrivez-nous via le formulaire ci-dessous.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
        <ContactForm />

        <aside className="flex flex-col gap-4">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="flex items-start gap-4 rounded-2xl border border-border bg-card p-5"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-primary">
                <item.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h2 className="font-display text-base font-semibold text-foreground">
                  {item.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
