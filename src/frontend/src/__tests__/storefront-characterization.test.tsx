import { Availability, type Product } from "@/backend";
import { CATEGORY_META } from "@/data/categories";
import {
  categoryImage,
  productImage,
  resolveProductImage,
} from "@/lib/catalog";
import { makeProduct } from "@/test/fixtures";
import { renderWithRouter } from "@/test/test-utils";
import { screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Characterization baseline for the storefront before the category imagery /
 * product-coherence change. These tests protect behavior that must keep
 * working: the default route renders a populated storefront, category grids
 * render products with resolved image sources, and the seeded-path image
 * fallback contract keeps every rendered image pointing at a shipped asset.
 *
 * They deliberately do NOT pin the current (possibly incoherent) mapping of a
 * specific category to a specific asset, because that is what the request
 * intends to change.
 */

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

/** A coherent Écrans Gaming product, mirroring the seeded backend entry. */
const ECRAN_PRODUCT = makeProduct({
  id: 1n,
  name: 'Écran Gaming 27" QHD 165 Hz',
  categoryId: "ecrans-gaming",
  price: 189000n,
  popularity: 980n,
  images: [
    "/assets/images/products/ecran-27-qhd-165-1.jpg",
    "/assets/images/products/ecran-27-qhd-165-2.jpg",
  ],
});

/** A second Écrans Gaming product so the grid has more than one card. */
const ECRAN_PRODUCT_2 = makeProduct({
  id: 2n,
  name: 'Écran Gaming 24" Full HD 144 Hz',
  categoryId: "ecrans-gaming",
  price: 119000n,
  popularity: 870n,
  images: [
    "/assets/images/products/ecran-24-fhd-144-1.jpg",
    "/assets/images/products/ecran-24-fhd-144-2.jpg",
  ],
});

const ECRANS_PRODUCTS: Product[] = [ECRAN_PRODUCT, ECRAN_PRODUCT_2];

function imageSrcs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("img")).map(
    (img) => img.getAttribute("src") ?? "",
  );
}

