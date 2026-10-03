import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Category {
    id: CategoryId;
    name: string;
    description: string;
    image: string;
}
export type CategoryId = string;
export interface Cell {
    value: Value;
    name: string;
}
export interface CreateOrderInput {
    shipping: ShippingInfo;
    lines: Array<OrderLine>;
}
export type Error_ = {
    __kind__: "FrontendOriginsNotConfigured";
    FrontendOriginsNotConfigured: null;
} | {
    __kind__: "MixedSsoSources";
    MixedSsoSources: {
        otherKeys: Array<string>;
        ssoKeys: Array<string>;
    };
} | {
    __kind__: "Stale";
    Stale: {
        ageNs: bigint;
    };
} | {
    __kind__: "MalformedCandid";
    MalformedCandid: null;
} | {
    __kind__: "AmbiguousAttribute";
    AmbiguousAttribute: {
        field: string;
        sources: Array<string>;
    };
} | {
    __kind__: "NoAttributes";
    NoAttributes: null;
} | {
    __kind__: "UnknownNonce";
    UnknownNonce: null;
} | {
    __kind__: "UntrustedSsoSource";
    UntrustedSsoSource: {
        domain: string;
    };
} | {
    __kind__: "MissingField";
    MissingField: string;
} | {
    __kind__: "FrontendOriginMismatch";
    FrontendOriginMismatch: {
        got: string;
        expected: Array<string>;
    };
};
export interface Order {
    id: OrderId;
    status: OrderStatus;
    total: Price;
    createdAt: Timestamp;
    shippingFee: Price;
    shipping: ShippingInfo;
    lines: Array<OrderLine>;
    subtotal: Price;
}
export type OrderError = {
    __kind__: "unknownProduct";
    unknownProduct: ProductId;
} | {
    __kind__: "invalidQuantity";
    invalidQuantity: null;
} | {
    __kind__: "emptyCart";
    emptyCart: null;
};
export type OrderId = bigint;
export interface OrderLine {
    name: string;
    lineTotal: Price;
    productId: ProductId;
    quantity: bigint;
    unitPrice: Price;
}
export type Price = bigint;
export interface Product {
    id: ProductId;
    categoryId: CategoryId;
    features: Array<string>;
    name: string;
    description: string;
    discountPercent: bigint;
    availability: Availability;
    oldPrice?: Price;
    rating: bigint;
    price: Price;
    reviewCount: bigint;
    popularity: bigint;
    images: Array<string>;
}
export interface ProductFilter {
    categoryId?: CategoryId;
    sort?: SortOrder;
    search?: string;
}
export type ProductId = bigint;
export interface Result {
    hasMore: boolean;
    rows: Array<Array<Cell>>;
}
export type Result__1 = {
    __kind__: "ok";
    ok: Order;
} | {
    __kind__: "err";
    err: OrderError;
};
export type Result__1_1 = {
    __kind__: "ok";
    ok: null;
} | {
    __kind__: "err";
    err: Error_;
};
export interface ShippingInfo {
    country: string;
    city: string;
    postalCode: string;
    fullName: string;
    email: string;
    address: string;
    notes?: string;
    phone: string;
}
export type Timestamp = bigint;
export type Value = {
    __kind__: "int";
    int: bigint;
} | {
    __kind__: "nat";
    nat: bigint;
} | {
    __kind__: "float";
    float: number;
} | {
    __kind__: "bool";
    bool: boolean;
} | {
    __kind__: "null";
    null: null;
} | {
    __kind__: "text";
    text: string;
};
export enum Availability {
    inStock = "inStock",
    outOfStock = "outOfStock",
    lowStock = "lowStock"
}
export enum OrderStatus {
    shipped = "shipped",
    cancelled = "cancelled",
    pending = "pending",
    delivered = "delivered",
    confirmed = "confirmed"
}
export enum SortOrder {
    priceDesc = "priceDesc",
    rating = "rating",
    priceAsc = "priceAsc",
    popularity = "popularity"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    /**
     * / Crée une commande de démonstration (aucun paiement réel).
     */
    createOrder(input: CreateOrderInput): Promise<Result__1>;
    execute(qJson: string): Promise<Result>;
    /**
     * / Retourne la documentation Markdown de l'API publique actuelle.
     */
    getApiDoc(): Promise<string>;
    getCallerUserRole(): Promise<UserRole>;
    /**
     * / Retourne une catégorie par son identifiant.
     */
    getCategory(id: string): Promise<Category | null>;
    /**
     * / Retourne une commande de démonstration par son identifiant.
     */
    getOrder(id: bigint): Promise<Order | null>;
    /**
     * / Retourne un produit par son identifiant.
     */
    getProduct(id: bigint): Promise<Product | null>;
    isCallerAdmin(): Promise<boolean>;
    /**
     * / Retourne toutes les catégories.
     */
    listCategories(): Promise<Array<Category>>;
    /**
     * / Retourne les produits les plus populaires.
     */
    listPopularProducts(limit: bigint): Promise<Array<Product>>;
    /**
     * / Retourne tous les produits du catalogue.
     */
    listProducts(): Promise<Array<Product>>;
    /**
     * / Retourne les produits d'une catégorie.
     */
    listProductsByCategory(categoryId: string): Promise<Array<Product>>;
    /**
     * / Retourne les produits en promotion.
     */
    listPromoProducts(): Promise<Array<Product>>;
    schema(): Promise<string>;
    /**
     * / Recherche, filtre et trie les produits.
     */
    searchProducts(filter: ProductFilter): Promise<Array<Product>>;
}
