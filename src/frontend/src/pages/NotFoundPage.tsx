import { Button } from "@/components/common/Button";
import { Link } from "@tanstack/react-router";

export function NotFoundPage() {
  return (
    <div
      data-ocid="notfound.page"
      className="container flex min-h-[60vh] flex-col items-center justify-center gap-6 py-20 text-center"
    >
      <p className="font-display text-6xl font-bold text-gradient-primary">
        404
      </p>
      <div>
        <h1 className="font-display text-2xl font-bold text-foreground md:text-3xl">
          Page introuvable
        </h1>
        <p className="mt-2 max-w-md text-muted-foreground">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
      </div>
      <Button asChild>
        <Link to="/" data-ocid="notfound.primary_button">
          Retour à l'accueil
        </Link>
      </Button>
    </div>
  );
}
