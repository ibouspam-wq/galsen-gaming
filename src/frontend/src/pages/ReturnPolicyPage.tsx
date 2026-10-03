import { PolicyLayout, PolicySection } from "@/pages/PolicyLayout";

export function ReturnPolicyPage() {
  return (
    <PolicyLayout title="Politique de retour" updatedAt="1er octobre 2026">
      <PolicySection title="Délai de rétractation">
        <p>
          Vous disposez de 30 jours à compter de la réception pour retourner un
          article qui ne vous convient pas, sans avoir à justifier votre
          décision.
        </p>
      </PolicySection>
      <PolicySection title="Conditions d'acceptation">
        <p>
          Le produit doit être retourné dans son emballage d'origine, complet et
          non utilisé. Les articles endommagés ou incomplets peuvent faire
          l'objet d'un remboursement partiel.
        </p>
      </PolicySection>
      <PolicySection title="Procédure">
        <p>
          Contactez notre service client à contact@galsengaming.fr pour obtenir
          une étiquette de retour. Les frais de retour sont à votre charge, sauf
          en cas d'erreur de notre part.
        </p>
      </PolicySection>
      <PolicySection title="Remboursement">
        <p>
          Le remboursement est effectué sous 14 jours après réception et
          vérification du produit retourné, sur le moyen de paiement d'origine.
        </p>
      </PolicySection>
    </PolicyLayout>
  );
}
