import { Availability, type Product } from "@/backend";
import { CATEGORY_META } from "@/data/categories";
import {
  categoryImage,
  productImage,
  resolveProductImage,
} from "@/lib/catalog";
import { makeProduct } from "@/test/fixtures";
import { renderWithRouter } from "@/test/test-utils";
import { screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Cover for the category-imagery / product-coherence change:
 *
 * - the "Tapis de Souris" category image must show a real XXL gaming mouse pad,
 *   not a lone mouse;
 * - the "Écrans Gaming" category image must show real, correctly oriented
 *   gaming monitors on a desk;
 * - the four Tapis de Souris and four Écrans Gaming products must each render
 *   an image coherent with their title;
 * - every other category and the rest of the design must stay unchanged.
 *
 * The imagery itself is a binary asset, so these tests assert the observable
 * contract the UI depends on: which shipped asset each category and product
 * resolves to, and that the grids render those assets. They cannot judge the
 * pixels inside the JPEG.
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

/**
 * The four seeded Tapis de Souris products, mirroring
 * `src/backend/migrations/00000000_000000.mo`. Each entry pairs the product
 * title with the seeded image path and the shipped asset it must resolve to.
 */
const TAPIS_PRODUCTS: Array<{
  id: bigint;
  name: string;
  seeded: string;
  asset: string;
}> = [
  {
    id: 21n,
    name: "Tapis de Souris XXL RGB",
    seeded: "/assets/images/products/tapis-xxl-rgb-1.jpg",
    asset: "/assets/generated/tapis-xxl-rgb-1.dim_800x600.jpg",
  },
  {
    id: 22n,
    name: "Tapis de Souris Speed XL",
    seeded: "/assets/images/products/tapis-speed-xl-1.jpg",
    asset: "/assets/generated/tapis-speed-xl-1.dim_800x600.jpg",
  },
  {
    id: 23n,
    name: "Tapis de Souris Control L",
    seeded: "/assets/images/products/tapis-control-l-1.jpg",
    asset: "/assets/generated/tapis-control-l-1.dim_800x600.jpg",
  },
  {
    id: 24n,
    name: "Tapis de Souris Rigide Alu",
    seeded: "/assets/images/products/tapis-rigide-alu-1.jpg",
    asset: "/assets/generated/tapis-rigide-alu-1.dim_800x600.jpg",
  },
];

/** The four seeded Écrans Gaming products. */
const ECRANS_PRODUCTS: Array<{
  id: bigint;
  name: string;
  seeded: string;
  asset: string;
}> = [
  {
    id: 1n,
    name: 'Écran Gaming 27" QHD 165 Hz',
    seeded: "/assets/images/products/ecran-27-qhd-165-1.jpg",
    asset: "/assets/generated/ecran-27-qhd-165-1.dim_800x600.jpg",
  },
  {
    id: 2n,
    name: 'Écran Gaming 24" Full HD 144 Hz',
    seeded: "/assets/images/products/ecran-24-fhd-144-1.jpg",
    asset: "/assets/generated/ecran-24-fhd-144-1.dim_800x600.jpg",
  },
  {
    id: 3n,
    name: 'Écran UltraWide 34" 144 Hz',
    seeded: "/assets/images/products/ecran-ultrawide-34-1.jpg",
    asset: "/assets/generated/ecran-ultrawide-34-1.dim_800x600.jpg",
  },
  {
    id: 4n,
    name: 'Écran Gaming 32" 4K 144 Hz',
    seeded: "/assets/images/products/ecran-32-4k-144-1.jpg",
    asset: "/assets/generated/ecran-32-4k-144-1.dim_800x600.jpg",
  },
];

function toProduct(entry: {
  id: bigint;
  name: string;
  seeded: string;
}): Product {
  return makeProduct({
    id: entry.id,
    name: entry.name,
    categoryId: entry.name.startsWith("Tapis")
      ? "tapis-de-souris"
      : "ecrans-gaming",
    availability: Availability.inStock,
    images: [entry.seeded],
  });
}

const TAPIS_PRODUCT_MODELS = TAPIS_PRODUCTS.map(toProduct);
const ECRANS_PRODUCT_MODELS = ECRANS_PRODUCTS.map(toProduct);
const ALL_COVERED_PRODUCTS: Product[] = [
  ...TAPIS_PRODUCT_MODELS,
  ...ECRANS_PRODUCT_MODELS,
];

function imageSrcs(container: HTMLElement): string[] {
  return Array.from(container.querySelectorAll("img")).map(
    (img) => img.getAttribute("src") ?? "",
  );
}

describe("category imagery and product coherence", () => {
  beforeEach(() => {
    actor.listPopularProducts.mockResolvedValue(ALL_COVERED_PRODUCTS);
    actor.listPromoProducts.mockResolvedValue([]);
    actor.listProducts.mockResolvedValue(ALL_COVERED_PRODUCTS);
    actor.listCategories.mockResolvedValue([]);
    actor.listProductsByCategory.mockImplementation(
      async (categoryId: string) =>
        ALL_COVERED_PRODUCTS.filter(
          (product) => product.categoryId === categoryId,
        ),
    );
    actor.searchProducts.mockImplementation(
      async (filter: { categoryId?: string }) => {
        if (filter.categoryId) {
          return ALL_COVERED_PRODUCTS.filter(
            (product) => product.categoryId === filter.categoryId,
          );
        }
        return ALL_COVERED_PRODUCTS;
      },
    );
    actor.getProduct.mockImplementation(async (id: bigint) => {
      return ALL_COVERED_PRODUCTS.find((product) => product.id === id) ?? null;
    });
  });

  it("resolves the Tapis de Souris category image to the mouse-pad asset", () => {
    // The seeded backend path maps to the dedicated mouse-pad category asset,
    // not to the lone-mouse asset.
    expect(categoryImage("/assets/images/categories/tapis-de-souris.jpg")).toBe(
      "/assets/generated/cat-tapis-de-souris.dim_800x600.jpg",
    );
    expect(
      categoryImage("/assets/images/categories/tapis-de-souris.jpg"),
    ).not.toBe("/assets/generated/cat-souris.dim_800x600.jpg");
  });

  it("resolves the Écrans Gaming category image to the monitors asset", () => {
    expect(categoryImage("/assets/images/categories/ecrans-gaming.jpg")).toBe(
      "/assets/generated/cat-ecrans-gaming.dim_800x600.jpg",
    );
  });

  it("keeps every other category image mapping unchanged", () => {
    const unchanged: Record<string, string> = {
      "/assets/images/categories/claviers-gaming.jpg":
        "/assets/generated/cat-claviers.dim_800x600.jpg",
      "/assets/images/categories/souris-gaming.jpg":
        "/assets/generated/cat-souris.dim_800x600.jpg",
      "/assets/images/categories/casques-gaming.jpg":
        "/assets/generated/cat-casques.dim_800x600.jpg",
      "/assets/images/categories/chaises-gaming.jpg":
        "/assets/generated/cat-chaises.dim_800x600.jpg",
      "/assets/images/categories/boitiers-pc.jpg":
        "/assets/generated/cat-pc.dim_800x600.jpg",
      "/assets/images/categories/eclairage-rgb.jpg":
        "/assets/generated/cat-setups.dim_800x600.jpg",
      "/assets/images/categories/accessoires-gaming.jpg":
        "/assets/generated/cat-manettes.dim_800x600.jpg",
    };
    for (const [seeded, asset] of Object.entries(unchanged)) {
      expect(categoryImage(seeded)).toBe(asset);
    }
  });

  it("maps each Tapis de Souris product to its own coherent asset", () => {
    for (const entry of TAPIS_PRODUCTS) {
      expect(resolveProductImage(entry.seeded)).toBe(entry.asset);
      // Never the lone-mouse category asset.
      expect(resolveProductImage(entry.seeded)).not.toBe(
        "/assets/generated/cat-souris.dim_800x600.jpg",
      );
    }
  });

  it("maps each Écrans Gaming product to its own coherent asset", () => {
    for (const entry of ECRANS_PRODUCTS) {
      expect(resolveProductImage(entry.seeded)).toBe(entry.asset);
    }
  });

  it("renders the Tapis de Souris category card with the mouse-pad asset", async () => {
    const { container } = renderWithRouter("/categories");

    await screen.findByRole("heading", {
      level: 2,
      name: /toutes les catégories/i,
    });

    const index = CATEGORY_META.findIndex((c) => c.id === "tapis-de-souris");
    const card = container.querySelector(
      `[data-ocid="category.card.${index + 1}"]`,
    );
    expect(card).not.toBeNull();
    const img = card?.querySelector("img");
    expect(img?.getAttribute("src")).toBe(
      "/assets/generated/cat-tapis-de-souris.dim_800x600.jpg",
    );
  });

  it("renders the Écrans Gaming category card with the monitors asset", async () => {
    const { container } = renderWithRouter("/categories");

    await screen.findByRole("heading", {
      level: 2,
      name: /toutes les catégories/i,
    });

    const index = CATEGORY_META.findIndex((c) => c.id === "ecrans-gaming");
    const card = container.querySelector(
      `[data-ocid="category.card.${index + 1}"]`,
    );
    expect(card).not.toBeNull();
    const img = card?.querySelector("img");
    expect(img?.getAttribute("src")).toBe(
      "/assets/generated/cat-ecrans-gaming.dim_800x600.jpg",
    );
  });

  it("renders all four Tapis de Souris products with coherent images", async () => {
    const { container } = renderWithRouter(
      "/boutique?category=tapis-de-souris",
    );

    for (const entry of TAPIS_PRODUCTS) {
      expect(await screen.findByText(entry.name)).toBeInTheDocument();
    }

    const grid = container.querySelector('[data-ocid="shop.product_list"]');
    expect(grid).not.toBeNull();
    const cards = grid?.querySelectorAll('[data-ocid^="product.card."]') ?? [];
    expect(cards.length).toBe(4);

    // Each card's image is the asset for the product named in that card.
    for (const entry of TAPIS_PRODUCTS) {
      const card = Array.from(cards).find((node) =>
        node.textContent?.includes(entry.name),
      );
      expect(card).toBeDefined();
      const img = card?.querySelector("img");
      expect(img?.getAttribute("src")).toBe(entry.asset);
    }

    // No card falls back to the lone-mouse asset.
    for (const src of imageSrcs(grid as HTMLElement)) {
      expect(src).not.toBe("/assets/generated/cat-souris.dim_800x600.jpg");
    }
  });

  it("renders all four Écrans Gaming products with coherent images", async () => {
    const { container } = renderWithRouter("/boutique?category=ecrans-gaming");

    for (const entry of ECRANS_PRODUCTS) {
      expect(await screen.findByText(entry.name)).toBeInTheDocument();
    }

    const grid = container.querySelector('[data-ocid="shop.product_list"]');
    expect(grid).not.toBeNull();
    const cards = grid?.querySelectorAll('[data-ocid^="product.card."]') ?? [];
    expect(cards.length).toBe(4);

    for (const entry of ECRANS_PRODUCTS) {
      const card = Array.from(cards).find((node) =>
        node.textContent?.includes(entry.name),
      );
      expect(card).toBeDefined();
      const img = card?.querySelector("img");
      expect(img?.getAttribute("src")).toBe(entry.asset);
    }
  });

  it("keeps the storefront loading with images on the default route", async () => {
    const { container } = renderWithRouter("/");

    expect(
      await screen.findByRole("heading", { level: 1, name: /ton setup/i }),
    ).toBeInTheDocument();

    // The category section still renders all nine cards with shipped images.
    for (let index = 1; index <= 9; index += 1) {
      const card = container.querySelector(
        `[data-ocid="category.card.${index}"]`,
      );
      expect(card).not.toBeNull();
      const img = card?.querySelector("img");
      expect(img?.getAttribute("src")?.startsWith("/assets/generated/")).toBe(
        true,
      );
    }

    // Popular products render with resolved images.
    expect(
      await screen.findByText('Écran Gaming 27" QHD 165 Hz'),
    ).toBeInTheDocument();
    const popular = container.querySelector(
      '[data-ocid="home.popular.section"]',
    );
    expect(popular).not.toBeNull();
    for (const src of imageSrcs(popular as HTMLElement)) {
      expect(src.startsWith("/assets/generated/")).toBe(true);
    }
  });

  it("resolves the first image of each covered product via productImage", () => {
    for (const entry of [...TAPIS_PRODUCTS, ...ECRANS_PRODUCTS]) {
      expect(productImage(toProduct(entry))).toBe(entry.asset);
    }
  });
});
