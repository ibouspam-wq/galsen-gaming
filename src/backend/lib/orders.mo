import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Result "mo:core/Result";
import Time "mo:core/Time";
import Types "../types/orders";

module {
  /// Frais de livraison de la démonstration (centimes d'euro).
  let shippingFee : Nat = 590;

  /// Seuil de sous-total à partir duquel la livraison est offerte (centimes d'euro).
  let freeShippingThreshold : Nat = 9900;

  /// Frais de livraison applicables pour un sous-total donné (centimes d'euro).
  public func shippingFeeFor(subtotal : Nat) : Nat {
    if (subtotal >= freeShippingThreshold) { 0 } else { shippingFee };
  };

  /// Calcule le sous-total d'une liste de lignes de commande.
  public func computeSubtotal(lines : [Types.OrderLine]) : Nat {
    lines.foldLeft(0, func (acc, line) = acc + line.lineTotal);
  };

  /// Crée une commande de démonstration à partir des lignes et des coordonnées.
  public func createOrder(
    orders : Map.Map<Nat, Types.Order>,
    nextOrderId : { var value : Nat },
    input : Types.CreateOrderInput,
  ) : Result.Result<Types.Order, Types.OrderError> {
    if (input.lines.size() == 0) {
      return #err(#emptyCart);
    };

    for (line in input.lines.values()) {
      if (line.quantity == 0) {
        return #err(#invalidQuantity);
      };
    };

    let subtotal = computeSubtotal(input.lines);
    let fee = shippingFeeFor(subtotal);
    let total = subtotal + fee;
    let id = nextOrderId.value;
    nextOrderId.value := id + 1;

    let order : Types.Order = {
      id;
      lines = input.lines;
      shipping = input.shipping;
      subtotal;
      shippingFee = fee;
      total;
      status = #pending;
      createdAt = Time.now();
    };

    orders.add(id, order);
    #ok(order);
  };

  /// Retourne une commande par son identifiant.
  public func getOrder(orders : Map.Map<Nat, Types.Order>, id : Nat) : ?Types.Order {
    orders.get(id);
  };
};
