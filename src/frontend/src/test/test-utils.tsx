import type { Product } from "@/backend";
import { CartProvider } from "@/context/CartContext";
import { router as appRouter } from "@/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createMemoryHistory,
  createRouter,
} from "@tanstack/react-router";
import { type RenderResult, render } from "@testing-library/react";
import type { ReactElement } from "react";
import { vi } from "vitest";
import { ALL_PRODUCTS } from "./fixtures";

/**
 * A typed local actor mock. Every method the storefront calls is implemented
 * here so tests exercise the real hooks/components against deterministic data
 * instead of the network.
 */
export interface MockActor {
  listProducts: ReturnType<typeof vi.fn>;
  getProduct: ReturnType<typeof vi.fn>;
  listCategories: ReturnType<typeof vi.fn>;
  listPopularProducts: ReturnType<typeof vi.fn>;
  listPromoProducts: ReturnType<typeof vi.fn>;
  listProductsByCategory: ReturnType<typeof vi.fn>;
  searchProducts: ReturnType<typeof vi.fn>;
  createOrder: ReturnType<typeof vi.fn>;
  getOrder: ReturnType<typeof vi.fn>;
  getCategory: ReturnType<typeof vi.fn>;
  getApiDoc: ReturnType<typeof vi.fn>;
}

export function createMockActor(products: Product[] = ALL_PRODUCTS): MockActor {
  return {
    listProducts: vi.fn(async () => products),
    getProduct: vi.fn(async (id: bigint) => {
      return products.find((product) => product.id === id) ?? null;
    }),
    listCategories: vi.fn(async () => []),
    listPopularProducts: vi.fn(async (limit: bigint) =>
      [...products]
        .sort((a, b) => Number(b.popularity - a.popularity))
        .slice(0, Number(limit)),
    ),
    listPromoProducts: vi.fn(async () =>
      products.filter((product) => product.discountPercent > 0n),
    ),
    listProductsByCategory: vi.fn(async (categoryId: string) =>
      products.filter((product) => product.categoryId === categoryId),
    ),
    searchProducts: vi.fn(
      async (filter: {
        categoryId?: string;
        search?: string;
        sort?: string;
      }) => {
        let result = [...products];
        if (filter.categoryId) {
          result = result.filter(
            (product) => product.categoryId === filter.categoryId,
          );
        }
        if (filter.search) {
          const needle = filter.search.toLowerCase();
          result = result.filter((product) =>
            product.name.toLowerCase().includes(needle),
          );
        }
        switch (filter.sort) {
          case "priceAsc":
            result.sort((a, b) => Number(a.price - b.price));
            break;
          case "priceDesc":
            result.sort((a, b) => Number(b.price - a.price));
            break;
          case "rating":
            result.sort((a, b) => Number(b.rating - a.rating));
            break;
          default:
            result.sort((a, b) => Number(b.popularity - a.popularity));
        }
        return result;
      },
    ),
    createOrder: vi.fn(async () => ({
      __kind__: "ok" as const,
      ok: {
        id: 42n,
        status: "confirmed" as const,
        total: 0n,
        createdAt: 0n,
        shippingFee: 0n,
        shipping: {
          fullName: "Awa Diop",
          email: "awa.diop@exemple.fr",
          phone: "06 12 34 56 78",
          address: "12 rue des Gamers",
          city: "Paris",
          postalCode: "75011",
          country: "France",
        },
        lines: [],
        subtotal: 0n,
      },
    })),
    getOrder: vi.fn(async () => null),
    getCategory: vi.fn(async () => null),
    getApiDoc: vi.fn(async () => "# API"),
  };
}

export function createTestQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  });
}

/**
 * Render a component inside the providers the real app uses (React Query +
 * Cart). Router-dependent components should use `renderWithRouter` instead.
 */
export function renderWithProviders(
  ui: ReactElement,
  queryClient: QueryClient = createTestQueryClient(),
): RenderResult & { queryClient: QueryClient } {
  const result = render(
    <QueryClientProvider client={queryClient}>
      <CartProvider>{ui}</CartProvider>
    </QueryClientProvider>,
  );
  return { ...result, queryClient };
}

/**
 * Render the real application router at a given path. A fresh router instance
 * is created per call so tests do not leak navigation state into each other.
 */
export function renderWithRouter(
  initialPath = "/",
  queryClient: QueryClient = createTestQueryClient(),
): RenderResult & {
  queryClient: QueryClient;
  router: ReturnType<typeof createRouter<typeof appRouter.routeTree>>;
} {
  const testRouter = createRouter({
    routeTree: appRouter.routeTree,
    history: createMemoryHistory({ initialEntries: [initialPath] }),
  });
  const result = render(
    <QueryClientProvider client={queryClient}>
      <CartProvider>
        <RouterProvider router={testRouter} />
      </CartProvider>
    </QueryClientProvider>,
  );
  return { ...result, queryClient, router: testRouter };
}
