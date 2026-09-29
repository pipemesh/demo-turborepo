import { serve } from "@demo/http";
import { price } from "./lib.ts";
serve("catalog", () => ({ price: price() }));
