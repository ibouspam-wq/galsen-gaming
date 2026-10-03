import type { Review } from "@/types/catalog";

export const REVIEWS: Review[] = [
  {
    id: "rev-1",
    author: "Moussa D.",
    rating: 5,
    date: "12 septembre 2026",
    title: "Qualité au rendez-vous",
    body: "Livraison rapide et le clavier est encore mieux qu'en photo. Le rétroéclairage violet est superbe sans être agressif.",
  },
  {
    id: "rev-2",
    author: "Awa N.",
    rating: 5,
    date: "3 septembre 2026",
    title: "Setup transformé",
    body: "J'ai commandé un écran et une souris, tout est arrivé bien emballé. Le service client répond vite et en français.",
  },
  {
    id: "rev-3",
    author: "Ibrahima S.",
    rating: 4,
    date: "28 août 2026",
    title: "Excellent rapport qualité-prix",
    body: "Le casque isole très bien et le micro est clair. Petit bémol sur le câble un peu court, mais rien de bloquant.",
  },
];
