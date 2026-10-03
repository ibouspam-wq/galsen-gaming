import { PolicyLayout, PolicySection } from "@/pages/PolicyLayout";

export function ShippingPolicyPage() {
  return (
    <PolicyLayout title="Politique de livraison" updatedAt="1er octobre 2026">
      <PolicySection title="Zones et délais">
        <p>
          Nous livrons en France métropolitaine et en Europe. Les commandes sont
          préparées sous 24 à 48 heures ouvrées, puis livrées en 2 à 4 jours
          ouvrés en France.
        </p>
      </PolicySection>
      <PolicySection title="Frais de port">
        <p>
          La livraison est offerte dès 99 € d'achat. En dessous de ce montant,
          des frais de port forfaitaires de 5,90 € sont appliqués.
        </p>
      </PolicySection>
      <PolicySection title="Suivi de commande">
        <p>
          Un e-mail de confirmation contenant votre numéro de suivi vous est
          envoyé dès l'expédition de votre colis.
        </p>
      </PolicySection>
      <PolicySection title="Colis endommagé">
        <p>
          En cas de colis endommagé, contactez-nous dans les 48 heures suivant
          la réception avec des photos du produit et de l'emballage.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
