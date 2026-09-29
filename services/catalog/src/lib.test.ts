import { test } from "node:test";
import assert from "node:assert/strict";
import { price } from "./lib.ts";
test("price", () => assert.ok(price().length > 0));
