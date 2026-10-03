import { Availability, type Product } from "@/backend";

export const SHIPPING_FEE_CENTS = 590n;
export const FREE_SHIPPING_THRESHOLD_CENTS = 9900n;

export function shippingFeeFor(subtotal: bigint): bigint {
  if (subtotal <= 0n) return 0n;
  return subtotal >= FREE_SHIPPING_THRESHOLD_CENTS ? 0n : SHIPPING_FEE_CENTS;
}

/**
 * The backend seeds product image paths under `/assets/images/products/*.jpg`,
 * but the project ships its real imagery under `/assets/generated/`. Map each
 * seeded path to an existing asset so no product card, gallery or cart
 * thumbnail ever renders a broken image. Unknown paths fall back to the
 * placeholder that is guaranteed to exist.
 */
const PRODUCT_IMAGE_FALLBACKS: Record<string, string> = {
  // Écrans Gaming
  "/assets/images/products/ecran-27-qhd-165-1.jpg":
    "/assets/generated/ecran-27-qhd-165-1.dim_800x600.jpg",
  "/assets/images/products/ecran-27-qhd-165-2.jpg":
    "/assets/generated/ecran-27-qhd-165-2.dim_800x600.jpg",
  "/assets/images/products/ecran-24-fhd-144-1.jpg":
    "/assets/generated/ecran-24-fhd-144-1.dim_800x600.jpg",
  "/assets/images/products/ecran-24-fhd-144-2.jpg":
    "/assets/generated/ecran-24-fhd-144-2.dim_800x600.jpg",
  "/assets/images/products/ecran-ultrawide-34-1.jpg":
    "/assets/generated/ecran-ultrawide-34-1.dim_800x600.jpg",
  "/assets/images/products/ecran-ultrawide-34-2.jpg":
    "/assets/generated/ecran-ultrawide-34-2.dim_800x600.jpg",
  "/assets/images/products/ecran-32-4k-144-1.jpg":
    "/assets/generated/ecran-32-4k-144-1.dim_800x600.jpg",
  "/assets/images/products/ecran-32-4k-144-2.jpg":
    "/assets/generated/ecran-32-4k-144-2.dim_800x600.jpg",
  // Claviers Gaming
  "/assets/images/products/clavier-tkl-rgb-1.jpg":
    "/assets/generated/cat-claviers.dim_800x600.jpg",
  "/assets/images/products/clavier-tkl-rgb-2.jpg":
    "/assets/generated/cat-claviers.dim_800x600.jpg",
  "/assets/images/products/clavier-60-hotswap-1.jpg":
    "/assets/generated/cat-claviers.dim_800x600.jpg",
  "/assets/images/products/clavier-60-hotswap-2.jpg":
    "/assets/generated/cat-claviers.dim_800x600.jpg",
  "/assets/images/products/clavier-fullsize-rgb-1.jpg":
    "/assets/generated/cat-claviers.dim_800x600.jpg",
  "/assets/images/products/clavier-fullsize-rgb-2.jpg":
    "/assets/generated/cat-claviers.dim_800x600.jpg",
  "/assets/images/products/clavier-optique-pro-1.jpg":
    "/assets/generated/cat-claviers.dim_800x600.jpg",
  "/assets/images/products/clavier-optique-pro-2.jpg":
    "/assets/generated/cat-claviers.dim_800x600.jpg",
  // Souris Gaming
  "/assets/images/products/souris-26000dpi-1.jpg":
    "/assets/generated/cat-souris.dim_800x600.jpg",
  "/assets/images/products/souris-26000dpi-2.jpg":
    "/assets/generated/cat-souris.dim_800x600.jpg",
  "/assets/images/products/souris-fps-58g-1.jpg":
    "/assets/generated/cat-souris.dim_800x600.jpg",
  "/assets/images/products/souris-fps-58g-2.jpg":
    "/assets/generated/cat-souris.dim_800x600.jpg",
  "/assets/images/products/souris-mmo-16b-1.jpg":
    "/assets/generated/cat-souris.dim_800x600.jpg",
  "/assets/images/products/souris-mmo-16b-2.jpg":
    "/assets/generated/cat-souris.dim_800x600.jpg",
  "/assets/images/products/souris-verticale-rgb-1.jpg":
    "/assets/generated/cat-souris.dim_800x600.jpg",
  "/assets/images/products/souris-verticale-rgb-2.jpg":
    "/assets/generated/cat-souris.dim_800x600.jpg",
  // Casques Gaming
  "/assets/images/products/casque-71-surround-1.jpg":
    "/assets/generated/cat-casques.dim_800x600.jpg",
  "/assets/images/products/casque-71-surround-2.jpg":
    "/assets/generated/cat-casques.dim_800x600.jpg",
  "/assets/images/products/casque-sansfil-lowlatency-1.jpg":
    "/assets/generated/cat-casques.dim_800x600.jpg",
  "/assets/images/products/casque-sansfil-lowlatency-2.jpg":
    "/assets/generated/cat-casques.dim_800x600.jpg",
  "/assets/images/products/casque-usb-studio-1.jpg":
    "/assets/generated/cat-casques.dim_800x600.jpg",
  "/assets/images/products/casque-usb-studio-2.jpg":
    "/assets/generated/cat-casques.dim_800x600.jpg",
  "/assets/images/products/casque-rgb-bt-1.jpg":
    "/assets/generated/cat-casques.dim_800x600.jpg",
  "/assets/images/products/casque-rgb-bt-2.jpg":
    "/assets/generated/cat-casques.dim_800x600.jpg",
  // Chaises Gaming
  "/assets/images/products/chaise-ergo-pro-1.jpg":
    "/assets/generated/cat-chaises.dim_800x600.jpg",
  "/assets/images/products/chaise-ergo-pro-2.jpg":
    "/assets/generated/cat-chaises.dim_800x600.jpg",
  "/assets/images/products/chaise-racing-1.jpg":
    "/assets/generated/cat-chaises.dim_800x600.jpg",
  "/assets/images/products/chaise-racing-2.jpg":
    "/assets/generated/cat-chaises.dim_800x600.jpg",
  "/assets/images/products/fauteuil-tissu-1.jpg":
    "/assets/generated/cat-chaises.dim_800x600.jpg",
  "/assets/images/products/fauteuil-tissu-2.jpg":
    "/assets/generated/cat-chaises.dim_800x600.jpg",
  "/assets/images/products/chaise-compacte-1.jpg":
    "/assets/generated/cat-chaises.dim_800x600.jpg",
  "/assets/images/products/chaise-compacte-2.jpg":
    "/assets/generated/cat-chaises.dim_800x600.jpg",
  // Tapis de Souris
  "/assets/images/products/tapis-xxl-rgb-1.jpg":
    "/assets/generated/tapis-xxl-rgb-1.dim_800x600.jpg",
  "/assets/images/products/tapis-xxl-rgb-2.jpg":
    "/assets/generated/tapis-xxl-rgb-2.dim_800x600.jpg",
  "/assets/images/products/tapis-speed-xl-1.jpg":
    "/assets/generated/tapis-speed-xl-1.dim_800x600.jpg",
  "/assets/images/products/tapis-speed-xl-2.jpg":
    "/assets/generated/tapis-speed-xl-2.dim_800x600.jpg",
  "/assets/images/products/tapis-control-l-1.jpg":
    "/assets/generated/tapis-control-l-1.dim_800x600.jpg",
  "/assets/images/products/tapis-control-l-2.jpg":
    "/assets/generated/tapis-control-l-2.dim_800x600.jpg",
  "/assets/images/products/tapis-rigide-alu-1.jpg":
    "/assets/generated/tapis-rigide-alu-1.dim_800x600.jpg",
  "/assets/images/products/tapis-rigide-alu-2.jpg":
    "/assets/generated/tapis-rigide-alu-2.dim_800x600.jpg",
  // Boîtiers PC
  "/assets/images/products/boitier-moyen-verre-1.jpg":
    "/assets/generated/cat-pc.dim_800x600.jpg",
  "/assets/images/products/boitier-moyen-verre-2.jpg":
    "/assets/generated/cat-pc.dim_800x600.jpg",
  "/assets/images/products/boitier-mini-itx-1.jpg":
    "/assets/generated/cat-pc.dim_800x600.jpg",
  "/assets/images/products/boitier-mini-itx-2.jpg":
    "/assets/generated/cat-pc.dim_800x600.jpg",
  "/assets/images/products/boitier-full-tower-1.jpg":
    "/assets/generated/cat-pc.dim_800x600.jpg",
  "/assets/images/products/boitier-full-tower-2.jpg":
    "/assets/generated/cat-pc.dim_800x600.jpg",
  "/assets/images/products/boitier-mesh-airflow-1.jpg":
    "/assets/generated/cat-pc.dim_800x600.jpg",
  "/assets/images/products/boitier-mesh-airflow-2.jpg":
    "/assets/generated/cat-pc.dim_800x600.jpg",
  // Éclairage RGB
  "/assets/images/products/bande-led-rgb-1.jpg":
    "/assets/generated/cat-setups.dim_800x600.jpg",
  "/assets/images/products/bande-led-rgb-2.jpg":
    "/assets/generated/cat-setups.dim_800x600.jpg",
  "/assets/images/products/kit-ventilos-argb-1.jpg":
    "/assets/generated/cat-setups.dim_800x600.jpg",
  "/assets/images/products/kit-ventilos-argb-2.jpg":
    "/assets/generated/cat-setups.dim_800x600.jpg",
  "/assets/images/products/barre-lumineuse-rgb-1.jpg":
    "/assets/generated/cat-setups.dim_800x600.jpg",
  "/assets/images/products/barre-lumineuse-rgb-2.jpg":
    "/assets/generated/cat-setups.dim_800x600.jpg",
  "/assets/images/products/support-casque-rgb-1.jpg":
    "/assets/generated/cat-setups.dim_800x600.jpg",
  "/assets/images/products/support-casque-rgb-2.jpg":
    "/assets/generated/cat-setups.dim_800x600.jpg",
  // Accessoires Gaming
  "/assets/images/products/manette-sansfil-pro-1.jpg":
    "/assets/generated/cat-manettes.dim_800x600.jpg",
  "/assets/images/products/manette-sansfil-pro-2.jpg":
    "/assets/generated/cat-manettes.dim_800x600.jpg",
  "/assets/images/products/hub-usbc-7en1-1.jpg":
    "/assets/generated/cat-manettes.dim_800x600.jpg",
  "/assets/images/products/hub-usbc-7en1-2.jpg":
    "/assets/generated/cat-manettes.dim_800x600.jpg",
  "/assets/images/products/support-ecran-bras-1.jpg":
    "/assets/generated/cat-manettes.dim_800x600.jpg",
  "/assets/images/products/support-ecran-bras-2.jpg":
    "/assets/generated/cat-manettes.dim_800x600.jpg",
  "/assets/images/products/tapis-bureau-xl-1.jpg":
    "/assets/generated/cat-manettes.dim_800x600.jpg",
  "/assets/images/products/tapis-bureau-xl-2.jpg":
    "/assets/generated/cat-manettes.dim_800x600.jpg",
};

