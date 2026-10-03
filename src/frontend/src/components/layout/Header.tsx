import { Button } from "@/components/common/Button";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShoppingCart } from "lucide-react";
import { type FormEvent, useState } from "react";

const NAV_LINKS = [
  { label: "Accueil", to: "/" as const },
  { label: "Boutique", to: "/boutique" as const },
  { label: "Catégories", to: "/categories" as const },
  { label: "Promotions", to: "/promotions" as const },
  { label: "À propos", to: "/a-propos" as const },
  { label: "Contact", to: "/contact" as const },
];

interface HeaderProps {
  onOpenMobileNav: () => void;
}

export function Header({ onOpenMobileNav }: HeaderProps) {
  const { itemCount, openCart } = useCart();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  function handleSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = query.trim();
    navigate({
      to: "/boutique",
      search: trimmed ? { q: trimmed } : {},
    });
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-card/90 backdrop-blur supports-[backdrop-filter]:bg-card/75">
      <div className="container flex h-16 items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="lg:hidden"
          data-ocid="nav.open_modal_button"
          aria-label="Ouvrir le menu"
          onClick={onOpenMobileNav}
        >
          <Menu />
        </Button>

        <Link
          to="/"
          data-ocid="nav.link"
          className="flex shrink-0 items-center gap-2"
          aria-label="Galsen Gaming, accueil"
        >
          <span className="inline-flex size-9 items-center justify-center rounded-xl bg-gradient-primary font-display text-lg font-bold text-primary-foreground shadow-subtle">
            G
          </span>
          <span className="hidden font-display text-lg font-bold tracking-tight text-foreground sm:inline">
            Galsen<span className="text-gradient-primary"> Gaming</span>
          </span>
        </Link>

        <nav
          className="hidden items-center gap-1 lg:flex"
          aria-label="Navigation principale"
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid="nav.link"
              activeOptions={{ exact: link.to === "/" }}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-fast hover:bg-muted hover:text-foreground"
              activeProps={{ className: "text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form
          onSubmit={handleSearch}
          aria-label="Recherche de produits"
          className="ml-auto hidden max-w-xs flex-1 items-center md:flex"
        >
          <div className="relative w-full">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un produit…"
              aria-label="Rechercher un produit"
              data-ocid="nav.search_input"
              className="h-10 w-full rounded-full border border-input bg-background pl-9 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </div>
        </form>

        <Button
          variant="secondary"
          size="icon"
          className="relative ml-auto md:ml-0"
          data-ocid="cart.open_modal_button"
          aria-label={`Ouvrir le panier, ${itemCount} article${itemCount > 1 ? "s" : ""}`}
          onClick={openCart}
        >
          <ShoppingCart />
          {itemCount > 0 ? (
            <span
              className={cn(
                "absolute -right-1 -top-1 inline-flex min-w-5 items-center justify-center rounded-full bg-gradient-primary px-1.5 font-mono text-[11px] font-bold text-primary-foreground",
              )}
            >
              {itemCount}
            </span>
          ) : null}
        </Button>
      </div>
    </header>
  );
}
