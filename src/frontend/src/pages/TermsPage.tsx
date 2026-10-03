import { PolicyLayout, PolicySection } from "@/pages/PolicyLayout";

export function TermsPage() {
  return (
    <PolicyLayout
      title="Conditions générales de vente"
      updatedAt="1er octobre 2026"
    >
      <PolicySection title="Objet">
        <p>
          Les présentes conditions régissent les ventes de matériel gaming
          réalisées sur le site Galsen Gaming. Toute commande implique
          l'acceptation sans réserve de ces conditions.
        </p>
      </PolicySection>
      <PolicySection title="Prix et commande">
        <p>
          Les prix sont indiqués en euros, toutes taxes comprises. Galsen Gaming
          se réserve le droit de modifier ses prix à tout moment, les commandes
          validées restant au tarif affiché au moment de l'achat.
        </p>
      </PolicySection>
      <PolicySection title="Paiement">
        <p>
          Le paiement s'effectue en ligne par carte bancaire via une plateforme
          sécurisée. Aucune donnée bancaire n'est stockée sur nos serveurs.
        </p>
      </PolicySection>
      <PolicySection title="Responsabilité">
        <p>
          Galsen Gaming ne saurait être tenue responsable des dommages indirects
          résultant de l'utilisation des produits vendus. La garantie
          constructeur s'applique dans les conditions prévues par chaque
          fabricant.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
