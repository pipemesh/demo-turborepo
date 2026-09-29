import { test } from "node:test";
import assert from "node:assert/strict";
import { placed, total } from "./lib.ts";
test("placed", () => assert.ok(placed().length > 0));
test("placed carries the total", () => assert.match(placed(), /16\.49 USD/));
test("total is in dollars and cents", () => assert.match(total(), /^\d+\.\d{2} USD$/));
test("placed names its event", () => assert.match(placed(), /order\.placed/));
