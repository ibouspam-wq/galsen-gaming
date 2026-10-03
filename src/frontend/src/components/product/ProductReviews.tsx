import { SectionHeading } from "@/components/common/SectionHeading";
import { REVIEWS } from "@/data/reviews";
import { formatCount, formatRating } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

interface ProductReviewsProps {
  rating: bigint;
  reviewCount: bigint;
}

function Stars({ rating }: { rating: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5"
      aria-label={`Note de ${rating} sur 5`}
    >
      {[1, 2, 3, 4, 5].map((value) => (
        <Star
          key={value}
          className={cn(
            "size-4",
            value <= rating
              ? "fill-warning text-warning"
              : "text-muted-foreground/40",
          )}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

export function ProductReviews({ rating, reviewCount }: ProductReviewsProps) {
  const average = Number(rating) / 10;

  return (
    <section
      data-ocid="product.reviews.section"
      className="flex flex-col gap-6"
    >
      <SectionHeading
        eyebrow="Avis clients"
        title="Ce qu'en disent les joueurs"
        description="Des retours vérifiés de la communauté Galsen Gaming."
      />

      <div className="flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:gap-10">
        <div className="flex flex-col items-center gap-2 sm:items-start">
          <span className="font-display text-5xl font-bold text-foreground">
            {formatRating(rating)}
          </span>
          <Stars rating={Math.round(average)} />
          <span className="text-sm text-muted-foreground">
            {formatCount(reviewCount)} avis
          </span>
        </div>
        <div
          className="h-px w-full bg-border sm:h-20 sm:w-px"
          aria-hidden="true"
        />
        <p className="text-sm leading-relaxed text-muted-foreground">
          Les avis sont collectés après chaque commande livrée. Nous vérifions
          chaque retour pour garantir des évaluations authentiques.
        </p>
      </div>

      <ul className="flex flex-col gap-4">
        {REVIEWS.map((review, index) => (
          <li
            key={review.id}
            data-ocid={`product.reviews.item.${index + 1}`}
            className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="flex size-9 items-center justify-center rounded-full bg-gradient-primary font-display text-sm font-semibold text-primary-foreground">
                  {review.author.charAt(0)}
                </span>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-foreground">
                    {review.author}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {review.date}
                  </span>
                </div>
              </div>
              <Stars rating={review.rating} />
            </div>
            <h3 className="font-display text-base font-semibold text-foreground">
              {review.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {review.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
