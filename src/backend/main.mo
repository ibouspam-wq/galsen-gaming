import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import Expose "mo:caffeineai-oql/Expose";
import Entity "mo:caffeineai-oql/Entity";
import MapEntity "mo:caffeineai-oql/MapEntity";
import Types "mo:caffeineai-oql/Types";
import CatalogTypes "types/catalog";
import OrderTypes "types/orders";
import CatalogApi "mixins/catalog-api";
import OrdersApi "mixins/orders-api";
import ApiDocMixin "mixins/api-doc";

actor {
  let accessControlState : AccessControl.AccessControlState;
  let products : Map.Map<Nat, CatalogTypes.Product>;
  let categories : Map.Map<Text, CatalogTypes.Category>;
  let orders : Map.Map<Nat, OrderTypes.Order>;
  let nextOrderId : { var value : Nat };

  include MixinAuthorization(accessControlState, null);
  include CatalogApi(products, categories);
  include OrdersApi(orders, nextOrderId);
  include ApiDocMixin();

  // OQL value encoders for fields the compiler cannot auto-derive
  // (variants, optionals, arrays, nested records).
  func availabilityValue(a : CatalogTypes.Availability) : Types.Value = switch a {
    case (#inStock) #text "inStock";
    case (#lowStock) #text "lowStock";
    case (#outOfStock) #text "outOfStock";
  };
  func optionalNatValue(p : ?Nat) : Types.Value = switch p {
    case (?n) #nat n;
    case null #null_;
  };
  func textArrayValue(xs : [Text]) : Types.Value = #text (xs.values().join(", "));
  func orderStatusValue(s : OrderTypes.OrderStatus) : Types.Value = switch s {
    case (#pending) #text "pending";
    case (#confirmed) #text "confirmed";
    case (#shipped) #text "shipped";
    case (#delivered) #text "delivered";
    case (#cancelled) #text "cancelled";
  };
  func orderLinesValue(lines : [OrderTypes.OrderLine]) : Types.Value =
    #text (lines.size().toText() # " article(s)");
  func shippingValue(s : OrderTypes.ShippingInfo) : Types.Value =
    #text (s.fullName # ", " # s.city # ", " # s.country);
  // Identity `_toRow` instance for fields whose extractor already yields a
  // `Types.Value` (the compiler derives no `Value -> Value` instance).
  func valueToRow(v : Types.Value) : Types.Value = v;

  include Expose({
    entities = [
      products.toEntityManual("product", "Product", "id")
        .payload("id", func (p : CatalogTypes.Product) : Types.Value = #nat (p.id), valueToRow)
        .payload("name", func (p : CatalogTypes.Product) : Types.Value = #text (p.name), valueToRow)
        .payload("categoryId", func (p : CatalogTypes.Product) : Types.Value = #text (p.categoryId), valueToRow)
        .payload("price", func (p : CatalogTypes.Product) : Types.Value = #nat (p.price), valueToRow)
        .payload("oldPrice", func (p : CatalogTypes.Product) : Types.Value = optionalNatValue(p.oldPrice), valueToRow)
        .payload("discountPercent", func (p : CatalogTypes.Product) : Types.Value = #nat (p.discountPercent), valueToRow)
        .payload("rating", func (p : CatalogTypes.Product) : Types.Value = #nat (p.rating), valueToRow)
        .payload("reviewCount", func (p : CatalogTypes.Product) : Types.Value = #nat (p.reviewCount), valueToRow)
        .payload("availability", func (p : CatalogTypes.Product) : Types.Value = availabilityValue(p.availability), valueToRow)
        .payload("description", func (p : CatalogTypes.Product) : Types.Value = #text (p.description), valueToRow)
        .payload("features", func (p : CatalogTypes.Product) : Types.Value = textArrayValue(p.features), valueToRow)
        .payload("images", func (p : CatalogTypes.Product) : Types.Value = textArrayValue(p.images), valueToRow)
        .payload("popularity", func (p : CatalogTypes.Product) : Types.Value = #nat (p.popularity), valueToRow)
        .sample({
          id = 0;
          name = "";
          categoryId = "";
          price = 0;
          oldPrice = null;
          discountPercent = 0;
          rating = 0;
          reviewCount = 0;
          availability = #inStock;
          description = "";
          features = [];
          images = [];
          popularity = 0;
        })
        .public_()
        .build(),
      categories.toEntityManual("category", "Category", "id")
        .payload("id", func (c : CatalogTypes.Category) : Types.Value = #text (c.id), valueToRow)
        .payload("name", func (c : CatalogTypes.Category) : Types.Value = #text (c.name), valueToRow)
        .payload("image", func (c : CatalogTypes.Category) : Types.Value = #text (c.image), valueToRow)
        .payload("description", func (c : CatalogTypes.Category) : Types.Value = #text (c.description), valueToRow)
        .sample({ id = ""; name = ""; image = ""; description = "" })
        .public_()
        .build(),
      orders.toEntityManual("order", "Order", "id")
        .payload("id", func (o : OrderTypes.Order) : Types.Value = #nat (o.id), valueToRow)
        .payload("lines", func (o : OrderTypes.Order) : Types.Value = orderLinesValue(o.lines), valueToRow)
        .payload("shipping", func (o : OrderTypes.Order) : Types.Value = shippingValue(o.shipping), valueToRow)
        .payload("subtotal", func (o : OrderTypes.Order) : Types.Value = #nat (o.subtotal), valueToRow)
        .payload("shippingFee", func (o : OrderTypes.Order) : Types.Value = #nat (o.shippingFee), valueToRow)
        .payload("total", func (o : OrderTypes.Order) : Types.Value = #nat (o.total), valueToRow)
        .payload("status", func (o : OrderTypes.Order) : Types.Value = orderStatusValue(o.status), valueToRow)
        .payload("createdAt", func (o : OrderTypes.Order) : Types.Value = #int (o.createdAt), valueToRow)
        .sample({
          id = 0;
          lines = [];
          shipping = {
            fullName = "";
            email = "";
            phone = "";
            address = "";
            city = "";
            postalCode = "";
            country = "";
            notes = null;
          };
          subtotal = 0;
          shippingFee = 0;
          total = 0;
          status = #pending;
          createdAt = 0;
        })
        .controllerOnly()
        .build(),
    ];
  });
};
