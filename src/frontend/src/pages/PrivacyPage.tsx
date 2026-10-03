import { PolicyLayout, PolicySection } from "@/pages/PolicyLayout";

export function PrivacyPage() {
  return (
    <PolicyLayout
      title="Politique de confidentialité"
      updatedAt="1er octobre 2026"
    >
      <PolicySection title="Données collectées">
        <p>
          Galsen Gaming collecte uniquement les informations nécessaires au
          traitement de vos commandes : nom, adresse de livraison, adresse
          e-mail et numéro de téléphone.
        </p>
      </PolicySection>
      <PolicySection title="Utilisation des données">
        <p>
          Vos données servent exclusivement à préparer et livrer vos commandes,
          à vous informer du suivi et à répondre à vos demandes. Elles ne sont
          jamais revendues à des tiers.
        </p>
      </PolicySection>
      <PolicySection title="Conservation et droits">
        <p>
          Les données de commande sont conservées le temps légal requis. Vous
          pouvez demander l'accès, la rectification ou la suppression de vos
          informations en écrivant à contact@galsengaming.fr.
        </p>
      </PolicySection>
      <PolicySection title="Cookies">
        <p>
          Le site utilise uniquement des cookies techniques nécessaires au
          fonctionnement du panier et à la mémorisation de vos préférences.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
