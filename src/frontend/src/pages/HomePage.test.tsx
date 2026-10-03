import { ALL_PRODUCTS, PRODUCT_PROMO } from "@/test/fixtures";
import { renderWithRouter } from "@/test/test-utils";
import { screen, waitFor } from "@testing-library/react";
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

describe("HomePage", () => {
  beforeEach(() => {
    actor.listPopularProducts.mockResolvedValue(ALL_PRODUCTS);
    actor.listPromoProducts.mockResolvedValue([PRODUCT_PROMO]);
    actor.listProducts.mockResolvedValue(ALL_PRODUCTS);
    actor.listCategories.mockResolvedValue([]);
  });

  it("renders the hero title and both calls to action", async () => {
    renderWithRouter("/");

    expect(
      await screen.findByRole("heading", { level: 1, name: /ton setup/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /découvrir les produits/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /voir les offres/i }),
    ).toBeInTheDocument();
  });

  it("shows the nine clickable category cards", async () => {
    renderWithRouter("/");

    await screen.findByRole("heading", { level: 1, name: /ton setup/i });
    for (let index = 1; index <= 9; index += 1) {
      expect(
        document.querySelector(`[data-ocid="category.card.${index}"]`),
      ).not.toBeNull();
    }
  });

  it("renders popular products returned by the backend", async () => {
    renderWithRouter("/");

    await waitFor(() => {
      expect(
        screen.getByText('Écran Gaming 27" QHD 165 Hz'),
      ).toBeInTheDocument();
    });
    expect(screen.getByText("Clavier Mécanique TKL RGB")).toBeInTheDocument();
  });

  it("renders the promo and FAQ sections", async () => {
    renderWithRouter("/");

    await screen.findByRole("heading", { level: 1, name: /ton setup/i });
    expect(
      document.querySelector('[data-ocid="home.promo.section"]'),
    ).not.toBeNull();
    expect(
      document.querySelector('[data-ocid="home.faq.section"]'),
    ).not.toBeNull();
    expect(
      screen.getByRole("heading", { name: /améliore ton setup/i }),
    ).toBeInTheDocument();
  });
});
