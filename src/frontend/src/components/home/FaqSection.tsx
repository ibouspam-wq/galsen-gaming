import { SectionHeading } from "@/components/common/SectionHeading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ_ITEMS } from "@/data/faq";

export function FaqSection() {
  return (
    <section
      data-ocid="home.faq.section"
      className="bg-muted/30 py-16 md:py-24"
    >
      <div className="container flex flex-col gap-10">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Tout ce qu'il faut savoir"
          description="Livraison, paiement, retours et suivi de commande : les réponses aux questions les plus courantes."
          align="center"
        />

        <div className="mx-auto w-full max-w-3xl rounded-2xl border border-border bg-card px-6">
          <Accordion type="single" collapsible className="w-full">
            {FAQ_ITEMS.map((item, index) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                data-ocid={`home.faq.item.${index + 1}`}
              >
                <AccordionTrigger className="font-display text-base font-semibold text-foreground hover:text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
