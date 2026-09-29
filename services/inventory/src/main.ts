import { serve } from "@demo/http";
import { reserved } from "./lib.ts";
serve("inventory", () => ({ reserved: reserved() }));
