import Common "common";

module {
  public type ProductId = Common.ProductId;
  public type OrderId = Common.OrderId;
  public type Price = Common.Price;
  public type Timestamp = Common.Timestamp;

  /// Ligne de panier ou de commande.
  public type OrderLine = {
    productId : ProductId;
    name : Text;
    unitPrice : Price;
    quantity : Nat;
    lineTotal : Price;
  };

  /// Coordonnées de livraison saisies pour une commande de démonstration.
  public type ShippingInfo = {
    fullName : Text;
    email : Text;
    phone : Text;
    address : Text;
    city : Text;
    postalCode : Text;
    country : Text;
    notes : ?Text;
  };

  /// Statut d'une commande de démonstration.
  public type OrderStatus = {
    #pending;
    #confirmed;
    #shipped;
    #delivered;
    #cancelled;
  };

  /// Commande de démonstration (aucun paiement réel).
  public type Order = {
    id : OrderId;
    lines : [OrderLine];
    shipping : ShippingInfo;
    subtotal : Price;
    shippingFee : Price;
    total : Price;
    status : OrderStatus;
    createdAt : Timestamp;
  };

  /// Entrée de création d'une commande de démonstration.
  public type CreateOrderInput = {
    lines : [OrderLine];
    shipping : ShippingInfo;
  };

  /// Erreur renvoyée par la création d'une commande.
  public type OrderError = {
    #emptyCart;
    #invalidQuantity;
    #unknownProduct : ProductId;
  };
};