/** Resolve any seeded product image path to an asset that exists. */
export function resolveProductImage(image: string | undefined): string {
  if (!image) return "/assets/images/placeholder.svg";
  return PRODUCT_IMAGE_FALLBACKS[image] ?? image;
}

export function productImage(product: Product): string {
  return resolveProductImage(product.images[0]);
}

/**
 * Resolve a backend category image path to an asset that actually exists in the
 * project. The backend seeds `/assets/images/categories/*.jpg`; the shipped
 * imagery lives under `/assets/generated/`.
 */
const CATEGORY_IMAGE_FALLBACKS: Record<string, string> = {
  "/assets/images/categories/ecrans-gaming.jpg":
    "/assets/generated/cat-ecrans-gaming.dim_800x600.jpg",
  "/assets/images/categories/claviers-gaming.jpg":
    "/assets/generated/cat-claviers.dim_800x600.jpg",
  "/assets/images/categories/souris-gaming.jpg":
    "/assets/generated/cat-souris.dim_800x600.jpg",
  "/assets/images/categories/casques-gaming.jpg":
    "/assets/generated/cat-casques.dim_800x600.jpg",
  "/assets/images/categories/chaises-gaming.jpg":
    "/assets/generated/cat-chaises.dim_800x600.jpg",
  "/assets/images/categories/tapis-de-souris.jpg":
    "/assets/generated/cat-tapis-de-souris.dim_800x600.jpg",
  "/assets/images/categories/boitiers-pc.jpg":
    "/assets/generated/cat-pc.dim_800x600.jpg",
  "/assets/images/categories/eclairage-rgb.jpg":
    "/assets/generated/cat-setups.dim_800x600.jpg",
  "/assets/images/categories/accessoires-gaming.jpg":
    "/assets/generated/cat-manettes.dim_800x600.jpg",
};

export function categoryImage(image: string | undefined): string {
  if (!image) return "/assets/images/placeholder.svg";
  return CATEGORY_IMAGE_FALLBACKS[image] ?? image;
}

export function isAvailable(product: Product): boolean {
  return product.availability !== Availability.outOfStock;
}

export function availabilityLabel(availability: Availability): string {
  switch (availability) {
    case Availability.inStock:
      return "En stock";
    case Availability.lowStock:
      return "Stock limité";
    case Availability.outOfStock:
      return "Rupture de stock";
    default:
      return "Disponibilité inconnue";
  }
}

export function availabilityTone(
  availability: Availability,
): "success" | "warning" | "destructive" {
  switch (availability) {
    case Availability.inStock:
      return "success";
    case Availability.lowStock:
      return "warning";
    default:
      return "destructive";
  }
}
