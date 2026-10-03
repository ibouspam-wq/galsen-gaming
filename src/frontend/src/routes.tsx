import { Layout } from "@/components/layout/Layout";
import { AboutPage } from "@/pages/AboutPage";
import { CartPage } from "@/pages/CartPage";
import { CategoriesPage } from "@/pages/CategoriesPage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { ContactPage } from "@/pages/ContactPage";
import { HomePage } from "@/pages/HomePage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { PrivacyPage } from "@/pages/PrivacyPage";
import { ProductPage } from "@/pages/ProductPage";
import { PromotionsPage } from "@/pages/PromotionsPage";
import { ReturnPolicyPage } from "@/pages/ReturnPolicyPage";
import { ShippingPolicyPage } from "@/pages/ShippingPolicyPage";
import { ShopPage } from "@/pages/ShopPage";
import { TermsPage } from "@/pages/TermsPage";
import {
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({
  component: Layout,
  notFoundComponent: NotFoundPage,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const shopRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/boutique",
  validateSearch: (
    search: Record<string, unknown>,
  ): {
    category?: string;
    q?: string;
    sort?: string;
    availability?: string;
  } => ({
    category: typeof search.category === "string" ? search.category : undefined,
    q: typeof search.q === "string" ? search.q : undefined,
    sort: typeof search.sort === "string" ? search.sort : undefined,
    availability:
      typeof search.availability === "string" ? search.availability : undefined,
  }),
  component: ShopPage,
});

const productRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/produit/$id",
  component: ProductPage,
});

const cartRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/panier",
  component: CartPage,
});

const checkoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/commande",
  component: CheckoutPage,
});

const promotionsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/promotions",
  component: PromotionsPage,
});

const categoriesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/categories",
  component: CategoriesPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/a-propos",
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/contact",
  component: ContactPage,
});

const privacyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/confidentialite",
  component: PrivacyPage,
});

const termsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/cgv",
  component: TermsPage,
});

const shippingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/livraison",
  component: ShippingPolicyPage,
});

const returnsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/retours",
  component: ReturnPolicyPage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  shopRoute,
  productRoute,
  cartRoute,
  checkoutRoute,
  promotionsRoute,
  categoriesRoute,
  aboutRoute,
  contactRoute,
  privacyRoute,
  termsRoute,
  shippingRoute,
  returnsRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
