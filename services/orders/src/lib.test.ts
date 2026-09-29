import { test } from "node:test";
import assert from "node:assert/strict";
import { placed } from "./lib.ts";
test("placed", () => assert.ok(placed().length > 0));
