import { PRODUCT_A, PRODUCT_B, PRODUCT_PROMO } from "@/test/fixtures";
import { renderWithRouter } from "@/test/test-utils";
import { screen, waitFor, within } from "@testing-library/react";
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

describe("ProductPage", () => {
  beforeEach(() => {
    actor.getProduct.mockImplementation(async (id: bigint) => {
      if (id === PRODUCT_A.id) return PRODUCT_A;
      if (id === PRODUCT_PROMO.id) return PRODUCT_PROMO;
      return null;
    });
    actor.listProductsByCategory.mockResolvedValue([PRODUCT_A, PRODUCT_B]);
  });

  it("renders the product detail with gallery, price, description and specs", async () => {
    renderWithRouter("/produit/1");

    expect(
      await screen.findByRole("heading", { level: 1, name: PRODUCT_A.name }),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-ocid="product.gallery"]'),
    ).not.toBeNull();
    expect(
      document.querySelector('[data-ocid="product.gallery.thumbnails"]'),
    ).not.toBeNull();
    expect(screen.getByText(PRODUCT_A.description)).toBeInTheDocument();
    expect(
      screen.getByText(PRODUCT_A.features[0] as string),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-ocid="product.reviews.section"]'),
    ).not.toBeNull();
  });

  it("shows a discount badge and old price for a promo product", async () => {
    renderWithRouter("/produit/3");

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: PRODUCT_PROMO.name,
      }),
    ).toBeInTheDocument();
    expect(screen.getByText("-29%")).toBeInTheDocument();
  });

  it("adds the chosen quantity to the cart", async () => {
    const user = userEvent.setup();
    renderWithRouter("/produit/1");

    await screen.findByRole("heading", { level: 1, name: PRODUCT_A.name });
    await user.click(
      document.querySelector(
        '[data-ocid="product.quantity.increase_button"]',
      ) as HTMLElement,
    );
    expect(
      document.querySelector('[data-ocid="product.quantity.value"]')
        ?.textContent,
    ).toBe("2");

    await user.click(
      document.querySelector(
        '[data-ocid="product.add_to_cart_button"]',
      ) as HTMLElement,
    );

    const drawer = await screen.findByRole("dialog");
    expect(within(drawer).getByText(PRODUCT_A.name)).toBeInTheDocument();
    expect(document.querySelector('[data-ocid="cart.sheet"]')).not.toBeNull();
  });

  it("navigates to checkout when buying now", async () => {
    const user = userEvent.setup();
    const { router } = renderWithRouter("/produit/1");

    await screen.findByRole("heading", { level: 1, name: PRODUCT_A.name });
    await user.click(
      document.querySelector(
        '[data-ocid="product.buy_now_button"]',
      ) as HTMLElement,
    );

    await waitFor(() => {
      expect(router.state.location.pathname).toBe("/commande");
    });
  });

  it("renders similar products from the same category", async () => {
    renderWithRouter("/produit/1");

    await screen.findByRole("heading", { level: 1, name: PRODUCT_A.name });
    await waitFor(() => {
      expect(
        document.querySelector('[data-ocid="product.similar.section"]'),
      ).not.toBeNull();
    });
    expect(screen.getByText(PRODUCT_B.name)).toBeInTheDocument();
  });

  it("shows a not-found state for an unknown product", async () => {
    renderWithRouter("/produit/999");

    expect(await screen.findByText(/produit introuvable/i)).toBeInTheDocument();
  });
});
