import { SectionHeading } from "@/components/common/SectionHeading";
import { CategoryCard } from "@/components/product/CategoryCard";
import { CATEGORY_META } from "@/data/categories";

export function CategoriesPage() {
  return (
    <div
      data-ocid="categories.page"
      className="container flex flex-col gap-10 py-10 md:py-14"
    >
      <SectionHeading
        eyebrow="Catalogue"
        title="Toutes les catégories"
        description="Neuf univers pour composer un espace de jeu qui vous ressemble, du clavier au mobilier. Choisissez une catégorie pour découvrir les produits disponibles."
      />

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {CATEGORY_META.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={index} />
        ))}
      </div>
    </div>
  );
}
