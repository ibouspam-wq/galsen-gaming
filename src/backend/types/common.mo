module {
  /// Identifiant numérique d'un produit.
  public type ProductId = Nat;

  /// Identifiant textuel d'une catégorie (slug stable, ex. "claviers-gaming").
  public type CategoryId = Text;

  /// Identifiant numérique d'une commande de démonstration.
  public type OrderId = Nat;

  /// Prix exprimé en unités entières de la devise de démonstration (FCFA).
  public type Price = Nat;

  /// Horodatage en nanosecondes (Time.now()).
  public type Timestamp = Int;
};
