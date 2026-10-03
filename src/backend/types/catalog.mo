import Common "common";

module {
  public type ProductId = Common.ProductId;
  public type CategoryId = Common.CategoryId;
  public type Price = Common.Price;

  /// Disponibilité d'un produit dans la boutique.
  public type Availability = {
    #inStock;
    #lowStock;
    #outOfStock;
  };

  /// Catégorie de la boutique (Écrans Gaming, Claviers Gaming, ...).
  public type Category = {
    id : CategoryId;
    name : Text;
    image : Text;
    description : Text;
  };

  /// Produit du catalogue.
  public type Product = {
    id : ProductId;
    name : Text;
    categoryId : CategoryId;
    price : Price;
    oldPrice : ?Price;
    discountPercent : Nat;
    rating : Nat;
    reviewCount : Nat;
    availability : Availability;
    description : Text;
    features : [Text];
    images : [Text];
    popularity : Nat;
  };

  /// Critère de tri du catalogue.
  public type SortOrder = {
    #priceAsc;
    #priceDesc;
    #popularity;
    #rating;
  };

  /// Filtres de recherche du catalogue.
  public type ProductFilter = {
    categoryId : ?CategoryId;
    search : ?Text;
    sort : ?SortOrder;
  };
};
