import { Button } from "@/components/common/Button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Link } from "@tanstack/react-router";
import { X } from "lucide-react";

const NAV_LINKS = [
  { label: "Accueil", to: "/" as const },
  { label: "Boutique", to: "/boutique" as const },
  { label: "Catégories", to: "/categories" as const },
  { label: "Promotions", to: "/promotions" as const },
  { label: "À propos", to: "/a-propos" as const },
  { label: "Contact", to: "/contact" as const },
];

interface MobileNavProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNav({ open, onOpenChange }: MobileNavProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="left"
        data-ocid="nav.modal"
        className="w-72 border-border bg-card p-0"
      >
        <SheetHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
          <SheetTitle className="font-display text-lg font-bold text-foreground">
            Galsen<span className="text-gradient-primary"> Gaming</span>
          </SheetTitle>
          <Button
            variant="ghost"
            size="icon"
            data-ocid="nav.close_button"
            aria-label="Fermer le menu"
            onClick={() => onOpenChange(false)}
          >
            <X />
          </Button>
        </SheetHeader>
        <nav className="flex flex-col gap-1 p-4" aria-label="Navigation mobile">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid="nav.link"
              activeOptions={{ exact: link.to === "/" }}
              onClick={() => onOpenChange(false)}
              className="rounded-xl px-4 py-3 text-base font-medium text-muted-foreground transition-fast hover:bg-muted hover:text-foreground"
              activeProps={{ className: "bg-muted text-foreground" }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
