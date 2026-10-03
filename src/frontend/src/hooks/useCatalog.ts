import { createActor } from "@/backend";
import type { Product, ProductFilter } from "@/backend";
import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export function useProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProduct(id: bigint | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product | null>({
    queryKey: ["product", id?.toString()],
    queryFn: async () => {
      if (!actor || id === undefined) return null;
      return actor.getProduct(id);
    },
    enabled: !!actor && !isFetching && id !== undefined,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listCategories();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePopularProducts(limit = 8) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "popular", limit],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPopularProducts(BigInt(limit));
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePromoProducts() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "promo"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.listPromoProducts();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useProductsByCategory(categoryId: string | undefined) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: ["products", "category", categoryId],
    queryFn: async () => {
      if (!actor || !categoryId) return [];
      return actor.listProductsByCategory(categoryId);
    },
    enabled: !!actor && !isFetching && !!categoryId,
  });
}

export function useSearchProducts(filter: ProductFilter) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<Product[]>({
    queryKey: [
      "products",
      "search",
      filter.search ?? "",
      filter.categoryId ?? "",
      filter.sort ?? "",
    ],
    queryFn: async () => {
      if (!actor) return [];
      return actor.searchProducts(filter);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCreateOrder() {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (
      input: Parameters<NonNullable<typeof actor>["createOrder"]>[0],
    ) => {
      if (!actor) throw new Error("Le service est indisponible");
      return actor.createOrder(input);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
}