describe("storefront characterization", () => {
  beforeEach(() => {
    actor.listPopularProducts.mockResolvedValue(ECRANS_PRODUCTS);
    actor.listPromoProducts.mockResolvedValue([]);
    actor.listProducts.mockResolvedValue(ECRANS_PRODUCTS);
    actor.listCategories.mockResolvedValue([]);
    actor.listProductsByCategory.mockImplementation(
      async (categoryId: string) =>
        ECRANS_PRODUCTS.filter((product) => product.categoryId === categoryId),
    );
    actor.searchProducts.mockImplementation(
      async (filter: { categoryId?: string }) => {
        if (filter.categoryId) {
          return ECRANS_PRODUCTS.filter(
            (product) => product.categoryId === filter.categoryId,
          );
        }
        return ECRANS_PRODUCTS;
      },
    );
    actor.getProduct.mockImplementation(async (id: bigint) => {
      return ECRANS_PRODUCTS.find((product) => product.id === id) ?? null;
    });
  });

  it("renders a populated storefront on the default route", async () => {
    const { container } = renderWithRouter("/");

    // Not a blank screen: the hero heading is present.
    expect(
      await screen.findByRole("heading", { level: 1, name: /ton setup/i }),
    ).toBeInTheDocument();

    // The category section renders all nine category cards.
    for (let index = 1; index <= 9; index += 1) {
      expect(
        container.querySelector(`[data-ocid="category.card.${index}"]`),
      ).not.toBeNull();
    }

    // Popular products render from the backend.
    expect(
      await screen.findByText('Écran Gaming 27" QHD 165 Hz'),
    ).toBeInTheDocument();
    expect(
      container.querySelector('[data-ocid="home.popular.section"]'),
    ).not.toBeNull();
  });

  it("renders the Écrans Gaming category grid with resolved product images", async () => {
    const { container } = renderWithRouter("/boutique?category=ecrans-gaming");

    expect(
      await screen.findByText('Écran Gaming 27" QHD 165 Hz'),
    ).toBeInTheDocument();
    expect(
      await screen.findByText('Écran Gaming 24" Full HD 144 Hz'),
    ).toBeInTheDocument();

    const grid = container.querySelector('[data-ocid="shop.product_list"]');
    expect(grid).not.toBeNull();

    const cards = grid?.querySelectorAll('[data-ocid^="product.card."]') ?? [];
    expect(cards.length).toBe(2);

    // Every product card image points at a shipped asset, never a broken
    // seeded path.
    const srcs = imageSrcs(grid as HTMLElement);
    expect(srcs.length).toBeGreaterThan(0);
    for (const src of srcs) {
      expect(src).not.toContain("/assets/images/products/");
      expect(src.startsWith("/assets/generated/")).toBe(true);
    }
  });

  it("renders every category card with a shipped image", async () => {
    const { container } = renderWithRouter("/categories");

    await screen.findByRole("heading", {
      level: 2,
      name: /toutes les catégories/i,
    });

    for (const category of CATEGORY_META) {
      const card = container.querySelector(
        `[data-ocid="category.card.${CATEGORY_META.indexOf(category) + 1}"]`,
      );
      expect(card).not.toBeNull();
      const img = card?.querySelector("img");
      expect(img).not.toBeNull();
      expect(img?.getAttribute("src")).toBe(category.image);
      expect(img?.getAttribute("src")?.startsWith("/assets/generated/")).toBe(
        true,
      );
    }
  });

  it("resolves seeded product image paths to shipped assets", () => {
    // A seeded backend path resolves to an existing generated asset.
    expect(
      resolveProductImage("/assets/images/products/ecran-27-qhd-165-1.jpg"),
    ).toBe("/assets/generated/ecran-27-qhd-165-1.dim_800x600.jpg");

    // An unknown path passes through unchanged.
    expect(resolveProductImage("/assets/images/products/unknown.jpg")).toBe(
      "/assets/images/products/unknown.jpg",
    );

    // A missing image falls back to the placeholder.
    expect(resolveProductImage(undefined)).toBe(
      "/assets/images/placeholder.svg",
    );

    // productImage uses the first image of the product.
    expect(productImage(ECRAN_PRODUCT)).toBe(
      "/assets/generated/ecran-27-qhd-165-1.dim_800x600.jpg",
    );
  });

  it("resolves seeded category image paths to shipped assets", () => {
    expect(categoryImage("/assets/images/categories/ecrans-gaming.jpg")).toBe(
      "/assets/generated/cat-ecrans-gaming.dim_800x600.jpg",
    );

    expect(categoryImage(undefined)).toBe("/assets/images/placeholder.svg");
  });

  it("renders the product detail gallery with resolved images", async () => {
    const { container } = renderWithRouter("/produit/1");

    expect(
      await screen.findByRole("heading", {
        level: 1,
        name: 'Écran Gaming 27" QHD 165 Hz',
      }),
    ).toBeInTheDocument();

    const gallery = container.querySelector('[data-ocid="product.gallery"]');
    expect(gallery).not.toBeNull();

    await waitFor(() => {
      const srcs = imageSrcs(gallery as HTMLElement);
      expect(srcs.length).toBeGreaterThan(0);
      for (const src of srcs) {
        expect(src.startsWith("/assets/generated/")).toBe(true);
      }
    });

    // Both seeded gallery images resolve to a shipped asset.
    expect(
      container.querySelector('[data-ocid="product.gallery.thumbnails"]'),
    ).not.toBeNull();
  });

  it("keeps out-of-stock products visible but not addable", async () => {
    const outOfStock = makeProduct({
      id: 4n,
      name: "Chaise Racing Édition",
      categoryId: "chaises-gaming",
      availability: Availability.outOfStock,
      images: ["/assets/images/products/chaise-racing-1.jpg"],
    });
    actor.searchProducts.mockResolvedValue([outOfStock]);

    const { container } = renderWithRouter("/boutique");

    expect(
      await screen.findByText("Chaise Racing Édition"),
    ).toBeInTheDocument();
    const addButton = container.querySelector(
      '[data-ocid="product.add_button.1"]',
    ) as HTMLButtonElement | null;
    expect(addButton).not.toBeNull();
    expect(addButton?.disabled).toBe(true);
  });
});
