import Map "mo:core/Map";
import Result "mo:core/Result";
import Types "../types/orders";
import OrdersLib "../lib/orders";

mixin (
  orders : Map.Map<Nat, Types.Order>,
  nextOrderId : { var value : Nat },
) {
  /// Crée une commande de démonstration (aucun paiement réel).
  public shared func createOrder(input : Types.CreateOrderInput) : async Result.Result<Types.Order, Types.OrderError> {
    OrdersLib.createOrder(orders, nextOrderId, input);
  };

  /// Retourne une commande de démonstration par son identifiant.
  public query func getOrder(id : Nat) : async ?Types.Order {
    OrdersLib.getOrder(orders, id);
  };
};
