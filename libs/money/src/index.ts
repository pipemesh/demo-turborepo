/** Integer cents, so sums never drift. */
export type Money = { cents: number; currency: string };
export const money = (cents: number, currency = "USD"): Money => ({ cents, currency });
export function add(a: Money, b: Money): Money {
  if (a.currency !== b.currency) throw new Error(`currencies differ: ${a.currency} and ${b.currency}`);
  return money(a.cents + b.cents, a.currency);
}
export const format = (m: Money): string => `${(m.cents / 100).toFixed(2)} ${m.currency}`;
