import { Button } from "@/components/common/Button";
import { SectionHeading } from "@/components/common/SectionHeading";
import { CategoryCard } from "@/components/product/CategoryCard";
import { CATEGORY_META } from "@/data/categories";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

export function CategoriesSection() {
  return (
    <section
      data-ocid="home.categories.section"
      className="border-b border-border bg-background py-16 md:py-24"
    >
      <div className="container flex flex-col gap-10">
        <SectionHeading
          eyebrow="Catégories"
          title="Explore par catégorie"
          description="Neuf univers pour composer un espace de jeu qui te ressemble, du clavier au mobilier."
          action={
            <Button
              asChild
              variant="secondary"
              data-ocid="home.categories.link"
            >
              <Link to="/categories">
                Toutes les catégories
                <ArrowRight aria-hidden="true" />
              </Link>
            </Button>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {CATEGORY_META.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
