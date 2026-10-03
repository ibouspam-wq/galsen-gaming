import type { ReactNode } from "react";

interface PolicyLayoutProps {
  title: string;
  updatedAt: string;
  children: ReactNode;
}

export function PolicyLayout({
  title,
  updatedAt,
  children,
}: PolicyLayoutProps) {
  return (
    <div className="container max-w-3xl py-14 md:py-20">
      <header className="mb-10 border-b border-border pb-6">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-primary">
          Informations légales
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          {title}
        </h1>
        <p className="mt-3 text-sm text-muted-foreground">
          Dernière mise à jour : {updatedAt}
        </p>
      </header>
      <div className="flex flex-col gap-8">{children}</div>
    </div>
  );
}

export function PolicySection({
  title,
  children,
}: { title: string; children: ReactNode }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-display text-xl font-semibold text-foreground">
        {title}
      </h2>
      <div className="flex flex-col gap-3 text-sm leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
