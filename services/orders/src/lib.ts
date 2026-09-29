import { add, format, money } from "@demo/money";
import { describe, event } from "@demo/events";
  export const total = () => format(add(money(1250), money(399)));
export const placed = () => describe(event("order.placed", { total: total() }));
