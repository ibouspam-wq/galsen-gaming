import { CategoriesSection } from "@/components/home/CategoriesSection";
import { FaqSection } from "@/components/home/FaqSection";
import { HeroSection } from "@/components/home/HeroSection";
import { PopularProductsSection } from "@/components/home/PopularProductsSection";
import { PromoSection } from "@/components/home/PromoSection";
import { ReviewsSection } from "@/components/home/ReviewsSection";
import { WhyUsSection } from "@/components/home/WhyUsSection";

export function HomePage() {
  return (
    <div data-ocid="home.page" className="flex flex-col">
      <HeroSection />
      <CategoriesSection />
      <PopularProductsSection />
      <PromoSection />
      <WhyUsSection />
      <ReviewsSection />
      <FaqSection />
    </div>
  );
}
