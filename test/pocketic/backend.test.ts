import { PocketIc } from "@dfinity/pic";
import type { Actor, CanisterFixture } from "@dfinity/pic";
import { afterAll, beforeAll, expect, it } from "vitest";

import { idlFactory } from "../../src/frontend/src/declarations/backend.did.js";
import type { _SERVICE } from "../../src/frontend/src/declarations/backend.did";

const PIC_URL = process.env.POCKET_IC_URL ?? "";
const BACKEND_WASM = process.env.BACKEND_WASM ?? "";

let pic: PocketIc | undefined;
let actor: Actor<_SERVICE>;
let canisterId: CanisterFixture<_SERVICE>["canisterId"];

beforeAll(async () => {
  pic = await PocketIc.create(PIC_URL);
  ({ actor, canisterId } = await pic.setupCanister<_SERVICE>({
    idlFactory,
    wasm: BACKEND_WASM,
  }));
});

afterAll(async () => {
  await pic?.tearDown();
});

it("answers empty-state reads instead of trapping", async () => {
  // The migration seeds the catalog, so these are not empty; the point is that
  // each public read resolves rather than trapping on a stubbed backend.
  await expect(actor.listProducts()).resolves.toBeInstanceOf(Array);
  await expect(actor.listCategories()).resolves.toBeInstanceOf(Array);
  await expect(actor.listPromoProducts()).resolves.toBeInstanceOf(Array);
  await expect(actor.getProduct(999999n)).resolves.toEqual([]);
  await expect(actor.getCategory("inconnue")).resolves.toEqual([]);
  await expect(actor.getOrder(999999n)).resolves.toEqual([]);
});

it("serves the seeded catalog through the real canister", async () => {
  const products = await actor.listProducts();
  expect(products.length).toBeGreaterThan(0);

  const categories = await actor.listCategories();
  expect(categories.length).toBe(9);

  const first = products[0];
  expect(first).toBeDefined();
  const fetched = await actor.getProduct(first!.id);
  expect(fetched).toHaveLength(1);
  expect(fetched[0]?.name).toBe(first!.name);

  const category = await actor.getCategory(first!.categoryId);
  expect(category).toHaveLength(1);
  expect(category[0]?.id).toBe(first!.categoryId);
});

it("filters, searches and sorts products", async () => {
  const byCategory = await actor.listProductsByCategory("claviers-gaming");
  expect(byCategory.length).toBeGreaterThan(0);
  expect(byCategory.every((product) => product.categoryId === "claviers-gaming")).toBe(true);

  const popular = await actor.listPopularProducts(3n);
  expect(popular).toHaveLength(3);
  expect(Number(popular[0]!.popularity)).toBeGreaterThanOrEqual(
    Number(popular[1]!.popularity),
  );

  const promos = await actor.listPromoProducts();
  expect(promos.length).toBeGreaterThan(0);
  expect(promos.every((product) => product.discountPercent > 0n)).toBe(true);

  const searched = await actor.searchProducts({
    categoryId: [],
    search: ["clavier"],
    sort: [],
  });
  expect(searched.length).toBeGreaterThan(0);
  expect(
    searched.every((product) => product.name.toLowerCase().includes("clavier")),
  ).toBe(true);

  const ascending = await actor.searchProducts({
    categoryId: [],
    search: [],
    sort: [{ priceAsc: null }],
  });
  for (let index = 1; index < ascending.length; index += 1) {
    expect(Number(ascending[index]!.price)).toBeGreaterThanOrEqual(
      Number(ascending[index - 1]!.price),
    );
  }
});

it("creates an order and reads it back with computed totals", async () => {
  const shipping = {
    fullName: "Awa Diop",
    email: "awa.diop@exemple.fr",
    phone: "06 12 34 56 78",
    address: "12 rue des Gamers",
    city: "Paris",
    postalCode: "75011",
    country: "France",
    notes: [],
  };

  // 2 × 8900 = 17800, below the 9900 free-shipping threshold? No: 17800 >= 9900,
  // so shipping is free and the total equals the subtotal.
  const result = await actor.createOrder({
    shipping,
    lines: [
      {
        productId: 2n,
        name: "Clavier Mécanique TKL RGB",
        unitPrice: 8900n,
        quantity: 2n,
        lineTotal: 17800n,
      },
    ],
  });

  expect("ok" in result).toBe(true);
  if (!("ok" in result)) {
    throw new Error("expected an ok order");
  }
  const order = result.ok;
  expect(order.subtotal).toBe(17800n);
  expect(order.shippingFee).toBe(0n);
  expect(order.total).toBe(17800n);
  expect(order.status).toEqual({ pending: null });

  const stored = await actor.getOrder(order.id);
  expect(stored).toHaveLength(1);
  expect(stored[0]?.id).toBe(order.id);
  expect(stored[0]?.total).toBe(17800n);
});

it("charges shipping below the free-shipping threshold", async () => {
  const result = await actor.createOrder({
    shipping: {
      fullName: "Moussa Ndiaye",
      email: "moussa@exemple.fr",
      phone: "07 00 00 00 00",
      address: "5 avenue du Jeu",
      city: "Lyon",
      postalCode: "69001",
      country: "France",
      notes: [],
    },
    lines: [
      {
        productId: 23n,
        name: "Tapis de Souris Control L",
        unitPrice: 9000n,
        quantity: 1n,
        lineTotal: 9000n,
      },
    ],
  });

  expect("ok" in result).toBe(true);
  if (!("ok" in result)) {
    throw new Error("expected an ok order");
  }
  expect(result.ok.subtotal).toBe(9000n);
  expect(result.ok.shippingFee).toBe(590n);
  expect(result.ok.total).toBe(9590n);
});

it("rejects an empty cart", async () => {
  const result = await actor.createOrder({
    shipping: {
      fullName: "Awa Diop",
      email: "awa.diop@exemple.fr",
      phone: "06 12 34 56 78",
      address: "12 rue des Gamers",
      city: "Paris",
      postalCode: "75011",
      country: "France",
      notes: [],
    },
    lines: [],
  });

  expect(result).toEqual({ err: { emptyCart: null } });
});

it("exposes the API documentation", async () => {
  const doc = await actor.getApiDoc();
  expect(typeof doc).toBe("string");
  expect(doc.length).toBeGreaterThan(0);
});
