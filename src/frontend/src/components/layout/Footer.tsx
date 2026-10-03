import { CATEGORY_META } from "@/data/categories";
import { Link } from "@tanstack/react-router";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitch,
  Youtube,
} from "lucide-react";

const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com", icon: Instagram },
  { label: "YouTube", href: "https://youtube.com", icon: Youtube },
  { label: "Twitch", href: "https://twitch.tv", icon: Twitch },
  { label: "Facebook", href: "https://facebook.com", icon: Facebook },
];

const LEGAL_LINKS = [
  { label: "Politique de confidentialité", to: "/confidentialite" as const },
  { label: "Conditions générales de vente", to: "/cgv" as const },
  { label: "Politique de livraison", to: "/livraison" as const },
  { label: "Politique de retour", to: "/retours" as const },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-muted/40">
      <div className="container grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col gap-4">
          <Link
            to="/"
            className="flex items-center gap-2"
            aria-label="Galsen Gaming, accueil"
          >
            <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-primary font-display text-lg font-bold text-primary-foreground">
              G
            </span>
            <span className="font-display text-lg font-bold tracking-tight text-foreground">
              Galsen<span className="text-gradient-primary"> Gaming</span>
            </span>
          </Link>
          <p className="max-w-xs text-sm text-muted-foreground">
            Matériel gaming premium sélectionné pour les joueurs exigeants.
            Performance, style et conseils d'experts.
          </p>
          <div className="flex gap-2">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="inline-flex size-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-fast hover:border-primary hover:text-primary"
              >
                <social.icon className="size-4" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
            Catégories
          </h3>
          <ul className="flex flex-col gap-2">
            {CATEGORY_META.slice(0, 6).map((category) => (
              <li key={category.id}>
                <Link
                  to="/boutique"
                  search={{ category: category.id }}
                  className="text-sm text-muted-foreground transition-fast hover:text-primary"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
            Informations
          </h3>
          <ul className="flex flex-col gap-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground transition-fast hover:text-primary"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-foreground">
            Contact
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <span>12 Avenue de la Tech, 75011 Paris, France</span>
            </li>
            <li className="flex items-center gap-2">
              <Phone
                className="size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <a
                href="tel:+33100000000"
                className="transition-fast hover:text-primary"
              >
                +33 1 00 00 00 00
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail
                className="size-4 shrink-0 text-primary"
                aria-hidden="true"
              />
              <a
                href="mailto:contact@galsengaming.fr"
                className="transition-fast hover:text-primary"
              >
                contact@galsengaming.fr
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {year} Galsen Gaming. Tous droits réservés.</p>
          <p>
            © {year}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noreferrer"
              className="text-primary transition-fast hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
