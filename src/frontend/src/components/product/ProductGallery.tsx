import { resolveProductImage } from "@/lib/catalog";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const gallery =
    images.length > 0
      ? images.map(resolveProductImage)
      : ["/assets/images/placeholder.svg"];
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = gallery[Math.min(activeIndex, gallery.length - 1)];

  return (
    <div className="flex flex-col gap-4">
      <div
        data-ocid="product.gallery"
        className="relative overflow-hidden rounded-2xl border border-border bg-muted"
      >
        <div className="aspect-square w-full">
          <img
            key={activeImage}
            src={activeImage}
            alt={`${name} — vue ${activeIndex + 1}`}
            className="h-full w-full animate-fade-in object-cover"
          />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent"
        />
      </div>

      {gallery.length > 1 ? (
        <ul
          data-ocid="product.gallery.thumbnails"
          className="grid grid-cols-4 gap-3 sm:grid-cols-5"
        >
          {gallery.map((image, index) => {
            const isActive = index === activeIndex;
            return (
              <li key={image}>
                <button
                  type="button"
                  data-ocid={`product.gallery.thumbnail.${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Afficher la vue ${index + 1} de ${name}`}
                  aria-pressed={isActive}
                  className={cn(
                    "group relative block aspect-square w-full overflow-hidden rounded-xl border bg-muted transition-fast focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    isActive
                      ? "border-primary shadow-glow-primary"
                      : "border-border hover:border-primary/50",
                  )}
                >
                  <img
                    src={image}
                    alt=""
                    loading="lazy"
                    className={cn(
                      "h-full w-full object-cover transition-smooth",
                      isActive
                        ? "opacity-100"
                        : "opacity-70 group-hover:opacity-100",
                    )}
                  />
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
