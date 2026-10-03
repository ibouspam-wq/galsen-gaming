import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, X } from "lucide-react";

export type SortValue = "popularity" | "priceAsc" | "priceDesc" | "rating";

export const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "popularity", label: "Popularité" },
  { value: "priceAsc", label: "Prix croissant" },
  { value: "priceDesc", label: "Prix décroissant" },
  { value: "rating", label: "Mieux notés" },
];

interface ShopToolbarProps {
  query: string;
  sort: SortValue;
  resultCount: number;
  isLoading: boolean;
  onQueryChange: (value: string) => void;
  onSortChange: (value: SortValue) => void;
}

export function ShopToolbar({
  query,
  sort,
  resultCount,
  isLoading,
  onQueryChange,
  onSortChange,
}: ShopToolbarProps) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-4 md:flex-row md:items-center md:justify-between">
      <div className="relative w-full md:max-w-sm">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <Input
          type="search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Rechercher un produit…"
          aria-label="Rechercher un produit"
          data-ocid="shop.search_input"
          className="h-11 rounded-full border-border bg-background pl-9 pr-9"
        />
        {query ? (
          <button
            type="button"
            onClick={() => onQueryChange("")}
            aria-label="Effacer la recherche"
            data-ocid="shop.search_clear_button"
            className="absolute right-2 top-1/2 inline-flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted-foreground transition-fast hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-4 md:justify-end">
        <p
          className="text-sm text-muted-foreground"
          data-ocid="shop.result_count"
          aria-live="polite"
        >
          {isLoading
            ? "Chargement…"
            : `${resultCount} produit${resultCount > 1 ? "s" : ""}`}
        </p>
        <div className="flex items-center gap-2">
          <label
            htmlFor="shop-sort"
            className="hidden text-sm text-muted-foreground sm:block"
          >
            Trier par
          </label>
          <Select
            value={sort}
            onValueChange={(value) => onSortChange(value as SortValue)}
          >
            <SelectTrigger
              id="shop-sort"
              data-ocid="shop.sort_select"
              className="h-11 w-[11.5rem] rounded-full border-border bg-background"
            >
              <SelectValue placeholder="Trier par" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem
                  key={option.value}
                  value={option.value}
                  data-ocid={`shop.sort_option.${option.value}`}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
