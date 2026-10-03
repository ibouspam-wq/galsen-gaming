import { PRODUCT_A, PRODUCT_B } from "@/test/fixtures";
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

const STORAGE_KEY = "galsen-gaming-cart";

function seedCart(
  items: Array<{
    productId: string;
    name: string;
    price: string;
    image: string;
    quantity: number;
  }>,
) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

describe("CartPage", () => {
  beforeEach(() => {
    actor.listProducts.mockResolvedValue([PRODUCT_A, PRODUCT_B]);
  });

  it("shows an empty state when the cart has no items", async () => {
    renderWithRouter("/panier");

    expect(
      await screen.findByText(/votre panier est vide/i),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-ocid="cart.empty_state"]'),
    ).not.toBeNull();
  });

  it("renders stored items with subtotal, shipping and total", async () => {
    // 89,00 € is below the 99 € free-shipping threshold, so 5,90 € applies.
    seedCart([
      {
        productId: "2",
        name: PRODUCT_B.name,
        price: "8900",
        image: "/assets/generated/cat-claviers.dim_800x600.jpg",
        quantity: 1,
      },
    ]);
    renderWithRouter("/panier");

    expect(await screen.findByText(PRODUCT_B.name)).toBeInTheDocument();
    const summary = document.querySelector(
      '[data-ocid="cart.summary_panel"]',
    ) as HTMLElement;
    expect(summary).not.toBeNull();
    expect(summary.textContent).toContain("89,00");
    expect(summary.textContent).toContain("5,90");
    expect(
      document.querySelector('[data-ocid="cart.total"]')?.textContent,
    ).toContain("94,90");
  });

  it("increments a line quantity and updates the total", async () => {
    const user = userEvent.setup();
    seedCart([
      {
        productId: "2",
        name: PRODUCT_B.name,
        price: "8900",
        image: "/assets/generated/cat-claviers.dim_800x600.jpg",
        quantity: 1,
      },
    ]);
    renderWithRouter("/panier");

    await screen.findByText(PRODUCT_B.name);
    await user.click(
      screen.getByRole("button", {
        name: `Augmenter la quantité de ${PRODUCT_B.name}`,
      }),
    );

    await waitFor(() => {
      expect(
        document.querySelector('[data-ocid="cart.quantity.1"]')?.textContent,
      ).toBe("2");
    });
    // 2 × 89,00 € = 178,00 € subtotal, free shipping, total 178,00 €.
    expect(
      document.querySelector('[data-ocid="cart.total"]')?.textContent,
    ).toContain("178,00");
  });

  it("removes an item from the cart", async () => {
    const user = userEvent.setup();
    seedCart([
      {
        productId: "2",
        name: PRODUCT_B.name,
        price: "8900",
        image: "/assets/generated/cat-claviers.dim_800x600.jpg",
        quantity: 1,
      },
    ]);
    renderWithRouter("/panier");

    await screen.findByText(PRODUCT_B.name);
    await user.click(
      screen.getByRole("button", {
        name: `Retirer ${PRODUCT_B.name} du panier`,
      }),
    );

    await waitFor(() => {
      expect(screen.getByText(/votre panier est vide/i)).toBeInTheDocument();
    });
  });

  it("offers free shipping above the threshold", async () => {
    seedCart([
      {
        productId: "1",
        name: PRODUCT_A.name,
        price: "29900",
        image: "/assets/generated/cat-ecrans.dim_800x600.jpg",
        quantity: 1,
      },
    ]);
    renderWithRouter("/panier");

    await screen.findByText(PRODUCT_A.name);
    expect(
      screen.getByText(/livraison offerte sur cette commande/i),
    ).toBeInTheDocument();
    expect(
      document.querySelector('[data-ocid="cart.total"]')?.textContent,
    ).toContain("299,00");
  });
});
