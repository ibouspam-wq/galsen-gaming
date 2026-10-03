import { SectionHeading } from "@/components/common/SectionHeading";
import { Cpu } from "lucide-react";

interface ProductSpecsProps {
  features: string[];
}

export function ProductSpecs({ features }: ProductSpecsProps) {
  if (features.length === 0) return null;

  return (
    <section data-ocid="product.specs.section" className="flex flex-col gap-6">
      <SectionHeading
        eyebrow="Caractéristiques"
        title="Fiche technique"
        description="Les points clés qui font la différence sur ce produit."
      />
      <ul className="grid gap-3 sm:grid-cols-2">
        {features.map((feature, index) => (
          <li
            key={feature}
            data-ocid={`product.specs.item.${index + 1}`}
            className="flex items-start gap-3 rounded-xl border border-border bg-card p-4 transition-fast hover:border-primary/40"
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Cpu className="size-4" aria-hidden="true" />
            </span>
            <span className="text-sm leading-relaxed text-foreground">
              {feature}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
