import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Types "../types/catalog";

module {
  /// Retourne tous les produits du catalogue.
  public func listProducts(products : Map.Map<Nat, Types.Product>) : [Types.Product] {
    products.values().toArray();
  };

  /// Retourne un produit par son identifiant.
  public func getProduct(products : Map.Map<Nat, Types.Product>, id : Nat) : ?Types.Product {
    products.get(id);
  };

  /// Retourne les produits d'une catégorie donnée.
  public func listProductsByCategory(products : Map.Map<Nat, Types.Product>, categoryId : Text) : [Types.Product] {
    products.values().filter(func (p) = p.categoryId == categoryId).toArray();
  };

  /// Retourne les produits les plus populaires.
  public func listPopularProducts(products : Map.Map<Nat, Types.Product>, limit : Nat) : [Types.Product] {
    let sorted = products.values().toArray().sort(func (a, b) = Nat.compare(b.popularity, a.popularity));
    if (sorted.size() <= limit) { sorted } else { sorted.sliceToArray(0, limit.toInt()) };
  };

  /// Retourne les produits actuellement en promotion.
  public func listPromoProducts(products : Map.Map<Nat, Types.Product>) : [Types.Product] {
    products.values().filter(func (p) = p.discountPercent > 0).toArray();
  };

  /// Recherche et filtre les produits, puis applique le tri demandé.
  public func searchProducts(products : Map.Map<Nat, Types.Product>, filter : Types.ProductFilter) : [Types.Product] {
    var result = products.values().toArray();

    switch (filter.categoryId) {
      case (?categoryId) {
        result := result.filter(func (p) = p.categoryId == categoryId);
      };
      case null {};
    };

    switch (filter.search) {
      case (?term) {
        let needle = term.toLower();
        if (needle.size() > 0) {
          result := result.filter(func (p) = p.name.toLower().contains(#text needle));
        };
      };
      case null {};
    };

    let sort = filter.sort ?? #popularity;
    switch (sort) {
      case (#priceAsc) {
        result := result.sort(func (a, b) = Nat.compare(a.price, b.price));
      };
      case (#priceDesc) {
        result := result.sort(func (a, b) = Nat.compare(b.price, a.price));
      };
      case (#popularity) {
        result := result.sort(func (a, b) = Nat.compare(b.popularity, a.popularity));
      };
      case (#rating) {
        result := result.sort(func (a, b) = Nat.compare(b.rating, a.rating));
      };
    };
    result;
  };

  /// Retourne toutes les catégories de la boutique.
  public func listCategories(categories : Map.Map<Text, Types.Category>) : [Types.Category] {
    categories.values().toArray();
  };

  /// Retourne une catégorie par son identifiant.
  public func getCategory(categories : Map.Map<Text, Types.Category>, id : Text) : ?Types.Category {
    categories.get(id);
  };
};
