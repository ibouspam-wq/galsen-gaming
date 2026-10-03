import Map "mo:core/Map";
import Types "../types/catalog";
import CatalogLib "../lib/catalog";

mixin (
  products : Map.Map<Nat, Types.Product>,
  categories : Map.Map<Text, Types.Category>,
) {
  /// Retourne tous les produits du catalogue.
  public query func listProducts() : async [Types.Product] {
    CatalogLib.listProducts(products);
  };

  /// Retourne un produit par son identifiant.
  public query func getProduct(id : Nat) : async ?Types.Product {
    CatalogLib.getProduct(products, id);
  };

  /// Retourne les produits d'une catégorie.
  public query func listProductsByCategory(categoryId : Text) : async [Types.Product] {
    CatalogLib.listProductsByCategory(products, categoryId);
  };

  /// Retourne les produits les plus populaires.
  public query func listPopularProducts(limit : Nat) : async [Types.Product] {
    CatalogLib.listPopularProducts(products, limit);
  };

  /// Retourne les produits en promotion.
  public query func listPromoProducts() : async [Types.Product] {
    CatalogLib.listPromoProducts(products);
  };

  /// Recherche, filtre et trie les produits.
  public query func searchProducts(filter : Types.ProductFilter) : async [Types.Product] {
    CatalogLib.searchProducts(products, filter);
  };

  /// Retourne toutes les catégories.
  public query func listCategories() : async [Types.Category] {
    CatalogLib.listCategories(categories);
  };

  /// Retourne une catégorie par son identifiant.
  public query func getCategory(id : Text) : async ?Types.Category {
    CatalogLib.getCategory(categories, id);
  };
};
