const priceFormatter = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Backend prices are stored in cents (bigint). */
export function formatPrice(cents: bigint | number): string {
  const value = typeof cents === "bigint" ? Number(cents) : cents;
  return priceFormatter.format(value / 100);
}

export function formatRating(rating: bigint | number): string {
  const value = typeof rating === "bigint" ? Number(rating) : rating;
  return (value / 10).toFixed(1);
}

export function formatCount(count: bigint | number): string {
  const value = typeof count === "bigint" ? Number(count) : count;
  return new Intl.NumberFormat("fr-FR").format(value);
}

export function timestampToDate(timestamp: bigint): Date | null {
  const date = new Date(Number(timestamp / 1_000_000n));
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDate(timestamp: bigint): string {
  const date = timestampToDate(timestamp);
  if (!date) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(date);
}

export function discountLabel(percent: bigint | number): string {
  const value = typeof percent === "bigint" ? Number(percent) : percent;
  return `-${value}%`;
}
