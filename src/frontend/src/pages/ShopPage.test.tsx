import { ALL_PRODUCTS } from "@/test/fixtures";
import { renderWithRouter } from "@/test/test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const actor = vi.hoisted(() => ({
  listPopularProducts: vi.fn(),
  listPromoProducts: vi.fn(),
  listProducts: vi.fn(),
  listCategories: vi.fn(),
  getProduct: vi.fn(),
  listProductsByCategory: vi.fn(),
  searchProducts: vi.fn(),
  createOrder: vi.fn(),
  getOrder: vi.fn(),
  getCategory: vi.fn(),
  getApiDoc: vi.fn(),
}));

vi.mock("@caffeineai/core-infrastructure", () => ({
  useActor: () => ({ actor, isFetching: false }),
}));

vi.mock("@/backend", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/backend")>();
  return { ...actual, createActor: vi.fn() };
});

describe("ShopPage", () => {
  beforeEach(() => {
    actor.searchProducts.mockImplementation(
      async (filter: {
        categoryId?: string;
        search?: string;
        sort?: string;
      }) => {
        let result = [...ALL_PRODUCTS];
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
    );
  });

  it("renders the product grid from the backend", async () => {
    renderWithRouter("/boutique");

    expect(
      await screen.findByText('Écran Gaming 27" QHD 165 Hz'),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-ocid="shop.product_list"]'),
    ).not.toBeNull();
  });

  it("filters products by category and reflects it in the URL", async () => {
    const user = userEvent.setup();
    const { router } = renderWithRouter("/boutique");

    await screen.findByText('Écran Gaming 27" QHD 165 Hz');
    await user.click(
      document.querySelector(
        '[data-ocid="shop.filter.category.claviers-gaming"]',
      ) as HTMLElement,
    );

    await waitFor(() => {
      expect(screen.getByText("Clavier Mécanique TKL RGB")).toBeInTheDocument();
    });
    expect(
      screen.queryByText('Écran Gaming 27" QHD 165 Hz'),
    ).not.toBeInTheDocument();
    expect(router.state.location.search).toMatchObject({
      category: "claviers-gaming",
    });
  });

  it("sorts products by ascending price", async () => {
    const user = userEvent.setup();
    const { router } = renderWithRouter("/boutique");

    await screen.findByText('Écran Gaming 27" QHD 165 Hz');
    await user.click(
      document.querySelector('[data-ocid="shop.sort_select"]') as HTMLElement,
    );
    await user.click(
      await screen.findByRole("option", { name: /prix croissant/i }),
    );

    await waitFor(() => {
      expect(router.state.location.search).toMatchObject({ sort: "priceAsc" });
    });
    const cards = Array.from(
      document.querySelectorAll('[data-ocid^="product.card."]'),
    );
    expect(cards[0]?.textContent).toContain("Souris FPS 58 g");
  });

  it("searches products and reflects the query in the URL", async () => {
    const user = userEvent.setup();
    const { router } = renderWithRouter("/boutique");

    await screen.findByText('Écran Gaming 27" QHD 165 Hz');
    await user.type(
      document.querySelector('[data-ocid="shop.search_input"]') as HTMLElement,
      "clavier",
    );

    await waitFor(() => {
      expect(screen.getByText("Clavier Mécanique TKL RGB")).toBeInTheDocument();
    });
    expect(
      screen.queryByText('Écran Gaming 27" QHD 165 Hz'),
    ).not.toBeInTheDocument();
    expect(router.state.location.search).toMatchObject({ q: "clavier" });
  });

  it("shows an empty state when no product matches", async () => {
    const user = userEvent.setup();
    renderWithRouter("/boutique");

    await screen.findByText('Écran Gaming 27" QHD 165 Hz');
    await user.type(
      document.querySelector('[data-ocid="shop.search_input"]') as HTMLElement,
      "zzzz-introuvable",
    );

    expect(
      await screen.findByText(/aucun produit ne correspond/i),
    ).toBeInTheDocument();
  });
});
