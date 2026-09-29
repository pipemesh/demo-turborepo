import { test } from "node:test";
import assert from "node:assert/strict";
import { add, format, money } from "./index.ts";
test("adds in cents", () => assert.equal(format(add(money(110), money(95))), "2.05 USD"));
test("refuses mixed currencies", () => assert.throws(() => add(money(1), money(1, "EUR"))));
