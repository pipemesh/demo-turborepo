import { describe, event } from "@demo/events";
  export const sent = () => describe(event("email.sent", { to: "ops" }));
