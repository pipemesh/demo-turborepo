import { serve } from "@demo/http";
import { sent } from "./lib.ts";
serve("notifications", () => ({ sent: sent() }));
