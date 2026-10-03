import { Button } from "@/components/common/Button";
import { Link } from "@tanstack/react-router";

interface RoutePlaceholderProps {
  title: string;
  description: string;
  showHero?: boolean;
}

/**
 * Lightweight placeholder for routes whose full page body is delivered by a
 * dedicated task. Keeps navigation reachable and the hero asset referenced.
 */
export function RoutePlaceholder({
  title,
  description,
  showHero = false,
}: RoutePlaceholderProps) {
  return (
    <div className="container flex flex-col gap-8 py-14 md:py-20">
      {showHero ? (
        <div className="relative overflow-hidden rounded-3xl border border-border">
          <img
            src="/assets/generated/hero-gaming-setup.dim_1600x900.jpg"
            alt="Setup gaming premium éclairé en violet et bleu"
            className="h-64 w-full object-cover md:h-96"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>
      ) : null}
      <div className="max-w-2xl">
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-muted-foreground">{description}</p>
      </div>
      <div>
        <Button asChild>
          <Link to="/boutique" search={{}}>
            Explorer la boutique
          </Link>
        </Button>
      </div>
    </div>
  );
}
