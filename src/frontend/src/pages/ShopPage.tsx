import { SortOrder } from "@/backend";
import { SectionHeading } from "@/components/common/SectionHeading";
import {
  type AvailabilityFilter,
  ProductFilters,
} from "@/components/shop/ProductFilters";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopToolbar, type SortValue } from "@/components/shop/ShopToolbar";
import { useSearchProducts } from "@/hooks/useCatalog";
import { isAvailable } from "@/lib/catalog";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { useMemo } from "react";

const SORT_TO_BACKEND: Record<SortValue, SortOrder> = {
  popularity: SortOrder.popularity,
  priceAsc: SortOrder.priceAsc,
  priceDesc: SortOrder.priceDesc,
  rating: SortOrder.rating,
};

const SORT_VALUES: SortValue[] = [
  "popularity",
  "priceAsc",
  "priceDesc",
  "rating",
];

function isSortValue(value: string | undefined): value is SortValue {
  return value !== undefined && SORT_VALUES.includes(value as SortValue);
}

export function ShopPage() {
  const search = useSearch({ from: "/boutique" });
  const navigate = useNavigate();

  const category = search.category;
  const query = search.q ?? "";
  const sort: SortValue = isSortValue(search.sort) ? search.sort : "popularity";
  const availability: AvailabilityFilter =
    search.availability === "available" ? "available" : "all";

  const { data, isLoading } = useSearchProducts({
    categoryId: category,
    search: query.trim() === "" ? undefined : query.trim(),
    sort: SORT_TO_BACKEND[sort],
  });

  const products = useMemo(() => {
    const list = data ?? [];
    if (availability === "available") {
      return list.filter(isAvailable);
    }
    return list;
  }, [data, availability]);

  const updateSearch = (patch: {
    category?: string | undefined;
    q?: string | undefined;
    sort?: SortValue | undefined;
    availability?: AvailabilityFilter | undefined;
  }) => {
    void navigate({
      to: "/boutique",
      search: (prev) => ({ ...prev, ...patch }),
      replace: true,
    });
  };

  const resetFilters = () => {
    void navigate({
      to: "/boutique",
      search: {},
      replace: true,
    });
  };

  return (
    <div className="container flex flex-col gap-8 py-10 md:py-14">
      <SectionHeading
        eyebrow="Catalogue"
        title="Tous les produits"
        description="Explorez notre sélection de matériel gaming premium. Filtrez par catégorie, disponibilité et triez selon vos priorités."
      />

      <div className="grid gap-8 lg:grid-cols-[16rem_1fr]">
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl border border-border bg-card p-5">
            <ProductFilters
              activeCategory={category}
              availability={availability}
              onSelectCategory={(categoryId) =>
                updateSearch({ category: categoryId })
              }
              onSelectAvailability={(value) =>
                updateSearch({ availability: value })
              }
            />
          </div>
        </aside>

        <div className="flex min-w-0 flex-col gap-6">
          <ShopToolbar
            query={query}
            sort={sort}
            resultCount={products.length}
            isLoading={isLoading}
            onQueryChange={(value) => updateSearch({ q: value })}
            onSortChange={(value) => updateSearch({ sort: value })}
          />
          <ProductGrid
            products={products}
            isLoading={isLoading}
            onReset={resetFilters}
          />
        </div>
      </div>
    </div>
  );
}
