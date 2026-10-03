import { Availability, type Product } from "@/backend";

export function makeProduct(overrides: Partial<Product> = {}): Product {
  return {
    id: 1n,
    categoryId: "ecrans-gaming",
    features: ["Dalle QHD 165 Hz", "Temps de réponse 1 ms"],
    name: 'Écran Gaming 27" QHD 165 Hz',
    description: "Un écran immersif pour dominer chaque partie.",
    discountPercent: 0n,
    availability: Availability.inStock,
    rating: 48n,
    price: 29900n,
    reviewCount: 128n,
    popularity: 90n,
    images: [
      "/assets/images/products/ecran-27-qhd-165-1.jpg",
      "/assets/images/products/ecran-27-qhd-165-2.jpg",
    ],
    ...overrides,
  };
}

export const PRODUCT_A = makeProduct({
  id: 1n,
  name: 'Écran Gaming 27" QHD 165 Hz',
  price: 29900n,
  popularity: 90n,
});

export const PRODUCT_B = makeProduct({
  id: 2n,
  name: "Clavier Mécanique TKL RGB",
  categoryId: "claviers-gaming",
  price: 8900n,
  popularity: 70n,
  images: ["/assets/images/products/clavier-tkl-rgb-1.jpg"],
});

export const PRODUCT_PROMO = makeProduct({
  id: 3n,
  name: "Souris FPS 58 g",
  categoryId: "souris-gaming",
  price: 4900n,
  oldPrice: 6900n,
  discountPercent: 29n,
  popularity: 60n,
  images: ["/assets/images/products/souris-fps-58g-1.jpg"],
});

export const PRODUCT_OUT_OF_STOCK = makeProduct({
  id: 4n,
  name: "Chaise Racing Édition",
  categoryId: "chaises-gaming",
  price: 19900n,
  availability: Availability.outOfStock,
  popularity: 40n,
  images: ["/assets/images/products/chaise-racing-1.jpg"],
});

export const ALL_PRODUCTS: Product[] = [
  PRODUCT_A,
  PRODUCT_B,
  PRODUCT_PROMO,
  PRODUCT_OUT_OF_STOCK,
];
