import { describe, event } from "@demo/events";
  export const reserved = () => describe(event("stock.reserved", { sku: "A-1", qty: 2 }));
