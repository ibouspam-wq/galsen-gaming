import { SectionHeading } from "@/components/common/SectionHeading";
import { REVIEWS } from "@/data/reviews";
import { Star } from "lucide-react";

const MAX_RATING = 5;

export function ReviewsSection() {
  return (
    <section
      data-ocid="home.reviews.section"
      className="border-b border-border bg-background py-16 md:py-24"
    >
      <div className="container flex flex-col gap-10">
        <SectionHeading
          eyebrow="Avis clients"
          title="Ils ont amélioré leur setup"
          description="Exemples de retours clients illustrant l'expérience Galsen Gaming."
          align="center"
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <figure
              key={review.id}
              data-ocid={`home.reviews.card.${index + 1}`}
              className="flex flex-col gap-4 rounded-2xl border border-border bg-card p-6"
            >
              <div
                className="flex items-center gap-1"
                aria-label={`Note : ${review.rating} sur ${MAX_RATING}`}
              >
                {Array.from({ length: MAX_RATING }, (_, starIndex) => (
                  <Star
                    key={`${review.id}-star-${starIndex}`}
                    className={
                      starIndex < review.rating
                        ? "size-4 fill-warning text-warning"
                        : "size-4 text-muted-foreground"
                    }
                    aria-hidden="true"
                  />
                ))}
              </div>
              <blockquote className="flex flex-1 flex-col gap-2">
                <p className="font-display text-base font-semibold text-foreground">
                  {review.title}
                </p>
                <p className="text-sm text-muted-foreground">{review.body}</p>
              </blockquote>
              <figcaption className="flex items-center justify-between border-t border-border pt-4 text-xs text-muted-foreground">
                <span className="font-medium text-foreground">
                  {review.author}
                </span>
                <span>{review.date}</span>
              </figcaption>
            </figure>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground">
          Témoignages présentés à titre d'exemple.
        </p>
      </div>
    </section>
  );
}
