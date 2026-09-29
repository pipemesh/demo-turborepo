import { serve } from "@demo/http";
import { captured } from "./lib.ts";
serve("payments", () => ({ captured: captured() }));
