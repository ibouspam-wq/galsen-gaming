import type { CategoryMeta } from "@/types/catalog";

/**
 * Presentation metadata for the storefront categories. The backend owns the
 * canonical category records; this module maps them to imagery and icons so the
 * UI stays decoupled and easy to swap for a Shopify collection source.
 *
 * The `id` values MUST match the backend category IDs seeded in
 * `src/backend/migrations/00000000_000000.mo` exactly, because CategoryCard,
 * ProductFilters and Footer all navigate/filter with them.
 */
export const CATEGORY_META: CategoryMeta[] = [
  {
    id: "ecrans-gaming",
    name: "Écrans Gaming",
    description: "Écrans haute fréquence pour une image fluide et immersive.",
    image: "/assets/generated/cat-ecrans-gaming.dim_800x600.jpg",
    icon: "monitor",
  },
  {
    id: "claviers-gaming",
    name: "Claviers Gaming",
    description: "Claviers mécaniques réactifs et personnalisables.",
    image: "/assets/generated/cat-claviers.dim_800x600.jpg",
    icon: "keyboard",
  },
  {
    id: "souris-gaming",
    name: "Souris Gaming",
    description: "Souris précises et légères pour viser juste.",
    image: "/assets/generated/cat-souris.dim_800x600.jpg",
    icon: "mouse",
  },
  {
    id: "casques-gaming",
    name: "Casques Gaming",
    description: "Audio immersif et micro clair pour communiquer.",
    image: "/assets/generated/cat-casques.dim_800x600.jpg",
    icon: "headphones",
  },
  {
    id: "chaises-gaming",
    name: "Chaises Gaming",
    description: "Confort et maintien pour de longues sessions.",
    image: "/assets/generated/cat-chaises.dim_800x600.jpg",
    icon: "armchair",
  },
  {
    id: "tapis-de-souris",
    name: "Tapis de Souris",
    description: "Grandes surfaces pour des mouvements fluides.",
    image: "/assets/generated/cat-tapis-de-souris.dim_800x600.jpg",
    icon: "mouse",
  },
  {
    id: "boitiers-pc",
    name: "Boîtiers PC",
    description: "Boîtiers ventilés au design soigné.",
    image: "/assets/generated/cat-pc.dim_800x600.jpg",
    icon: "cpu",
  },
  {
    id: "eclairage-rgb",
    name: "Éclairage RGB",
    description: "Ambiance lumineuse et synchronisation RGB.",
    image: "/assets/generated/cat-setups.dim_800x600.jpg",
    icon: "lamp-desk",
  },
  {
    id: "accessoires-gaming",
    name: "Accessoires Gaming",
    description: "Supports, câbles et essentiels du setup.",
    image: "/assets/generated/cat-manettes.dim_800x600.jpg",
    icon: "gamepad-2",
  },
];

export function categoryMeta(id: string): CategoryMeta | undefined {
  return CATEGORY_META.find((category) => category.id === id);
}
