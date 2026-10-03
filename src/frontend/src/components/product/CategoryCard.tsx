import { cn } from "@/lib/utils";
import type { CategoryMeta } from "@/types/catalog";
import { Link } from "@tanstack/react-router";
import {
  Armchair,
  Cpu,
  Gamepad2,
  Headphones,
  Keyboard,
  LampDesk,
  type LucideIcon,
  Mic,
  Monitor,
  Mouse,
} from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  keyboard: Keyboard,
  mouse: Mouse,
  headphones: Headphones,
  monitor: Monitor,
  cpu: Cpu,
  armchair: Armchair,
  "gamepad-2": Gamepad2,
  mic: Mic,
  "lamp-desk": LampDesk,
};

interface CategoryCardProps {
  category: CategoryMeta;
  index?: number;
  className?: string;
}

export function CategoryCard({
  category,
  index = 0,
  className,
}: CategoryCardProps) {
  const Icon = ICONS[category.icon] ?? Cpu;

  return (
    <Link
      to="/boutique"
      search={{ category: category.id }}
      data-ocid={`category.card.${index + 1}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card transition-fast hover:border-primary/50 hover:shadow-elevated",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={category.image}
          alt={category.name}
          loading="lazy"
          className="h-full w-full object-cover transition-smooth group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />
        <span className="absolute left-3 top-3 inline-flex size-9 items-center justify-center rounded-full border border-primary/40 bg-background/70 text-primary backdrop-blur">
          <Icon className="size-4" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-1 p-4">
        <h3 className="font-display text-base font-semibold text-foreground transition-fast group-hover:text-primary">
          {category.name}
        </h3>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {category.description}
        </p>
      </div>
    </Link>
  );
}
