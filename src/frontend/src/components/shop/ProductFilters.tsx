import { CATEGORY_META } from "@/data/categories";
import { cn } from "@/lib/utils";
import { LayoutGrid, PackageCheck } from "lucide-react";

export type AvailabilityFilter = "all" | "available";

interface ProductFiltersProps {
  activeCategory: string | undefined;
  availability: AvailabilityFilter;
  onSelectCategory: (categoryId: string | undefined) => void;
  onSelectAvailability: (availability: AvailabilityFilter) => void;
}

export function ProductFilters({
  activeCategory,
  availability,
  onSelectCategory,
  onSelectAvailability,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-5">
      <fieldset className="flex flex-col gap-3 border-0 p-0">
        <legend className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Catégories
        </legend>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={activeCategory === undefined}
            onClick={() => onSelectCategory(undefined)}
            data-ocid="shop.filter.category.all"
          >
            <LayoutGrid className="size-3.5" aria-hidden="true" />
            Toutes
          </FilterChip>
          {CATEGORY_META.map((category) => (
            <FilterChip
              key={category.id}
              active={activeCategory === category.id}
              onClick={() => onSelectCategory(category.id)}
              data-ocid={`shop.filter.category.${category.id}`}
            >
              {category.name}
            </FilterChip>
          ))}
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-3 border-0 p-0">
        <legend className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Disponibilité
        </legend>
        <div className="flex flex-wrap gap-2">
          <FilterChip
            active={availability === "all"}
            onClick={() => onSelectAvailability("all")}
            data-ocid="shop.filter.availability.all"
          >
            Tout le catalogue
          </FilterChip>
          <FilterChip
            active={availability === "available"}
            onClick={() => onSelectAvailability("available")}
            data-ocid="shop.filter.availability.available"
          >
            <PackageCheck className="size-3.5" aria-hidden="true" />
            En stock uniquement
          </FilterChip>
        </div>
      </fieldset>
    </div>
  );
}

interface FilterChipProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  "data-ocid": string;
}

function FilterChip({
  active,
  onClick,
  children,
  "data-ocid": dataOcid,
}: FilterChipProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      data-ocid={dataOcid}
      className={cn(
        "inline-flex h-9 items-center gap-1.5 rounded-full border px-3.5 text-xs font-medium transition-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        active
          ? "border-primary/60 bg-primary/15 text-primary shadow-glow-primary"
          : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
