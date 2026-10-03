import AccessControl "mo:caffeineai-authorization/access-control";
import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";

module {
  public type OldActor = {};

  public type NewActor = {
    accessControlState : AccessControl.AccessControlState;
    products : Map.Map<Nat, Product>;
    categories : Map.Map<Text, Category>;
    orders : Map.Map<Nat, Order>;
    nextOrderId : { var value : Nat };
  };

  public type Availability = { #inStock; #lowStock; #outOfStock };

  public type Product = {
    id : Nat;
    name : Text;
    categoryId : Text;
    price : Nat;
    oldPrice : ?Nat;
    discountPercent : Nat;
    rating : Nat;
    reviewCount : Nat;
    availability : Availability;
    description : Text;
    features : [Text];
    images : [Text];
    popularity : Nat;
  };

  public type Category = {
    id : Text;
    name : Text;
    image : Text;
    description : Text;
  };

  public type OrderLine = {
    productId : Nat;
    name : Text;
    unitPrice : Nat;
    quantity : Nat;
    lineTotal : Nat;
  };

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

  public type OrderStatus = { #pending; #confirmed; #shipped; #delivered; #cancelled };

  public type Order = {
    id : Nat;
    lines : [OrderLine];
    shipping : ShippingInfo;
    subtotal : Nat;
    shippingFee : Nat;
    total : Nat;
    status : OrderStatus;
    createdAt : Int;
  };

  func product(
    id : Nat,
    name : Text,
    categoryId : Text,
    price : Nat,
    oldPrice : ?Nat,
    discountPercent : Nat,
    rating : Nat,
    reviewCount : Nat,
    availability : Availability,
    description : Text,
    features : [Text],
    images : [Text],
    popularity : Nat,
  ) : Product {
    {
      id;
      name;
      categoryId;
      price;
      oldPrice;
      discountPercent;
      rating;
      reviewCount;
      availability;
      description;
      features;
      images;
      popularity;
    };
  };

  func category(id : Text, name : Text, image : Text, description : Text) : Category {
    { id; name; image; description };
  };

  public func migration(_ : OldActor) : NewActor {
    let categories = Map.empty<Text, Category>();
    categories.add("ecrans-gaming", category("ecrans-gaming", "Écrans Gaming", "/assets/images/categories/ecrans-gaming.jpg", "Écrans haute fréquence pour une image fluide et immersive."));
    categories.add("claviers-gaming", category("claviers-gaming", "Claviers Gaming", "/assets/images/categories/claviers-gaming.jpg", "Claviers mécaniques réactifs et personnalisables."));
    categories.add("souris-gaming", category("souris-gaming", "Souris Gaming", "/assets/images/categories/souris-gaming.jpg", "Souris précises et légères pour viser juste."));
    categories.add("casques-gaming", category("casques-gaming", "Casques Gaming", "/assets/images/categories/casques-gaming.jpg", "Audio immersif et micro clair pour communiquer."));
    categories.add("chaises-gaming", category("chaises-gaming", "Chaises Gaming", "/assets/images/categories/chaises-gaming.jpg", "Confort et maintien pour de longues sessions."));
    categories.add("tapis-de-souris", category("tapis-de-souris", "Tapis de Souris", "/assets/images/categories/tapis-de-souris.jpg", "Grandes surfaces pour des mouvements fluides."));
    categories.add("boitiers-pc", category("boitiers-pc", "Boîtiers PC", "/assets/images/categories/boitiers-pc.jpg", "Boîtiers ventilés au design soigné."));
    categories.add("eclairage-rgb", category("eclairage-rgb", "Éclairage RGB", "/assets/images/categories/eclairage-rgb.jpg", "Ambiance lumineuse et synchronisation RGB."));
    categories.add("accessoires-gaming", category("accessoires-gaming", "Accessoires Gaming", "/assets/images/categories/accessoires-gaming.jpg", "Supports, câbles et essentiels du setup."));

    let products = Map.empty<Nat, Product>();

    // Écrans Gaming
    products.add(1, product(1, "Écran Gaming 27\" QHD 165 Hz", "ecrans-gaming", 189000, ?229000, 17, 5, 214, #inStock, "Dalle IPS QHD 165 Hz avec temps de réponse 1 ms pour un jeu fluide et net.", ["Dalle IPS QHD 2560x1440", "Taux de rafraîchissement 165 Hz", "Temps de réponse 1 ms", "Compatible FreeSync Premium"], ["/assets/images/products/ecran-27-qhd-165-1.jpg", "/assets/images/products/ecran-27-qhd-165-2.jpg"], 980));
    products.add(2, product(2, "Écran Gaming 24\" Full HD 144 Hz", "ecrans-gaming", 119000, null, 0, 4, 156, #inStock, "Écran 24 pouces Full HD 144 Hz idéal pour le FPS compétitif.", ["Dalle VA Full HD 1920x1080", "144 Hz", "1 ms MPRT", "Pied réglable en hauteur"], ["/assets/images/products/ecran-24-fhd-144-1.jpg", "/assets/images/products/ecran-24-fhd-144-2.jpg"], 870));
    products.add(3, product(3, "Écran UltraWide 34\" 144 Hz", "ecrans-gaming", 329000, ?379000, 13, 5, 98, #lowStock, "Format 21:9 immersif pour le multitâche et les jeux de course.", ["Dalle VA 3440x1440", "144 Hz", "Courbure 1500R", "HDR10"], ["/assets/images/products/ecran-ultrawide-34-1.jpg", "/assets/images/products/ecran-ultrawide-34-2.jpg"], 760));
    products.add(4, product(4, "Écran Gaming 32\" 4K 144 Hz", "ecrans-gaming", 449000, null, 0, 5, 64, #inStock, "4K UHD 144 Hz pour une netteté exceptionnelle sur grand écran.", ["Dalle IPS 4K 3840x2160", "144 Hz", "HDR600", "HDMI 2.1"], ["/assets/images/products/ecran-32-4k-144-1.jpg", "/assets/images/products/ecran-32-4k-144-2.jpg"], 690));

    // Claviers Gaming
    products.add(5, product(5, "Clavier Mécanique RGB TKL", "claviers-gaming", 59000, ?79000, 25, 5, 312, #inStock, "Clavier mécanique compact TKL avec switches rouges et rétroéclairage RGB.", ["Format TKL 87 touches", "Switches mécaniques rouges", "Rétroéclairage RGB par touche", "Châssis aluminium"], ["/assets/images/products/clavier-tkl-rgb-1.jpg", "/assets/images/products/clavier-tkl-rgb-2.jpg"], 990));
    products.add(6, product(6, "Clavier Mécanique 60% Hot-Swap", "claviers-gaming", 49000, null, 0, 4, 187, #inStock, "Format 60% ultra-compact avec switches interchangeables à chaud.", ["Format 60%", "Hot-swap 3/5 broches", "Bluetooth + USB-C", "Keycaps PBT"], ["/assets/images/products/clavier-60-hotswap-1.jpg", "/assets/images/products/clavier-60-hotswap-2.jpg"], 880));
    products.add(7, product(7, "Clavier Mécanique Full-Size RGB", "claviers-gaming", 69000, ?89000, 22, 5, 143, #lowStock, "Clavier complet avec pavé numérique et repose-poignets magnétique.", ["Format complet 104 touches", "Switches marrons tactiles", "Repose-poignets inclus", "Molette multimédia"], ["/assets/images/products/clavier-fullsize-rgb-1.jpg", "/assets/images/products/clavier-fullsize-rgb-2.jpg"], 720));
    products.add(8, product(8, "Clavier Optique Gaming Pro", "claviers-gaming", 89000, null, 0, 5, 76, #inStock, "Switches optiques à déclenchement ultra-rapide pour l'esport.", ["Switches optiques 0,2 ms", "Anti-ghosting total", "RGB 16,8 M couleurs", "Câble tressé détachable"], ["/assets/images/products/clavier-optique-pro-1.jpg", "/assets/images/products/clavier-optique-pro-2.jpg"], 640));

    // Souris Gaming
    products.add(9, product(9, "Souris Gaming 26000 DPI Sans Fil", "souris-gaming", 45000, ?59000, 24, 5, 421, #inStock, "Souris sans fil légère avec capteur 26 000 DPI et 70 h d'autonomie.", ["Capteur 26 000 DPI", "Sans fil 2,4 GHz + Bluetooth", "Poids 62 g", "Autonomie 70 h"], ["/assets/images/products/souris-26000dpi-1.jpg", "/assets/images/products/souris-26000dpi-2.jpg"], 995));
    products.add(10, product(10, "Souris FPS Ultra-Légère 58 g", "souris-gaming", 39000, null, 0, 5, 268, #inStock, "Coque perforée ultra-légère pour des mouvements rapides et précis.", ["Poids 58 g", "Capteur 19 000 DPI", "Switches optiques 80 M clics", "Câble paracord"], ["/assets/images/products/souris-fps-58g-1.jpg", "/assets/images/products/souris-fps-58g-2.jpg"], 910));
    products.add(11, product(11, "Souris MMO 16 Boutons", "souris-gaming", 52000, ?65000, 20, 4, 132, #inStock, "Grille de 16 boutons programmables pour les jeux MMO.", ["16 boutons programmables", "Capteur 18 000 DPI", "RGB personnalisable", "Mémoire embarquée"], ["/assets/images/products/souris-mmo-16b-1.jpg", "/assets/images/products/souris-mmo-16b-2.jpg"], 700));
    products.add(12, product(12, "Souris Ergonomique Verticale RGB", "souris-gaming", 34000, null, 0, 4, 89, #lowStock, "Forme verticale pour réduire la tension du poignet.", ["Design vertical 57°", "Capteur 12 000 DPI", "Sans fil 2,4 GHz", "RGB 3 zones"], ["/assets/images/products/souris-verticale-rgb-1.jpg", "/assets/images/products/souris-verticale-rgb-2.jpg"], 560));

    // Casques Gaming
    products.add(13, product(13, "Casque Gaming 7.1 Surround", "casques-gaming", 79000, ?99000, 20, 5, 356, #inStock, "Audio surround 7.1 virtuel avec micro détachable antibruit.", ["Surround 7.1 virtuel", "Haut-parleurs 50 mm", "Micro détachable antibruit", "Coussinets mémoire de forme"], ["/assets/images/products/casque-71-surround-1.jpg", "/assets/images/products/casque-71-surround-2.jpg"], 970));
    products.add(14, product(14, "Casque Sans Fil Low-Latency", "casques-gaming", 99000, null, 0, 5, 201, #inStock, "Connexion sans fil à faible latence et 40 h d'autonomie.", ["Sans fil 2,4 GHz", "Autonomie 40 h", "Drivers 40 mm", "Compatible multiplateforme"], ["/assets/images/products/casque-sansfil-lowlatency-1.jpg", "/assets/images/products/casque-sansfil-lowlatency-2.jpg"], 860));
    products.add(15, product(15, "Casque USB Studio Gaming", "casques-gaming", 59000, ?69000, 14, 4, 118, #lowStock, "Casque filaire USB avec son stéréo précis et micro clair.", ["Connexion USB", "Drivers 53 mm", "Micro cardioïde", "Contrôle du volume intégré"], ["/assets/images/products/casque-usb-studio-1.jpg", "/assets/images/products/casque-usb-studio-2.jpg"], 680));
    products.add(16, product(16, "Casque RGB Bluetooth + Dongle", "casques-gaming", 69000, null, 0, 4, 97, #inStock, "Double connexion Bluetooth et dongle USB pour tous vos appareils.", ["Bluetooth 5.2 + dongle", "Autonomie 35 h", "Éclairage RGB", "Micro à réduction de bruit"], ["/assets/images/products/casque-rgb-bt-1.jpg", "/assets/images/products/casque-rgb-bt-2.jpg"], 610));

    // Chaises Gaming
    products.add(17, product(17, "Chaise Gaming Ergonomique Pro", "chaises-gaming", 189000, ?239000, 21, 5, 176, #inStock, "Chaise ergonomique inclinable avec soutien lombaire réglable.", ["Inclinaison 180°", "Soutien lombaire réglable", "Accoudoirs 4D", "Mousse haute densité"], ["/assets/images/products/chaise-ergo-pro-1.jpg", "/assets/images/products/chaise-ergo-pro-2.jpg"], 900));
    products.add(18, product(18, "Chaise Gaming Racing", "chaises-gaming", 139000, null, 0, 4, 143, #inStock, "Style racing avec coussins lombaires et cervicaux inclus.", ["Dossier racing", "Coussins inclus", "Base nylon renforcée", "Roulettes silencieuses"], ["/assets/images/products/chaise-racing-1.jpg", "/assets/images/products/chaise-racing-2.jpg"], 820));
    products.add(19, product(19, "Fauteuil Gaming Tissu Premium", "chaises-gaming", 219000, ?269000, 19, 5, 88, #lowStock, "Revêtement tissu respirant et structure en acier pour un confort durable.", ["Tissu respirant", "Structure acier", "Accoudoirs 3D", "Support jusqu'à 150 kg"], ["/assets/images/products/fauteuil-tissu-1.jpg", "/assets/images/products/fauteuil-tissu-2.jpg"], 740));
    products.add(20, product(20, "Chaise Gaming Compacte", "chaises-gaming", 99000, null, 0, 4, 112, #inStock, "Format compact idéal pour les petits espaces et les setups minimalistes.", ["Format compact", "Dossier inclinable 135°", "Assise rembourrée", "Montage rapide"], ["/assets/images/products/chaise-compacte-1.jpg", "/assets/images/products/chaise-compacte-2.jpg"], 660));

    // Tapis de Souris
    products.add(21, product(21, "Tapis de Souris XXL RGB", "tapis-de-souris", 19000, ?25000, 24, 5, 289, #inStock, "Grand tapis XXL avec bordure lumineuse RGB et surface micro-tissée.", ["Format 900x400 mm", "Bordure RGB", "Surface micro-tissée", "Base antidérapante"], ["/assets/images/products/tapis-xxl-rgb-1.jpg", "/assets/images/products/tapis-xxl-rgb-2.jpg"], 930));
    products.add(22, product(22, "Tapis de Souris Speed XL", "tapis-de-souris", 12000, null, 0, 4, 164, #inStock, "Surface speed pour des mouvements rapides et constants.", ["Format 800x300 mm", "Surface speed", "Bords cousus", "Épaisseur 3 mm"], ["/assets/images/products/tapis-speed-xl-1.jpg", "/assets/images/products/tapis-speed-xl-2.jpg"], 780));
    products.add(23, product(23, "Tapis de Souris Control L", "tapis-de-souris", 9000, ?12000, 25, 4, 121, #inStock, "Surface control offrant précision et freinage maîtrisé.", ["Format 450x400 mm", "Surface control", "Base caoutchouc", "Lavable"], ["/assets/images/products/tapis-control-l-1.jpg", "/assets/images/products/tapis-control-l-2.jpg"], 700));
    products.add(24, product(24, "Tapis de Souris Rigide Alu", "tapis-de-souris", 24000, null, 0, 5, 73, #lowStock, "Surface rigide en aluminium pour une glisse ultra-régulière.", ["Surface aluminium", "Finition brossée", "Base antidérapante", "Format 350x250 mm"], ["/assets/images/products/tapis-rigide-alu-1.jpg", "/assets/images/products/tapis-rigide-alu-2.jpg"], 590));

    // Boîtiers PC
    products.add(25, product(25, "Boîtier PC Moyen Tour Verre Trempé", "boitiers-pc", 89000, ?109000, 18, 5, 154, #inStock, "Boîtier moyen tour avec panneau en verre trempé et flux d'air optimisé.", ["Moyen tour ATX", "Verre trempé", "3 ventilateurs ARGB inclus", "Support radiateur 360 mm"], ["/assets/images/products/boitier-moyen-verre-1.jpg", "/assets/images/products/boitier-moyen-verre-2.jpg"], 850));
    products.add(26, product(26, "Boîtier PC Mini-ITX Compact", "boitiers-pc", 79000, null, 0, 4, 96, #inStock, "Format mini-ITX compact pour les setups discrets et puissants.", ["Mini-ITX", "Grille d'aération mesh", "Support GPU 330 mm", "USB-C en façade"], ["/assets/images/products/boitier-mini-itx-1.jpg", "/assets/images/products/boitier-mini-itx-2.jpg"], 720));
    products.add(27, product(27, "Boîtier PC Full Tower RGB", "boitiers-pc", 149000, ?179000, 17, 5, 67, #lowStock, "Full tower spacieux avec éclairage RGB et gestion des câbles avancée.", ["Full tower E-ATX", "4 ventilateurs RGB", "Panneau verre trempé", "Gestion des câbles"], ["/assets/images/products/boitier-full-tower-1.jpg", "/assets/images/products/boitier-full-tower-2.jpg"], 640));
    products.add(28, product(28, "Boîtier PC Mesh Airflow", "boitiers-pc", 69000, null, 0, 4, 108, #inStock, "Façade mesh pour un flux d'air maximal et des températures maîtrisées.", ["Façade mesh", "2 ventilateurs 140 mm", "Filtres anti-poussière", "Support ATX/mATX"], ["/assets/images/products/boitier-mesh-airflow-1.jpg", "/assets/images/products/boitier-mesh-airflow-2.jpg"], 690));

    // Éclairage RGB
    products.add(29, product(29, "Bande LED RGB Adressable 2 m", "eclairage-rgb", 15000, ?19000, 21, 4, 233, #inStock, "Bande LED adressable synchronisable avec la carte mère.", ["2 mètres extensible", "LED adressables", "Adhésif renforcé", "Compatible ARGB 5V"], ["/assets/images/products/bande-led-rgb-1.jpg", "/assets/images/products/bande-led-rgb-2.jpg"], 880));
    products.add(30, product(30, "Kit Ventilateurs ARGB 3x120 mm", "eclairage-rgb", 39000, null, 0, 5, 187, #inStock, "Kit de trois ventilateurs ARGB avec contrôleur et télécommande.", ["3 ventilateurs 120 mm", "Contrôleur ARGB", "Télécommande incluse", "PWM silencieux"], ["/assets/images/products/kit-ventilos-argb-1.jpg", "/assets/images/products/kit-ventilos-argb-2.jpg"], 840));
    products.add(31, product(31, "Barre Lumineuse RGB Écran", "eclairage-rgb", 22000, ?28000, 21, 4, 142, #inStock, "Barre lumineuse à fixer sur l'écran pour réduire la fatigue oculaire.", ["Fixation sur écran", "Température réglable", "RGB synchronisable", "Alimentation USB"], ["/assets/images/products/barre-lumineuse-rgb-1.jpg", "/assets/images/products/barre-lumineuse-rgb-2.jpg"], 730));
    products.add(32, product(32, "Support Casque RGB", "eclairage-rgb", 18000, null, 0, 4, 91, #lowStock, "Support casque avec éclairage RGB et base lestée antidérapante.", ["Éclairage RGB", "Base lestée", "Crochet renforcé", "Alimentation USB"], ["/assets/images/products/support-casque-rgb-1.jpg", "/assets/images/products/support-casque-rgb-2.jpg"], 600));

    // Accessoires Gaming
    products.add(33, product(33, "Manette Sans Fil Pro", "accessoires-gaming", 42000, ?52000, 19, 5, 264, #inStock, "Manette sans fil avec gâchettes à effet Hall et batterie longue durée.", ["Gâchettes effet Hall", "Sans fil + USB-C", "Autonomie 25 h", "Compatible PC/mobile"], ["/assets/images/products/manette-sansfil-pro-1.jpg", "/assets/images/products/manette-sansfil-pro-2.jpg"], 890));
    products.add(34, product(34, "Hub USB-C 7-en-1 Gaming", "accessoires-gaming", 29000, null, 0, 4, 128, #inStock, "Hub USB-C avec HDMI 4K, ports USB 3.0 et lecteur de cartes.", ["HDMI 4K 60 Hz", "3x USB 3.0", "Lecteur SD/microSD", "Charge 100 W"], ["/assets/images/products/hub-usbc-7en1-1.jpg", "/assets/images/products/hub-usbc-7en1-2.jpg"], 760));
    products.add(35, product(35, "Support Écran Bras Articulé", "accessoires-gaming", 35000, ?45000, 22, 5, 156, #inStock, "Bras articulé robuste pour libérer de l'espace sur le bureau.", ["Compatible 17-32 pouces", "Charge jusqu'à 9 kg", "Rotation et inclinaison", "Pince bureau incluse"], ["/assets/images/products/support-ecran-bras-1.jpg", "/assets/images/products/support-ecran-bras-2.jpg"], 810));
    products.add(36, product(36, "Tapis de Bureau Gaming XL", "accessoires-gaming", 21000, null, 0, 4, 104, #inStock, "Tapis de bureau XL protégeant clavier et souris avec style.", ["Format 900x400 mm", "Surface lisse", "Bords cousus", "Base antidérapante"], ["/assets/images/products/tapis-bureau-xl-1.jpg", "/assets/images/products/tapis-bureau-xl-2.jpg"], 670));

    {
      accessControlState = AccessControl.initState();
      products;
      categories;
      orders = Map.empty();
      nextOrderId = { var value = 1 };
    };
  };
};
