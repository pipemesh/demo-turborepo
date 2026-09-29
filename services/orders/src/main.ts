import { serve } from "@demo/http";
import { placed } from "./lib.ts";
serve("orders", () => ({ placed: placed() }));
